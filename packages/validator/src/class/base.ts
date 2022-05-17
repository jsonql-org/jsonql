// this is the base class for all the helper methods
import type {
  JsonqlValidationPlugin,
  JsonqlValidationRule,
  JsonqlPropertyParamMap,
  JsonqlValidateCbFn,
  JsonqlArrayValidateInput,
  JsonqlObjectValidateInput,
  JsonqlGenericObject,
  JsonqlValidateFn,
} from '../types'
import type {
  JsonqlPluginInput,
  JsonqlPluginConfig
} from '@jsonql/validator-core/index'

import {
  JsonqlValidationError,
  JsonqlError,
} from '@jsonql/errors'
import {
  notEmpty,
  isFunction,
  toArray,
  inArray,
  assign,
} from '@jsonql/utils'
import {
  // DEFAULT_TYPE,
  SPREAD_ARG_TYPE,
} from '@jsonql/constants'
import {
  checkString,
  checkArray,
  checkObject,
  promisify,
  createCoreCurryPlugin,
  curryPlugin,
  plugins,
} from '@jsonql/validator-core'
// ----- LOCAL ---- //
import {
  createAutomaticRules,
  getOptionalValue,
  patternPluginFanctory,
  constructRuleCb,
  successThen,
  checkPluginArg,
  pluginHasFunc,
} from './fn'
import {
  ARGS_NOT_ARRAY_ERR,
  EXCEPTION_CASE_ERR,
  VALIDATE_KEY,
  VALIDATE_ASYNC_KEY,
  PLUGIN_KEY,
  PLUGIN_FN_KEY,
  PATTERN_KEY,
  RULES_KEY,
  NAME_KEY,
  PARAMS_KEY,
  SPREAD_PREFIX,
} from '../constants'
// ---- DEBUG ---- //
import debugFn from 'debug'
const debug = debugFn('jsonql:validator:class:base')
/**
The sequence how this should run
1. init - take the AST map and generate automatic validation rules
2. register internal plugins
3. (if any) user can register their own plugins
4. accept the user define rules, at this point we create the full validation map
5. Call the validate method with the data input then the validation will run
*/
export class ValidatorFactoryBase {

  private _plugins = new Map<string, JsonqlValidationPlugin>()
  private _internalPluginNames: string[] = []
  // we keep two set
  private _astWithBaseRules: Array<JsonqlPropertyParamMap>
  private _schema!: Array<JsonqlPropertyParamMap>
  // the first level is the param pos the second level is the rule
  private _errors!: Array<Array<number>>
  // private _spreadTypeKey = '' // there should be only one spread param in one function!
  // use this list to make callable argument
  protected _arguments!: Array<string>

  // @TODO properly type the astMap
  constructor(astMap: Array<JsonqlPropertyParamMap>) {
    this._astWithBaseRules = createAutomaticRules(astMap)
    // create the argument list in order
    this._arguments = this._astWithBaseRules.map(rule => rule[NAME_KEY])
    // register internal plugins
    plugins.forEach((plugin: JsonqlValidationPlugin) => {
      if (!plugin[PARAMS_KEY]) {
        // We skip those need to curry and do that JIT
        plugin[VALIDATE_ASYNC_KEY] = promisify(plugin[PLUGIN_FN_KEY])
      }
      const name = plugin[NAME_KEY] as string
      this._internalPluginNames.push(name)
      this._registerPlugin(name, plugin, true)
    })
  }

  protected get schema() {
    return this._schema || this._astWithBaseRules
  }

  /** @TODO map the index array to name */
  protected get errors() {
    return this._errors || null
  }

  // ----------------- validate ------------------ //

  /**
    when validate happens we check the input value
    correspond to out map, and apply the values
    argument values turn into an executable queue
  */
  protected _normalizeArgValues(values: any[]) {
    debug('_normalizeArgValues', values)
    // there might not be a dev provided schema
    const params = this.schema
    const pCtn = params.length
    if (pCtn === 0) {
      return [] // nothing to do
    }
    if (!checkArray(values)) {
      debug(values)
      throw new JsonqlValidationError(ARGS_NOT_ARRAY_ERR, values)
    }
    const vCtn = values.length
    switch (true) {
      case vCtn === pCtn:
        return values.map((value, i) => (
          this._prepareForExecution(value, params[i], i)
        ))
      case vCtn < pCtn:
        debug(`Values pass less than params`)
        return params.map((param, i) => {
          const _value = getOptionalValue(values[i], param)

          return this._prepareForExecution(_value, param, i)
        })
      case vCtn > pCtn: // this is the spread style argument
        debug('spread params', vCtn, pCtn)
        return this._processSpreadLikeArg(values, params)
      default: // will not fall through here @TODO
        throw new JsonqlValidationError(EXCEPTION_CASE_ERR, [vCtn, pCtn])
    }
  }

