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



  constructor(validationMap: JsonqlValidationMap) {
    super(validationMap)

  }

  register(name: string, rule: JsonqlValidationPlugin) {
    this.plugins.set(name, rule)
  }

  // this could be a curry method
  run(propName: string, args?: any[]) {
    console.log(propName, this.validationMap)
  }
}
