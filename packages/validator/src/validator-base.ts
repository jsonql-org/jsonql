// this is the base class for all the helper methods
import type {
  // JsonqlValidationPlugin,
  JsonqlValidationRule,
  JsonqlGenericObject,
  JsonqlValidateFn,
} from '@jsonql/validator-core/index'
import type {
  JsonqlPropertyParamMap,
  JsonqlValidateCbFn,
  JsonqlObjectValidateInput,
  FunctionInput,
  MixedValidationInput,
  // JsonqlValidationPlugin,
} from './types'
import type {
  ValidatorPlugins,
} from '@jsonql/validator-core/dist/validator-plugins'
import ValidationError from '@jsonql/errors/dist/validation-error'
import GeneralException from '@jsonql/errors/dist/general-exception'
import { notEmpty } from '@jsonql/utils/dist/empty'
import { toArray } from '@jsonql/utils/dist/common'
import { assign, arrToObj } from '@jsonql/utils/dist/object'
import { isFunction } from '@jsonql/utils/dist/is-function'
import {
  queuePromisesProcess,
} from '@jsonql/utils/dist/chain-promises'
import {
  checkArray,
  promisify,
  constructRuleCb,
  successThen,
  VALIDATE_KEY,
  VALIDATE_ASYNC_KEY,
  PLUGIN_KEY,
  RULES_KEY,
  NAME_KEY,
} from '@jsonql/validator-core'
// ----- LOCAL ---- //
import {
  createAutomaticRules,
  getOptionalValue,
  checkDuplicateRules,
  getKey,
} from './fn'
import {
  ARGS_NOT_ARRAY_ERR,
  EXCEPTION_CASE_ERR,
  SPREAD_PREFIX,
  SPREAD_ARG_TYPE,
} from './constants'
// ---- DEBUG ---- //
import debugFn from 'debug'
const debug = debugFn('jsonql:validator:validator-base')

/**
The sequence how this should run
1. init - take the AST map and generate automatic validation rules
2. register internal plugins
3. (if any) user can register their own plugins
4. accept the user define rules, at this point we create the full validation map
5. Call the validate method with the data input then the validation will run
*/
export class ValidatorBase {
  // we keep two set
  private _astWithBaseRules: Array<JsonqlPropertyParamMap>
  private _schema!: Array<JsonqlPropertyParamMap>
  // use this list to make callable argument
  protected _arguments!: Array<string>
  // main
  constructor(
    astMap: Array<JsonqlPropertyParamMap>,
    protected _validatorPluginsInstance?: ValidatorPlugins
  ) {
    this._astWithBaseRules = createAutomaticRules(astMap)
    // create the argument name list in order
    this._arguments = this._astWithBaseRules.map(rule => rule[NAME_KEY])
  }

  /** the main method then in it's sub class will get override */
  public validate(values: Array<unknown>) {
    const queues = this._normalizeArgValues(values)
    return queuePromisesProcess(
      queues as unknown as Array<(...args: JsonqlGenericObject[]) => Promise<JsonqlGenericObject>>,
      undefined // the init value will now be undefined to know if its first
    )
  }

  /**
    on the client side even if its not require validation but we still need to prepare
    the argument for transport so we need the _normalizeArgValues without _prepareForExecution
  */
  public prepareArgValues(values: Array<unknown>) {
    return this._normalizeArgValues(values, false)
  }

  /** just return the internal schema for validation for use, see export */
  public get schema() {
    return this._schema || this._astWithBaseRules
  }

  /** overload the addValidationRules method that allow to pass a function or async function */
  public addValidationRules(
    input: MixedValidationInput
  ) {
    debug('addValidationRules', input)
    const clearInput: JsonqlObjectValidateInput = {}
    for (const propName in input) {
      // we convert this to array here now
      clearInput[propName] = toArray(input[propName])
        .map((inp: MixedValidationInput) => {
          if (isFunction(inp)) {
            return this._updateInput(inp as FunctionInput)
          }
          return inp
        })
    }
    // overload the parent method
    this._createSchema(clearInput)
  }

  /** just put the function into the right key */
  private _updateInput(input: FunctionInput): JsonqlValidationRule {
    // we just make it an async funtion regardless
    return {
      [VALIDATE_ASYNC_KEY]: promisify(input)
    }
  }

  // ----------------- validate ------------------ //

  /**
    when validate happens we check the input value
    correspond to out map, and apply the values
    argument values turn into an executable queue
  */
  protected _normalizeArgValues(values: unknown[], execute = true) {
    debug('_normalizeArgValues', values)
    // there might not be a dev provided schema
    const params = this.schema
    const pCtn = params.length
    if (pCtn === 0) {
      return [] // nothing to do
    }
    if (!checkArray(values)) {
      debug(values)
      throw new ValidationError(ARGS_NOT_ARRAY_ERR, values)
    }
    const vCtn = values.length
    switch (true) {
      case vCtn === pCtn:
        if (execute === false) {
          return arrToObj(
            values,
            (value: unknown, i: number) => ({ [params[i].name]: value })
          )
        }
        return values.map((value, i) => (
            this._prepareForExecution(value, params[i], i)
        ))
      case vCtn < pCtn:
        debug(`Values pass less than params`)
        if (execute === false) {
          return arrToObj(
            params,
            (param: JsonqlPropertyParamMap, i: number) => {
              const _value = getOptionalValue(values[i], param)
              return { [param.name]: _value }
            }
          )
        }
        return params.map((param, i) => {
          const _value = getOptionalValue(values[i], param)
          return this._prepareForExecution(_value, param, i)
        })
      case vCtn > pCtn: // this is the spread style argument
        debug('spread params', vCtn, pCtn)
        return this._processSpreadLikeArg(values, params, execute)
      default: // will not fall through here @TODO
        throw new ValidationError(EXCEPTION_CASE_ERR, [vCtn, pCtn])
    }
  }

