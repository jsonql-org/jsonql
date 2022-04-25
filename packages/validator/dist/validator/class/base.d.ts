import { JsonqlValidationPlugin, JsonqlPropertyParamnMap } from '../../types';
/**
The sequence how this should run
1. init - take the AST map and generate automatic validation rules
2. register internal plugins
3. (if any) user can register their own plugins
4. accept the user define rules, at this point we create the full validation map
5. Call the validate method with the data input then the validation will run
*/
export declare class ValidatorFactoryBase {
    private plugins;
    private astWithBaseRules;
    protected schema: Array<JsonqlPropertyParamnMap>;
    constructor(astMap: any);
    /** put the rule in here and make it into an async method */
    protected createSchema(input?: any): void;
    protected generteValidationFn(): void;
    /** normalize the array style rules input */
    protected applyArrayInput(astMap: Array<JsonqlPropertyParamnMap>, input?: any): any[];
    /** nomalize the object style rules input */
    protected applyObjectInput(astMap: Array<JsonqlPropertyParamnMap>, input: any): JsonqlPropertyParamnMap[];
    /** register plugins */
    protected registerPlugin(name: string, rule: JsonqlValidationPlugin): void;
}
