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
} from './validator-base'
import type {
  JsonqlValidationPlugin,
  JsonqlArrayValidateInput,
  JsonqlObjectValidateInput,
  JsonqlGenericObject,
  JsonqlPropertyParamMap,
} from './types'
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

  constructor(astMap: Array<JsonqlPropertyParamMap>) {
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

  /** create an alias for createSchema (and replace it later ) because ii make more sense */
  addValidationRules(
    validationMap: JsonqlObjectValidateInput | JsonqlArrayValidateInput
  ): void {
    this._createSchema(validationMap)
  }

  /** map the developer defined error messages */
  /*
  mapErrorMessages(error: JsonqlValidationError) {
    debug(this._errorMessages, error)
  }
  */

  /** this is where validation happens */
  async validate(values: Array<unknown>, raw = false) {
    debug(`raw flag`, raw)
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

  /** this will export the map for generate contract */
  export(server = false) {
    console.log(`@TODO`, server)
    return this.schema
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