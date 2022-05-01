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
import { ValidatorFactoryBase } from './base';
import { JsonqlValidationPlugin, JsonqlArrayValidateInput, JsonqlObjectValidateInput, JsonqlGenericObject } from '../types';
export declare class ValidatorFactory extends ValidatorFactoryBase {
    constructor(astMap: any);
    /** accept an object name => plugin in one go */
    registerPlugins(plugins: {
        [name: string]: JsonqlValidationPlugin;
    }): void;
    /** wrapper for the protected register plugin method */
    registerPlugin(name: string, plugin: JsonqlValidationPlugin): void;
    /** takes the user define rules and generate the full map */
    createSchema(validationMap: JsonqlObjectValidateInput | JsonqlArrayValidateInput): void;
    /** this is where validation happens */
    validate(values: Array<any>): Promise<any>;
    /** After the validation the success will get an object with
    argumentName: value object and we make it to an array matching
    the order of the call, then we can pass it directly to method that
    get validated */
    prepareValidateResult(validateResult: JsonqlGenericObject): Promise<any[]>;
    /** this will export the map for generate contract */
    export(server?: boolean): void;
}
