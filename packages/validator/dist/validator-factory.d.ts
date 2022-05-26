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
import { ValidatorBase } from './validator-base';
import type { JsonqlValidationPlugin, JsonqlObjectValidateInput, JsonqlPropertyParamMap } from './types';
import { ValidatorPlugins } from '@jsonql/validator-core';
export declare class Validator extends ValidatorBase {
    /**
      this is now change to accept an instance of ValidatorPlugins (share)
      if only call it with the astMap then it init it as a standalone like before
    */
    constructor(astMap: Array<JsonqlPropertyParamMap>, vp?: ValidatorPlugins);
    /** this is where validation happens */
    validate(values: Array<unknown>, raw?: boolean): Promise<any>;
    /** wrapper for the protected register plugin method */
    registerPlugin(name: string, plugin: JsonqlValidationPlugin): void;
    /** create an alias for createSchema (and replace it later ) because ii make more sense */
    addValidationRules(validationMap: JsonqlObjectValidateInput): void;
    /** After the validation the success will get an object with
    argumentName: value object and we make it to an array matching
    the order of the call, then we can pass it directly to method that
    get validated */
    private _prepareValidateResult;
}
