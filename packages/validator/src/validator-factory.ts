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
  JsonqlObjectValidateInput,
  JsonqlPropertyParamMap,
} from './types'

import {
  ValidatorBase
} from './validator-base'
import {
  ValidatorPlugins
} from '@jsonql/validator-core/dist/validator-plugins'
import {
  queuePromisesProcess,
} from '@jsonql/utils/dist/chain-promises'
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
  public async validate(values: Array<unknown>, raw = false) {
    // debug(`raw flag`, raw)
    // this come out with a queue then we put into the chainProcessPromises
    const queues = this._normalizeArgValues(values)
    return queuePromisesProcess(
      queues as unknown as Array<(...args: JsonqlGenericObject[]) => Promise<JsonqlGenericObject>>,
      undefined // the init value will now be undefined to know if its first
    )
    .then((finalResult: unknown) =>
      raw ? finalResult : this._prepareValidateResult(finalResult as JsonqlGenericObject)
    )
  }

  /** wrapper for the protected register plugin method */
  public registerPlugin(
    name: string,
    plugin: JsonqlValidationPlugin
  ): void {
    this._validatorPluginsInstance.registerPlugin(name, plugin)
  }



  /** After the validation the success will get an object with
  argumentName: value object and we make it to an array matching
  the order of the call, then we can pass it directly to method that
  get validated */
  private async _prepareValidateResult(
    validateResult: JsonqlGenericObject
  ): Promise<unknown[]> {
    debug('validateResult', this._arguments, validateResult)
    // @TODO need to fix the spread input type return result
    return processValidateResults(this._arguments, validateResult)
            .then(unwrapPreparedValidateResult)
  }
}
