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
import {
  JsonqlValidationPlugin,
  JsonqlValidationMap,
  JsonqlArrayValidateInput,
  JsonqlObjectValidateInput
} from '../types'
import {
  queuePromisesProcess,
  showDeep,
} from '@jsonql/utils'
// main
export class ValidatorFactory extends ValidatorFactoryBase {

  constructor(astMap: any) {
    super(astMap)
  }
  /** accept an object name => plugin in one go */
  registerPlugins(plugins: {[name: string]: JsonqlValidationPlugin}): Array<boolean> {
    const result: Array<boolean> = []
    for (const name in plugins) {
      result.push(this._registerPlugin(name, plugins[name]))
    }
    return result
  }
  /** wrapper for the protected register plugin method */
  registerPlugin(name, plugin): boolean {
    return this._registerPlugin(name, plugin)
  }
  /** takes the user define rules and generate the full map */
  createSchema(
    validationMap: JsonqlObjectValidateInput | JsonqlArrayValidateInput
  ): void {
    this._createSchema(validationMap)
  }

  /** this validation happens */
  async validate(values: Array<any>) {
    // this come out with a queue then we put into the chainProcessPromises
    const queues = this._normalizeArgValues(values)

    return queuePromisesProcess(
        queues as unknown as Array<(...args: any[]) => Promise<any>>,
        {}
      )
  }

  /** this will export the map for generate contract */
  export(server = false) {
    console.log(`@TODO`, server)
  }
}
