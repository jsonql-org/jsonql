import type { JsonqlValidationPlugin } from '@jsonql/validator-core/index';
import type { VeloceAstMap, ValidationRuleRecord } from './types';
/**
  Instead of one ast per init
   we now pass the entire ast here
   then get it back via the propertyName
**/
export declare class Validators {
    private _validationRules;
    private _validators;
    private _plugin;
    private _astMap;
    /** main */
    constructor(astMap: VeloceAstMap);
    /** get the validator */
    getValidator(propertyName: string): {
        addValidationRules: (input: ValidationRuleRecord) => any;
        validate: (values: unknown[], raw?: boolean | undefined) => Promise<any>;
    };
    /** overload the ValidatorPlugin registerPlugin method */
    registerPlugin(name: string, pluginConfig: JsonqlValidationPlugin): void;
    /** export for contract */
    export(): {
        schema: {};
        plugins: import("@jsonql/validator-core/dist/types").JsonqlValidationPlugin[];
    };
    /** store the rules for later export */
    private _appendRules;
    /** overload the Validator addValidationRules */
    private _addValidationRules;
    /** just to make sure the ValidationRuleRecord is correct */
    private _checkInput;
}
