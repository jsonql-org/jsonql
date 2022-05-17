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
import {
  ValidatorFactoryBase
} from './base'
import type {
  JsonqlValidationPlugin,
  JsonqlArrayValidateInput,
  JsonqlObjectValidateInput,
  JsonqlGenericObject,
} from '../types'
/* import {
  JsonqlValidationError
} from '@jsonql/errors' */
// import { SPREAD_PREFIX } from '../constants'
import {
  queuePromisesProcess,
} from '@jsonql/utils'
import {
  processValidateResults,
  unwrapPreparedValidateResult,
} from './fn'
import debugFn from 'debug'
const debug = debugFn('jsonql:validator:class:index')
// main
export class ValidatorFactory extends ValidatorFactoryBase {
  // private _errorMessages: Array<Array<string>> = []

  // @TODO need to properly type this astMap
  constructor(astMap: any) {
    super(astMap)
  }
  /** accept an object name => plugin in one go */
  registerPlugins(
    plugins: {[name: string]: JsonqlValidationPlugin}
  ): void {
    for (const name in plugins) {
      this._registerPlugin(name, plugins[name])
    }
  }
  /** wrapper for the protected register plugin method */
  registerPlugin(
    name: string,
    plugin: JsonqlValidationPlugin
  ): void {
    this._registerPlugin(name, plugin)
  }

  /** allow dev to register their error messages */
  /*
  registerErrorMessages(messages: Array<Array<string>>): void {
    // @TODO need to check the format
    this._errorMessages = messages
  }
  */

  /** create an alias for createSchema (and replace it later ) because ii make more sense */
  addValidationRules(
    validationMap: JsonqlObjectValidateInput | JsonqlArrayValidateInput
  ): void {
    this._createSchema(validationMap)
  }
  /** this is where validation happens */
  async validate(values: Array<any>, raw = false) {
    debug(`raw`, raw)
    // this come out with a queue then we put into the chainProcessPromises
    const queues = this._normalizeArgValues(values)

    return queuePromisesProcess(
      queues as unknown as Array<(...args: JsonqlGenericObject[]) => Promise<JsonqlGenericObject>>,
      undefined // the init value will now be undefined to know if its first
    )
    .then((finalResult: any) =>
      raw ? finalResult : this._prepareValidateResult(finalResult)
    )
  }

  /** this will export the map for generate contract */
  export(server = false) {
    console.log(`@TODO`, server)
  }

  /** After the validation the success will get an object with
  argumentName: value object and we make it to an array matching
  the order of the call, then we can pass it directly to method that
  get validated */
  private async _prepareValidateResult(
    validateResult: JsonqlGenericObject
  ): Promise<any[]> {
    debug('validateResult', this._arguments, validateResult)
    // @TODO need to fix the spread input type return result
    return processValidateResults(this._arguments, validateResult)
            .then(unwrapPreparedValidateResult)
  }

  /** map the developer defined error messages */
  /*
  private async _mapErrorMessages(error: JsonqlValidationError) {
    debug(this._errorMessages, error)
  }
  */
}