  /** The spread or mix with spread argument is too complicated to process in couple lines */
  private _processSpreadLikeArg(
    values: any[],
    params: Array<JsonqlPropertyParamMap>
  ) {
    // if it's spread only then there should be just one param
    // now search for the mixedRule - there should only be one, if not this idiot doesn't know what is doing
    const spreadParam = params.filter(p => p.tstype = SPREAD_ARG_TYPE)[0]
    // this._spreadTypeKey = spreadParam.name
    // the problem is the type is any after the first param
    return values.map((value, i) => {
      const param = params[i] || assign(spreadParam, { name: `${SPREAD_PREFIX}${i}`})
      const _value = getOptionalValue(value, param)
      // @NOTE here is the problem for spread there is only 1 validator register with the
      // init name and all subsequence value pass to the same validation function
      // so for Spread we need to recreate the function here again for the default validator
      // but change a way of thinking, using the same rule is actually not a problem

      debug('spreand param', _value, param.name)
      return this._prepareForExecution(_value, param, i)
    })
  }

  /**
    at this point we actually put the rules in the queue
    but we dont' run it yet until all rules are in the main queue
    this way, if one fail then the whole queue exited without running
  */
  private _prepareForExecution(
    value: any,
    param: JsonqlPropertyParamMap,
    idx: number
  ) {
    const { rules, required, name } = param

    if (rules && rules.length) {
      // we only need to return the queue
      return rules.map((rule: JsonqlValidateCbFn, i: number) => {
        // if this is not required field and no value the we create a fake callback
        if (value === undefined && !required) {
          debug(`skip the validation`, required)
          return async (lastResult: JsonqlGenericObject) => (
            successThen(name, value, lastResult, [idx, i])(true)
          )
        }

        // when it fail then we provide with the index number
        return async (lastResult: JsonqlGenericObject) =>
          Reflect.apply(rule, null, [value, lastResult, [idx, i]])
            .then((result: any) => {
              debug('Post rule result', result)
              return result
            })
      })
    }
    // stuff it with a placeholder fuction?
    return async () => true
  }

  // ---------------------- schema -------------------------- //

  /** put the rule in here and make it into an async method */
  protected _createSchema(
    input: JsonqlObjectValidateInput | JsonqlArrayValidateInput
  ): void {
    let astWithRules = this._astWithBaseRules
    // all we need to do is check if its empty input
    if (notEmpty(input, true)) {
      if (checkArray(input)) {
        astWithRules = this._applyArrayInput(astWithRules, input as JsonqlArrayValidateInput)
      } else if (checkObject(input)) {
        astWithRules = this._applyObjectInput(astWithRules, input as JsonqlObjectValidateInput)
      }
    }
    this._schema = astWithRules
  }

  /** normalize the array style rules input */
  private _applyArrayInput(
    astMap: Array<JsonqlPropertyParamMap>,
    input: JsonqlArrayValidateInput
  ) {
    const arrayInput = input.map(toArray)
    // We just need to take the validate methods and concat to the rules here
    return astMap.map((ast: JsonqlPropertyParamMap, i: number) => {
      if (arrayInput[i]) { // the user didn't provide additonal rules
        const input2 = this._transformInput(arrayInput[i], ast.name)
        /*
        @TODO at this point ast[RULES_KEY] has the rule generated
        when this is run with a js file there won't be any type info
        so the first rule could provide the "override" and "type"
        then we need to override it with the type
        */
        if (input2) {
          ast[RULES_KEY] = ast[RULES_KEY].concat(input2)
        }
      }
      return ast
    })
  }

  /** nomalize the object style rules input */
  private _applyObjectInput(
    astMap: Array<JsonqlPropertyParamMap>,
    input: JsonqlObjectValidateInput
  ) {

    return astMap.map((ast: JsonqlPropertyParamMap) => {
      const propName = ast.name
      if (input[propName]) {
        // there might not be a name in there and it's important
        const _input = toArray(input[propName]).map(input => {
          input.name = propName
          return input
        })
        const rules = this._transformInput(_input, propName)
        // debug('ast[RULES_KEY]', ast[RULES_KEY])
        if (rules && rules.length) {
          ast[RULES_KEY] = ast[RULES_KEY].concat(rules)
        }
      }
      return ast
    })
  }

