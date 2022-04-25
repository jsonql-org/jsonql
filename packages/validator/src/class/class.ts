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
} from '../../types'
// main
export class ValidatorFactory extends ValidatorFactoryBase {

  constructor(astMap: any) {
    super(astMap)
  }
  /** accept an array of plugins in one go less confusion */
  registerPlugins(plugins: Array<JsonqlValidationPlugin>): void {
    plugins.forEach((plugin: JsonqlValidationPlugin)  => {
      this.registerPlugin(plugin.name, plugin)
    })
  }

  /** takes the user define rules and generate the full map */
  createSchema(validationMap: JsonqlValidationMap): void {
    // console.log(propName, this.validationMap)
    // if this never get call, that means we just do automatic
  }

  /** this validation happens */
  validate(values: Array<any>) {
    const argValues = this.normalizeArgValues(values)

  }

  /** this will export the map for generate contract */
  export(server = false) {
    console.log(`@TODO`, server)
  }
}
