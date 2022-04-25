"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorFactoryBase = void 0;
const engine_1 = require("./engine");
const base_1 = require("../../base");
const utils_1 = require("@jsonql/utils");
/**
The sequence how this should run
1. init - take the AST map and generate automatic validation rules
2. register internal plugins
3. (if any) user can register their own plugins
4. accept the user define rules, at this point we create the full validation map
5. Call the validate method with the data input then the validation will run
*/
class ValidatorFactoryBase {
    constructor(astMap) {
        this.plugins = new Map();
        this.astWithBaseRules = (0, engine_1.createAutomaticRules)(astMap);
    }
    /** put the rule in here and make it into an async method */
    createSchema(input) {
        let astWithRules = this.astWithBaseRules;
        // all we need to do is check if its empty input 
        if ((0, utils_1.notEmpty)(input)) {
            if ((0, base_1.checkArray)(input)) {
                astWithRules = this.applyArrayInput(astWithRules, input);
            }
            else if ((0, base_1.checkObject)(input)) {
                astWithRules = this.applyObjectInput(astWithRules, input);
            }
        }
        this.schema = astWithRules;
    }
    generteValidationFn() {
    }
    /** normalize the array style rules input */
    applyArrayInput(astMap, input) {
        // we use the astMap as standard
        return astMap.map((ast, i) => {
            return ast;
        });
    }
    /** nomalize the object style rules input */
    applyObjectInput(astMap, input) {
        return astMap.map((ast, i) => {
            return ast;
        });
    }
    /** register plugins */
    registerPlugin(name, rule) {
        this.plugins.set(name, rule);
    }
}
exports.ValidatorFactoryBase = ValidatorFactoryBase;
