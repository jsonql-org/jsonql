// this is the base class for all the helper methods
import {
  JsonqlValidationError,
  JsonqlError,
} from '@jsonql/errors'
import {
  queuePromisesProcess,
  notEmpty,
  showDeep,
  assign,
  isFunction,
} from '@jsonql/utils'
import {
  DEFAULT_VALUE,
  DEFAULT_TYPE,
} from '@jsonql/constants'
import {
  checkString,
  checkArray,
  checkAny,
  checkObject,
  checkUnion,
  combineCheck,
  promisify
} from '@jsonql/validator-core/src'
// ----- LOCAL ---- //
import {
  ARGS_NOT_ARRAY_ERR,
  // PARAMS_NOT_ARRAY_ERR,
  EXCEPTION_CASE_ERR,
} from '../constants'
import {
  createAutomaticRules,
  getOptionalValue,
  patternPluginFanctory,
} from './fn'
import {
  // JsonqlValidationMap,
  // JsonqlClassValidationMap,
  JsonqlValidationPlugin,
  JsonqlValidationRule,
  JsonqlPropertyParamnMap,
  JsonqlValidateCbFn,
  JsonqlArrayValidateInput,
  JsonqlObjectValidateInput,
  JsonqlGenericObject,
  JsonqlValidateFn,
} from '../types'
import { plugins } from '../plugins'

