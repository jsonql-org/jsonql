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
// import { SPREAD_PREFIX } from '../constants'
import {
  queuePromisesProcess,
} from '@jsonql/utils'

import debugFn from 'debug'
const debug = debugFn('jsonql:validator:class:index')
// main
export class ValidatorFactory extends ValidatorFactoryBase {
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
  /** takes the user define rules and generate the full map */
  createSchema(
    validationMap: JsonqlObjectValidateInput | JsonqlArrayValidateInput
  ): void {
    this._createSchema(validationMap)
  }
  /** create an alias for createSchema (and replace it later ) because ii make more sense */
  addValidationRules(
    validationMap: JsonqlObjectValidateInput | JsonqlArrayValidateInput
  ): void {
    this._createSchema(validationMap)
  }
  /** this is where validation happens */
  async validate(values: Array<any>) {
    // this come out with a queue then we put into the chainProcessPromises
    const queues = this._normalizeArgValues(values)

    return queuePromisesProcess(
      queues as unknown as Array<(...args: JsonqlGenericObject[]) => Promise<JsonqlGenericObject>>,
      undefined // the init value will now be undefined to know if its first
    )
    // we need to add one more method to clean up the lastResult
  }

  /** After the validation the success will get an object with
  argumentName: value object and we make it to an array matching
  the order of the call, then we can pass it directly to method that
  get validated */
  async prepareValidateResult(
    validateResult: JsonqlGenericObject
  ): Promise<any[]> {
    debug('validateResult', validateResult)

    // @TODO need to fix the spread input type return result
    return this._arguments.map(name => validateResult[name])
  }

  /** this will export the map for generate contract */
  export(server = false) {
    console.log(`@TODO`, server)
  }
}
