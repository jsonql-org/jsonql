import { JsonqlValidationPlugin, JsonqlPropertyParamnMap, JsonqlArrayValidateInput, JsonqlObjectValidateInput, JsonqlGenericObject } from '../types';
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
    constructor(astMap: any);
    protected get schema(): JsonqlPropertyParamnMap[];
    /** @TODO map the index array to name */
    protected get errors(): number[][];
    /**
      when validate happens we check the input value
      correspond to out map, and apply the values
      argument values turn into an executable queue
    */
    protected _normalizeArgValues(values: any[]): (((lastResult: JsonqlGenericObject) => Promise<any>)[] | (() => Promise<boolean>))[];
    /**
      at this point we actually put the rules in the queue
      but we dont' run it yet until all rules are in the main queue
      this way, if one fail then the whole queue exited without running
    */
    private _prepareForExecution;
    /** put the rule in here and make it into an async method */
    protected _createSchema(input: JsonqlObjectValidateInput | JsonqlArrayValidateInput): void;
    /** normalize the array style rules input */
    private _applyArrayInput;
    /** nomalize the object style rules input */
    private _applyObjectInput;
    /** here is the one that will transform the rules */
    private _transformInput;
    private _lookupPlugin;
    /** register plugins */
    protected _registerPlugin(name: string, rule: JsonqlValidationPlugin, skipCheck?: boolean): void;
}
