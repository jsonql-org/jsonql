import type { JsonqlPropertyParamMap, JsonqlObjectValidateInput, MixedValidationInput } from './types';
import type { ValidatorPlugins } from '@jsonql/validator-core/dist/validator-plugins';
/**
The sequence how this should run
1. init - take the AST map and generate automatic validation rules
2. register internal plugins
3. (if any) user can register their own plugins
4. accept the user define rules, at this point we create the full validation map
5. Call the validate method with the data input then the validation will run
*/
export declare class ValidatorBase {
    protected _validatorPluginsInstance?: ValidatorPlugins | undefined;
    private _astWithBaseRules;
    private _schema;
    protected _arguments: Array<string>;
    constructor(astMap: Array<JsonqlPropertyParamMap>, _validatorPluginsInstance?: ValidatorPlugins | undefined);
    /** the main method then in it's sub class will get override */
    validate(values: Array<unknown>): any;
    /**
      on the client side even if its not require validation but we still need to prepare
      the argument for transport so we need the _normalizeArgValues without _prepareForExecution
    */
    prepareArgValues(values: Array<unknown>): any;
    /** just return the internal schema for validation for use, see export */
    get schema(): JsonqlPropertyParamMap[];
    /** overload the addValidationRules method that allow to pass a function or async function */
    addValidationRules(input: MixedValidationInput): void;
    /** just put the function into the right key */
    private _updateInput;
    /**
      when validate happens we check the input value
      correspond to out map, and apply the values
      argument values turn into an executable queue
    */
    protected _normalizeArgValues(values: unknown[], execute?: boolean): any;
    /** The spread or mix with spread argument is too complicated to process in couple lines */
    private _processSpreadLikeArg;
    /**
      at this point we actually put the rules in the queue
      but we dont' run it yet until all rules are in the main queue
      this way, if one fail then the whole queue exited without running further
    */
    private _prepareForExecution;
    /** put the rule in here and make it into an async method */
    protected _createSchema(input: JsonqlObjectValidateInput): void;
    /** nomalize the object style rules input */
    private _applyObjectInput;
    /** this will transform the rules to executable */
    private _transformInput;
    /** wrapper methods for ValidatorPlugins */
    private _lookupPlugin;
}
