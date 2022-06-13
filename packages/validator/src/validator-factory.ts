/**
  this is the new class style Validator
  const validator = new Validator(map)
  validator.run(propName arguments)
  This class will support an plugin architecture
  something like
  validator.register(typeName: string, rule: any)
  so it their map they could write
  validationMap = {
    someMethod: [{
      type: 'mySpecialMethod'
    }]
  }
  validator.register('mySpecialMethod', {
    check(value): boolean {
      // do your validation here
    }
  })
  @TODO how to integrete this into the contract generator
*/
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
  processValidateResults,
  unwrapPreparedValidateResult,
} from './fn'

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

  /** this is where validation happens */
  public async validate(values: Array<unknown>, style: ValidateResultReturn = 'array' ) {
    // call the parent validate method
    return super.validate(values)
                .then((result: JsonqlGenericObject) => {
                  switch (style) {
                    case 'raw':
                      return result 
                    case 'array':
                      return this._prepareValidateResultForFuncCall(result)
                    case 'object':
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
    debug('validateResult', this._arguments, validateResult)
    // @TODO need to fix the spread input type return result
    return processValidateResults(this._arguments, validateResult)
            .then(unwrapPreparedValidateResult)
  }

  /** prepare the validation result as key value pair */
  private async _prepareValidateResultAsObject(
    validateResult: JsonqlGenericObject
  ) {
    console.log(this._arguments, validateResult)
    return validateResult
  }
}
