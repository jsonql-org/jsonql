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
} from '../types'
import * as plugins from '../plugins'

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

  private _plugins = new Map<string, any>()
  // we keep two set
  private _astWithBaseRules: Array<JsonqlPropertyParamnMap>
  private _schema!: Array<JsonqlPropertyParamnMap>
  // the first level is the param pos the second level is the rule
  private _errors!: Array<Array<number>>

  constructor(astMap: any) {
    this._astWithBaseRules = createAutomaticRules(astMap)
  }

  protected get schema() {
    return this._schema || this._astWithBaseRules
  }

  /** @TODO map the index array to name */
  protected get errors() {
    return this._errors || null
  }

  /** put the rule in here and make it into an async method */
  protected createSchema(
    input?: any
  ): void {
    let astWithRules = this._astWithBaseRules
    // all we need to do is check if its empty input
    if (notEmpty(input)) {
      if (checkArray(input)) {
        astWithRules = this.applyArrayInput(astWithRules, input)
      } else if (checkObject(input)) {
        astWithRules = this.applyObjectInput(astWithRules, input)
      }
    }
    this._schema = astWithRules
  }

  /**
    when validate happens we check the input value
    correspond to out map, and apply the values
    argument values turn into an executable queue
  */
  protected normalizeArgValues(values: any[]) {
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
          this.applyRules(value, params[i], i)
        ))
      case vCtn < pCtn:
        return params.map((param, i) => {
          const _value = getOptionalValue(values[i], param)

          return this.applyRules(_value, param, i)
        })
      case vCtn > pCtn:
        return values.map((value, i) => {
          // const required = !(i > pCtn ? true : !!params[i].required)
          const param = params[i] || { type: DEFAULT_TYPE, name: `_${i}`}
          const _value = getOptionalValue(value, param)
          // @TODO if it's optional field and using the provide value
          // should we skip the validation

          return this.applyRules(_value, param, i)
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
  protected applyRules(
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
  protected generteValidationFn() {

  }
  */



  /** normalize the array style rules input */
  protected applyArrayInput(
    astMap: Array<JsonqlPropertyParamnMap>,
    input: JsonqlArrayValidateInput
  ) {
    const fixedInput = input.map((_input: JsonqlValidationRule) => {
      return Array.isArray(_input) ? _input : [_input]
    })
    // We just need to take the validate methods and concat to the rules here
    return astMap.map((ast: JsonqlPropertyParamnMap, i: number) => {
      const input2 = this.transformInput(fixedInput[i])
      if (!ast.rules) {
        ast.rules = []
      }
      if (input2) {
        ast.rules = ast.rules.concat(input2)
      }
      return ast
    })
  }

  /** nomalize the object style rules input */
  protected applyObjectInput(
    astMap: Array<JsonqlPropertyParamnMap>,
    input: JsonqlObjectValidateInput
  ) {

    return astMap.map((ast: JsonqlPropertyParamnMap) => {

      return ast
    })
  }

  // here is the one that will transform the rules
  private transformInput(input: JsonqlValidationRule): Array<any> {
    return input.map(_input => {
      switch (true) {
        case _input.pluign !== undefined:
          return this.lookupPlugin(_input)
        case _input.validator !== undefined:
          // @TODO need to transform this
          return _input.validator
        default:
          throw new JsonqlError(`unable to find rule`)
      }
    })
  }

  private lookupPlugin(input) {
    const name = input.plugin
    if (this._plugins.has(name)) {
      // @TODO need to transform this
      return this._plugins.get(name)
    }
    throw new JsonqlError(`Unable to find ${name} plugin`)
  }

  /** register plugins */
  protected registerPlugin(name: string, rule: JsonqlValidationPlugin) {
    // @TODO need to check the rule and transform the plugin
    this._plugins.set(name, rule)
  }

}
