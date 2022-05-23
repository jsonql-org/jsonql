import type { JsonqlValidationPlugin, JsonqlPropertyParamMap, JsonqlArrayValidateInput, JsonqlObjectValidateInput, JsonqlGenericObject } from './types';
/**
The sequence how this should run
1. init - take the AST map and generate automatic validation rules
2. register internal plugins
3. (if any) user can register their own plugins
4. accept the user define rules, at this point we create the full validation map
5. Call the validate method with the data input then the validation will run
*/
export declare class ValidatorFactoryBase {
    private _plugins;
    private _internalPluginNames;
    private _astWithBaseRules;
    private _schema;
    private _errors;
    protected _arguments: Array<string>;
    constructor(astMap: Array<JsonqlPropertyParamMap>);
    /** just return the internal schema for validation for use, see export */
    protected get schema(): JsonqlPropertyParamMap[];
    /** @TODO map the index array to dev speify error messages? */
    protected get errors(): number[][];
    /**
      when validate happens we check the input value
      correspond to out map, and apply the values
      argument values turn into an executable queue
    */
    protected _normalizeArgValues(values: unknown[]): (((lastResult: JsonqlGenericObject) => Promise<any>)[] | (() => Promise<boolean>))[];
    /** The spread or mix with spread argument is too complicated to process in couple lines */
    private _processSpreadLikeArg;
    /**
      at this point we actually put the rules in the queue
      but we dont' run it yet until all rules are in the main queue
      this way, if one fail then the whole queue exited without running further
    */
    private _prepareForExecution;
    /** put the rule in here and make it into an async method */
    protected _createSchema(input: JsonqlObjectValidateInput | JsonqlArrayValidateInput): void;
    /** normalize the array style rules input */
    private _applyArrayInput;
    /** nomalize the object style rules input */
    private _applyObjectInput;
    /** this will transform the rules to executable */
    private _transformInput;
    /** find the plugin internal or external */
    private _lookupPlugin;
    /** register plugins */
    protected _registerPlugin(name: string, pluginConfig: JsonqlValidationPlugin, skipCheck?: boolean): void;
    /**
     We need to keep this library light and can be use in browser / server
     therefore we delegate this import to a external module also by doing so
     we can transport the rules across from server to client
    */
    importValidationFunction(payload: {
        [key: string]: unknown;
    }): void;
}