// ---- DEBUG ---- //
import debug from 'debug'
const debugFn = debug('jsonql:validator:class:base')
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
  // we keep two set
  private _astWithBaseRules: Array<JsonqlPropertyParamnMap>
  private _schema!: Array<JsonqlPropertyParamnMap>
  // the first level is the param pos the second level is the rule
  private _errors!: Array<Array<number>>
  // use this list to make callable argument
  protected _arguments!: Array<string>
  // @TODO properly type the astMap 
  constructor(astMap: any) {
    this._astWithBaseRules = createAutomaticRules(astMap)
    // create the argument list in order
    this._arguments = this._astWithBaseRules.map(rule => rule.name)
    // register internal plugins
    plugins.forEach((plugin: JsonqlValidationPlugin) => {
      plugin.validateAsync = promisify(plugin.main)
      this._registerPlugin(plugin.name, plugin)
    })
  }

  protected get schema() {
    return this._schema || this._astWithBaseRules
  }

  /** @TODO map the index array to name */
  protected get errors() {
    return this._errors || null
  }

  /** put the rule in here and make it into an async method */
  protected _createSchema(
    input: JsonqlObjectValidateInput | JsonqlArrayValidateInput
  ): void {
    let astWithRules = this._astWithBaseRules
    // all we need to do is check if its empty input
    if (notEmpty(input)) {
      if (checkArray(input)) {
        astWithRules = this._applyArrayInput(astWithRules, input as JsonqlArrayValidateInput)
      } else if (checkObject(input)) {
        astWithRules = this._applyObjectInput(astWithRules, input as JsonqlObjectValidateInput)
      }
    }
    this._schema = astWithRules
  }

  /**
    when validate happens we check the input value
    correspond to out map, and apply the values
    argument values turn into an executable queue
  */
  protected _normalizeArgValues(values: any[]) {
    // there might not be a dev provided schema
    const params = this.schema
    const pCtn = params.length
    if (pCtn === 0) {
      return [] // nothing to do
    }
    if (!checkArray(values)) {
      debugFn(values)
      throw new JsonqlValidationError(ARGS_NOT_ARRAY_ERR, values)
    }
    const vCtn = values.length
    switch (true) {
      case vCtn === pCtn:
        return values.map((value, i) => (
          this._applyRules(value, params[i], i)
        ))
      case vCtn < pCtn:
        return params.map((param, i) => {
          const _value = getOptionalValue(values[i], param)

          return this._applyRules(_value, param, i)
        })
      case vCtn > pCtn:
        return values.map((value, i) => {
          // const required = !(i > pCtn ? true : !!params[i].required)
          const param = params[i] || { type: DEFAULT_TYPE, name: `_${i}`}
          const _value = getOptionalValue(value, param)
          // @TODO if it's optional field and using the provide value
          // should we skip the validation

          return this._applyRules(_value, param, i)
        })
      default: // will not fall through here @TODO
        throw new JsonqlValidationError(EXCEPTION_CASE_ERR, [vCtn, pCtn])
    }
  }
  /**
    at this point we actually put the rules in the queue
    but we dont' run it yet until all rules are in the main queue
    this way, if one fail then the whole queue exited without running
  */
  private _applyRules(
    value: any,
    param: JsonqlPropertyParamnMap,
    idx: number
  ) {
    const { rules } = param
    if (rules && rules.length) {
      // we only need to return the queue
      return rules.map((rule: JsonqlValidateCbFn, i: number) => {
        // when it fail then we provide with the index number
        return async (lastResult: JsonqlGenericObject) =>
          Reflect.apply(rule, null, [value, lastResult, [idx, i]])
      })
    }
    // stuff it with a placeholder fuction?
    return async () => true
  }

  /*
  example:
    v = [
      [rule, rule , rule]
      [rule]
      rule
  ]
  */
  /** normalize the array style rules input */
  private _applyArrayInput(
    astMap: Array<JsonqlPropertyParamnMap>,
    input: JsonqlArrayValidateInput
  ) {
    const fixedInput = input.map((_input: JsonqlValidationRule) => {
      return Array.isArray(_input) ? _input : [_input]
    })
    // We just need to take the validate methods and concat to the rules here
    return astMap.map((ast: JsonqlPropertyParamnMap, i: number) => {
      const input2 = this._transformInput(fixedInput[i])
      if (!ast.rules) {
        ast.rules = []
      }
      if (input2) {
        ast.rules = ast.rules.concat(input2)
      }
      return ast
    })
  }
  /*
  example:
  v = {
    argName: [rule, rule],
    argName: rule,
    argName: [rule]
  }
  */
  /** nomalize the object style rules input */
  private _applyObjectInput(
    astMap: Array<JsonqlPropertyParamnMap>,
    input: JsonqlObjectValidateInput
  ) {

    return astMap.map((ast: JsonqlPropertyParamnMap) => {

      return ast
    })
  }

  /** here is the one that will transform the rules */
  private _transformInput(
    input: Array<JsonqlValidationRule>
  ): Array<JsonqlValidationRule | undefined> { // @NOTE add the undefined to get around the TS moronic check
    return input.map((_input: JsonqlValidationRule) => {
      switch (true) {
        case _input.pluign !== undefined:
          return this._lookupPlugin(_input)
        case _input.validate !== undefined:
          // @TODO need to transform this
          return promisify(_input.validate)
        case _input.validateAsync !== undefined:
          return _input.validateAsync
        default:
          throw new JsonqlError(`unable to find rule`)
      }
    })
  }

  /// ----------------------- PLUGINS ----------------------- ///

  private _lookupPlugin(input: JsonqlValidationRule): JsonqlValidateFn {
    const name = input.plugin
    if (name && this._plugins.has(name)) {
      // @TODO need to transform this
      const _plugin = this._plugins.get(name)
      if (_plugin && _plugin.validateAsync) {
        // @TODO there will be require more arguments we need to look up the params


        return _plugin.validateAsync as JsonqlValidateFn
      }
    }
    throw new JsonqlError(`Unable to find ${name} plugin`)
  }

  /** register plugins */
  protected _registerPlugin(name: string, rule: JsonqlValidationPlugin): boolean {
    // @TODO need to check the rule and transform the plugin
    if (!this._plugins.has(name)) {
      switch (true) {
        case (!rule.validateAsync && rule.validate && isFunction(rule.validate)):
          rule.validateAsync = promisify(rule.validate)
          break
        case (rule.pattern && checkString(rule.pattern)):
          rule.validateAsync = patternPluginFanctory(rule.pattern as string)
          break
        default:
          // @TODO more situations
      }
      this._plugins.set(name, rule)
    }
    return true
  }

}
