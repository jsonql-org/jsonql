import type { JsonqlValidationPlugin, JsonqlPropertyParamMap, ValidateResultReturn } from './types';
import { ValidatorBase } from './validator-base';
import { ValidatorPlugins } from '@jsonql/validator-core/dist/validator-plugins';
export declare class Validator extends ValidatorBase {
    /**
      this is now change to accept an instance of ValidatorPlugins (share)
      if only call it with the astMap then it init it as a standalone like before
    */
    constructor(astMap: Array<JsonqlPropertyParamMap>, vp?: ValidatorPlugins);
    /** this is where validation happens */
    validate(values: Array<unknown>, style?: ValidateResultReturn): Promise<any>;
    /** wrapper for the plugin instance register plugin method */
    registerPlugin(name: string, plugin: JsonqlValidationPlugin): void;
    /** After the validation the success will get an object with
    argumentName: value object and we make it to an array matching
    the order of the call, then we can pass it directly to method that
    get validated */
    private _prepareValidateResultForFuncCall;
    /** prepare the validation result as key value pair */
    private _prepareValidateResultAsObject;
}
