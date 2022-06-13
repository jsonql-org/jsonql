import type { JsonqlValidationPlugin, JsonqlValidationRule } from '@jsonql/validator-core/index';
import type { JsonqlAstFullMap, MixedValidationInput } from './types';
import { Validator } from '@jsonql/validator';
import { ExternalPluginLoader as ValidatorPlugins } from '@jsonql/validator-core/dist/external-plugin-loader';
/**
  Instead of one ast per init
   we now pass the entire ast here
   then get it back via the propertyName
**/
export declare class Validators {
    private _validationRules;
    private _validators;
    private _astMap;
    protected _plugin: ValidatorPlugins;
    /** main */
    constructor(astMap: JsonqlAstFullMap);
    /** get the validator */
    getValidator(propertyName: string): {
        addValidationRules: (input: any) => any;
        validate: (values: unknown[], returnAs?: import("@jsonql/validator/dist/types").ValidateResultReturn | undefined) => Promise<any>;
        prepareArgValues: (values: unknown[]) => any;
    };
    /** directly call the addValidationRules with the propertyName */
    addRules(propertyName: string, rules: MixedValidationInput): Validator;
    /** wrapper for ValidatorPlugin registerPlugin method */
    registerPlugin(name: string, pluginConfig: JsonqlValidationPlugin): void;
    /** export for contract */
    export(): {
        schema: {};
        plugins: import("@jsonql/validator-core/dist/types").JsonqlValidationPlugin[];
    };
    /** check if this rule (plugin) can export to the public */
    checkRuleCanExport(plugins: JsonqlValidationPlugin[]): (rule: JsonqlValidationRule) => boolean;
    /** store the rules for later export */
    private _appendRules;
    /** overload the Validator addValidationRules */
    private _addValidationRules;
    /** just to make sure the ValidationRuleRecord is correct */
    private _checkInput;
}
