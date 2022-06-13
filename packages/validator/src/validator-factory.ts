/** class style Validator, one instance per function */
import type {
  JsonqlGenericObject,
} from '@jsonql/validator-core/index'
import type {
  JsonqlValidationPlugin,
  JsonqlPropertyParamMap,
  ValidateResultReturn,
} from './types'
import {
  ValidatorBase
} from './validator-base'
import {
  ValidatorPlugins
} from '@jsonql/validator-core/dist/validator-plugins'
import {
  processValidateResultsAsArr,
  processValidateResultsAsObj,
} from './fn'
import {
  RETURN_AS_ARR,
  RETURN_AS_OBJ,
  RETURN_AS_RAW,
} from './constants'

import debugFn from 'debug'
const debug = debugFn('jsonql:validator:class:index')
// main
export class Validator extends ValidatorBase {

  /**
    this is now change to accept an instance of ValidatorPlugins (share)
    if only call it with the astMap then it init it as a standalone like before
  */
  constructor(
    astMap: Array<JsonqlPropertyParamMap>,
    vp?: ValidatorPlugins
  ) {
    super(
      astMap,
      vp && vp instanceof ValidatorPlugins ? vp : new ValidatorPlugins(-1)
    )
  }

  /** this is override the parent validate method with addtitional process for result */
  public async validate(
    values: Array<unknown>, 
    returnAs: ValidateResultReturn = RETURN_AS_ARR
  ) {
    // call the parent validate method
    return super.validate(values)
                .then((result: JsonqlGenericObject) => {
                  switch (returnAs) {
                    case RETURN_AS_RAW:
                      return result 
                    case RETURN_AS_ARR:
                      return this._prepareValidateResultForFuncCall(result)
                    case RETURN_AS_OBJ:
                    default:
                      return this._prepareValidateResultAsObject(result)
                  }
                })
  }

  /** wrapper for the plugin instance register plugin method */
  public registerPlugin(
    name: string,
    plugin: JsonqlValidationPlugin
  ): void {
    if (this._validatorPluginsInstance) {
      this._validatorPluginsInstance.registerPlugin(name, plugin)
    }
  }

  /** After the validation the success will get an object with
  argumentName: value object and we make it to an array matching
  the order of the call, then we can pass it directly to method that
  get validated */
  private async _prepareValidateResultForFuncCall(
    validateResult: JsonqlGenericObject
  ): Promise<unknown[]> {
    debug('validateResult return as array', this._arguments, validateResult)
    // @TODO need to fix the spread input type return result
    return processValidateResultsAsArr(this._arguments, validateResult)
  }

  /** prepare the validation result as key value pair */
  private async _prepareValidateResultAsObject(
    validateResult: JsonqlGenericObject
  ) {
    debug('validateResult return as object', this._arguments, validateResult)
    
    return processValidateResultsAsObj(this._arguments, validateResult)
  }
}