  /** this will transform the rules to executable */
  private _transformInput(
    input: Array<JsonqlValidationRule>,
    propName: string
  ): Array<JsonqlValidateCbFn> { // @NOTE add the undefined to get around the TS moronic check
    debug('_transformInput', input)
    return input.map((_input: JsonqlValidationRule) => {
      const pluginName = _input.name
      switch (true) {
        case _input[PLUGIN_KEY] !== undefined:
          debug(`Should got here`, _input[PLUGIN_KEY])
          return this._lookupPlugin(_input, propName)
        case _input[VALIDATE_KEY] !== undefined:
          // @TODO need to transform this
          return constructRuleCb(
            propName,
            promisify(_input[VALIDATE_KEY]),
            pluginName
          )
        case _input[VALIDATE_ASYNC_KEY] !== undefined:
          return constructRuleCb(
            propName,
            _input[VALIDATE_ASYNC_KEY] as unknown as JsonqlValidateFn,
            pluginName
          )
        default:
          throw new JsonqlError(`unable to find rule for ${propName}`)
      }
    })
  }

  /// ----------------------- PLUGINS ----------------------- ///

  private _lookupPlugin(
    input: JsonqlValidationRule,
    propName: string
  ): JsonqlValidateFn {
    const pluginName = input[PLUGIN_KEY]
    if (pluginName && this._plugins.has(pluginName)) {
      // @TODO need to transform this
      const pluginConfig = this._plugins.get(pluginName)
      if (pluginConfig && pluginConfig[VALIDATE_ASYNC_KEY]) {
        // here is the problem the name should be the param not the plugin
        return constructRuleCb(
          propName,
          pluginConfig[VALIDATE_ASYNC_KEY] as JsonqlValidateFn,
          pluginName,
        )
      } else if (pluginConfig && pluginConfig[PARAMS_KEY]) {
        debug('_pluign', pluginConfig)
        debug('input', input)
        const _input = input as unknown as JsonqlPluginInput
        // need to check if the _plugin is internal or not
        const fn = inArray(this._internalPluginNames, pluginName) ?
                    createCoreCurryPlugin(_input) :
                    curryPlugin(_input, pluginConfig as unknown as JsonqlPluginConfig)

        return constructRuleCb(propName, promisify(fn), pluginName)
      }
    }
    throw new JsonqlError(`Unable to find ${pluginName} plugin for ${propName}`)
  }

  /** register plugins */
  protected _registerPlugin(
    name: string,
    pluginConfig: JsonqlValidationPlugin,
    skipCheck = false // when register internal plugin then skip it
  ): void {
    if (!skipCheck) {
      if (this._plugins.has(name)) {
        throw new JsonqlError(`plugin ${name} already existed!`)
      }
      if (pluginConfig[PARAMS_KEY] !== undefined) {
        if (!checkPluginArg(pluginConfig[PARAMS_KEY] as string[])) {
          throw new JsonqlError(`Your plugin config argument contains reserved keywords`)
        }
      }
      if (!pluginHasFunc(pluginConfig)) {
        throw new JsonqlError(`Can not find any executable within your plugin config`)
      }
    }
    // put the name back in
    pluginConfig.name = name
    switch (true) {
      // this rule is not really in use but keep here for future
      case (!pluginConfig[VALIDATE_ASYNC_KEY] &&
            pluginConfig[VALIDATE_KEY] &&
            isFunction(pluginConfig[VALIDATE_KEY])):
        pluginConfig[VALIDATE_ASYNC_KEY] = promisify(pluginConfig[VALIDATE_KEY])
        break
      // use the pattern key to generate plugin method
      case (pluginConfig[PATTERN_KEY] &&
            checkString(pluginConfig[PATTERN_KEY])):
        pluginConfig[VALIDATE_ASYNC_KEY] = patternPluginFanctory(pluginConfig[PATTERN_KEY] as string)
        break
      // @NOTE we can not create the curryPlugin here because it needs to be generic
      // and the arguement provide at validation time, this need to get create at the _lookupPlugin
      default:
        // @TODO more situations
    }
    this._plugins.set(name, pluginConfig)
  }
}
