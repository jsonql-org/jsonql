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

export declare type JsonqlValidationPlugin = {
  check: (value: any) => boolean
}

export declare type JsonqlValidationMap = {
  [propName: string]: any
}
// main 
export class ValidatorFactory {

  private plugins = new Map<string, any>()

  constructor(private validationMap: JsonqlValidationMap) {}

  register(name: string, rule: JsonqlValidationPlugin) {
    this.plugins.set(name, rule)
  }

  // this could be a curry method
  run(propName: string, args?: any[]) {
    console.log(propName, this.validationMap)
  }
}