  /** The spread or mix with spread argument is too complicated to process in couple lines */
  private _processSpreadLikeArg(
    values: unknown[],
    params: Array<JsonqlPropertyParamMap>,
    execute: boolean
  ) {
    // if it's spread only then there should be just one param
    const spreadParam = params.filter(p => p.tstype === SPREAD_ARG_TYPE)[0]
    // if this is just grabbing the values then it should be name: Array<values>
    if (execute === false) {
      // @TODO there is couple more scenario that might break this fix as we go along 
      return values.map((value, i) => {
        if (!params[i]) {
          return { [spreadParam.name]: [value] }
        }
        return params[i].name !== spreadParam.name
                              ? { [params[i].name]: value }
                              : { [spreadParam.name]: [value] }
      }).reduce((a: JsonqlGenericObject, b: JsonqlGenericObject) => {
        const k = getKey(a)
        if (!k) { // init
          return b
        }
        const k2 = getKey(b) as string
        if (!a[k2]) {
          return assign({}, a, b)
        }
        a[k2] = a[k2].concat(b[k2])
        return a
      }, {})
    }
    // now search for the mixedRule - there should only be one, if not this idiot doesn't know what is doing
    // the problem is the type is any after the first param
    return values.map((value, i) => {
      // @NOTE the assign need to create new object otherwise we will polluate the params
      const param = params[i] || assign({}, spreadParam, { name: `${SPREAD_PREFIX}${i}`})
      // this getOptionalValue is pointless
      // const _value = getOptionalValue(value, param)
      debug('spread param', value, param.name)
      return this._prepareForExecution(value, param, i)
    })
  }

  /**
    at this point we actually put the rules in the queue
    but we dont' run it yet until all rules are in the main queue
    this way, if one fail then the whole queue exited without running further
  */
  private _prepareForExecution(
    value: unknown,
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
        // when it fail then we return the index number
        return async (lastResult: JsonqlGenericObject) =>
          Reflect.apply(rule, null, [value, lastResult, [idx, i]])
            .then((result: unknown) => {
              debug('Post rule result', result)
              return result
            })
      })
    }
    // stuff it with a placeholder fuction?
    debug('No rules to run')
    return async () => true
  }

  // ---------------------- schema -------------------------- //

  /** put the rule in here and make it into an async method */
  protected _createSchema(
    input: JsonqlObjectValidateInput
  ): void {
    let astWithRules = this._astWithBaseRules
    // all we need to do is check if its empty input
    if (notEmpty(input, true)) {
      astWithRules = this._applyObjectInput(astWithRules, input as JsonqlObjectValidateInput)
    }
    debug(`_createSchema`, astWithRules)
    this._schema = astWithRules
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
        const _input = input[propName].map((input: JsonqlValidationRule) => {
          input.name = propName
          return input
        })
        const rules = this._transformInput(_input, propName)
        // debug('ast[RULES_KEY]', ast[RULES_KEY])
        if (rules && rules.length) {
          ast[RULES_KEY] = ast[RULES_KEY]?.concat(rules)
        }
      }
      return ast
    })
  }

  /** this will transform the rules to executable */
  private _transformInput(
    input: Array<JsonqlValidationRule>,
    propName: string
  ): Array<JsonqlValidateCbFn> {
    debug('_transformInput', input)
    return input.map((_input: JsonqlValidationRule, i: number) => {
      const ruleKeys = checkDuplicateRules(_input)
      if (ruleKeys.length > 1) {
        throw new Error(`You can only set one rule at a time! We found ${ruleKeys.join(',')}`)
      }
      // the name is not that important but still need one, if there is none we generate it
      const pluginName = _input.name || `customPluginName${i}`
      switch (true) {
        case _input[PLUGIN_KEY] !== undefined:
          debug(`Should got here ----->`, _input[PLUGIN_KEY])
          return this._lookupPlugin(_input, propName)
        case _input[VALIDATE_KEY] !== undefined:
          debug(`${VALIDATE_KEY} ----->`, _input)
          return constructRuleCb(
            propName,
            promisify(_input[VALIDATE_KEY]),
            pluginName
          )
        case _input[VALIDATE_ASYNC_KEY] !== undefined:
          debug(`${VALIDATE_ASYNC_KEY} ---->`, _input)
          return constructRuleCb(
            propName,
            _input[VALIDATE_ASYNC_KEY] as unknown as JsonqlValidateFn,
            pluginName
          )
        default:
          throw new GeneralException(
            `unable to find rule for ${propName},
            we expect ${PLUGIN_KEY}, ${VALIDATE_KEY} or ${VALIDATE_ASYNC_KEY}`
          )
      }
    })
  }

  /** wrapper methods for ValidatorPlugins */
  private _lookupPlugin(
    input: JsonqlValidationRule,
    propName: string
  ) {
    // @TODO we should allow validator to use standalone without the plugin system
    // so when this plugin instance object is undefined we should skip it
    try {
      if (this._validatorPluginsInstance) {
        debug('_lookupPlugin --->', input, propName)
        return this._validatorPluginsInstance.lookupPlugin(input, propName)
      }
    } catch(e) {
      // @NOTE because the lookupPlugin method actually throw errors but we don't want
      // to crash it
      debug('catch _lookupPlugin error', e)
    }
    return constructRuleCb(
      propName,
      async () => Promise.reject(false),
      'NO_PLUGIN_DUMMY_FUNCTION'
    )
  }
}
