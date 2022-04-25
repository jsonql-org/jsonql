"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAutomaticRules = void 0;
const tslib_1 = require("tslib");
const base_1 = require("../../base");
const constants_1 = require("@jsonql/constants");
/**
The input is what the dev wrote in the validate
The input has two styles
1. object - the key is the parameter name
2. Array of Array, the index correspond to the argument position (later)
all of these has moved to the ValidatorFactoryBase
because the plugins are apply there
*/
/**
  generate an automatic valdiation rule using the AST map
  this part will always happen first then add the user
  generate valdiation rules
*/
function createAutomaticRules(astMap) {
    return astMap.map((ast) => {
        if (!ast.rules) {
            ast.rules = [];
        }
        ast.rules = [getValidateRules(ast)];
        return ast;
    });
}
exports.createAutomaticRules = createAutomaticRules;
/** only deal with constructing the basic rules validation fucntion */
function getValidateRules(ast) {
    switch (ast[constants_1.TS_TYPE_NAME]) {
        case constants_1.TS_UNION_TYPE:
            return (value) => (0, base_1.checkUnion)(value, ast.type);
        case constants_1.TS_ARRAY_TYPE:
            return (value) => tslib_1.__awaiter(this, void 0, void 0, function* () { return (0, base_1.checkArray)(value); });
        case constants_1.TS_TYPE_REF || constants_1.TS_TYPE_LIT:
            // @TODO should this get a special treatment
            return (value) => tslib_1.__awaiter(this, void 0, void 0, function* () { return (0, base_1.checkAny)(value); });
        default: // no tstype then should be primitive
            if ((0, base_1.checkString)(ast.type)) {
                return (value) => tslib_1.__awaiter(this, void 0, void 0, function* () { return (0, base_1.combineCheck)(ast.type)(value); });
            }
    }
    throw new Error(`Unable to determine type from ast map to create validator!`);
}
