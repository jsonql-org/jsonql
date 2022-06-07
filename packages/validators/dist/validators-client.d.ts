import type { JsonqlAstFullMap, ClientPluginConfigs } from './types';
import type { MixedValidationInput } from '@jsonql/validator/index';
import type { Validator } from '@jsonql/validator';
import { Validators } from './validators';
/**
  Here we take the parent methods and onlly deal with the
  generate files / contract
**/
export declare class ValidatorsClient extends Validators {
    /** main */
    constructor(astMap: JsonqlAstFullMap);
    /**
      directly call the addValidationRules with the propertyName
      on the client side this get call after the contract loaded
    */
    addRules(propertyName: string, rules: MixedValidationInput): Validator;
    /** On the client side we don't need a map */
    registerPlugins(pluginConfigs: ClientPluginConfigs): void;
}
