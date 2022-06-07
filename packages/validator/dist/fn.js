"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDuplicateRules = exports.getOptionalValue = exports.unwrapPreparedValidateResult = exports.processValidateResults = exports.createAutomaticRules = void 0;
const tslib_1 = require("tslib");
const validator_core_1 = require("@jsonql/validator-core");
const constants_1 = require("./constants");
const common_1 = require("@jsonql/utils/dist/common");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('jsonql:validator:class:fn');
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
        const { name } = ast;
        const ruleFn = getValidateRules(ast);
        const ruleName = ast[constants_1.TS_TYPE_NAME] || ast.type;
        debug('createAutomaticRules', name, ruleName);
        ast[validator_core_1.RULES_KEY] = [(0, validator_core_1.constructRuleCb)(name, ruleFn, ruleName)];
        return ast;
    });
}
exports.createAutomaticRules = createAutomaticRules;
/** need to do this in two steps, first package it again and unwrap it, then next step flatten it */
function processValidateResults(argNames, validateResult) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return argNames.map((argName) => {
            if (validator_core_1.VALUE_KEY in validateResult[argName]) {
                return validateResult[argName][validator_core_1.VALUE_KEY];
            }
            else if ((0, validator_core_1.isResultPackage)(validateResult[argName])) {
                // @BUG this is still wrong its array wrap in an array
                // we need to wrap this one more time for the next step
                return {
                    [constants_1.IS_SPREAD_VALUES_KEY]: validateResult[argName].map((res) => res[validator_core_1.VALUE_KEY])
                };
            }
            debug(`Return result when we couldn't find way to destruct: ${argName}`, validateResult[argName]);
            return validateResult[argName];
        });
    });
}
exports.processValidateResults = processValidateResults;
/** final step to unwarp the pack result for spread arguments */
// @NOTE there is a potential bug here when the spread type is Array<Array<any>>
// then when we use in the velocejs we flatMap and all the Array inside get flattern
// then again using spread with this wild open types is really BAD API design
function unwrapPreparedValidateResult(result // can not use unknown here
) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        debug('unwrapPreparedValidateResult', result);
        const ctn = result.length;
        if (ctn === 1 && (0, common_1.objectHasKey)(result[0], constants_1.IS_SPREAD_VALUES_KEY)) {
            return result[0][constants_1.IS_SPREAD_VALUES_KEY];
        }
        else if ((0, validator_core_1.isResultPackage)(result, constants_1.IS_SPREAD_VALUES_KEY)) {
            let tmp = [];
            for (let i = 0; i < ctn; ++i) {
                if (constants_1.IS_SPREAD_VALUES_KEY in result[i]) {
                    tmp = tmp.concat(result[i][constants_1.IS_SPREAD_VALUES_KEY]);
                }
                else {
                    tmp.push(result[i]);
                }
            }
            return tmp;
        }
        return result; // nothing to do should be all correct
    });
}
exports.unwrapPreparedValidateResult = unwrapPreparedValidateResult;
/** only deal with constructing the basic rules validation function */
function getValidateRules(ast) {
    debug('getValidateRules ast', ast);
    switch (ast[constants_1.TS_TYPE_NAME]) {
        case constants_1.TS_UNION_TYPE:
            return function unionFn(value) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return (0, validator_core_1.checkUnion)(value, ast.type);
                });
            };
        case constants_1.TS_ARRAY_TYPE || constants_1.SPREAD_ARG_TYPE:
            // need to apply for the type as well
            // @TODO need to examine the input to see what more sutation could come up
            return function arrayFn(value) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return (0, validator_core_1.promisify)(validator_core_1.checkArray)(value, ast.types);
                });
            };
        case constants_1.TS_TYPE_REF || constants_1.TS_TYPE_LIT:
            // @TODO should this get a special treatment
            return function anyFn(value) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return (0, validator_core_1.promisify)(validator_core_1.checkAny)(value);
                });
            };
        case constants_1.SPREAD_ARG_TYPE: // we need to create rule for this one, its been wrong rule
            return function combineFn(value) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return (0, validator_core_1.promisify)((0, validator_core_1.combineCheck)(ast.types))(value);
                });
            };
        default: // no tstype then should be primitive
            if ((0, validator_core_1.checkString)(ast.type)) {
                debug('validation type', ast.type);
                return function combineFn(value) {
                    return tslib_1.__awaiter(this, void 0, void 0, function* () {
                        return (0, validator_core_1.promisify)((0, validator_core_1.combineCheck)(ast.type))(value);
                    });
                };
            }
            // if both are not presented that means this could be a JS code
            // this happen when we use Decorator and toString() to extract the ast
            debug(`getValidateRules`, ast);
            return function emptyFn(value) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return (0, validator_core_1.promisify)(common_1.notEmpty)(value, true);
                });
            };
    }
}
/** extract the default value if there is none */
function getOptionalValue(arg, param) {
    // should be the value undefined then search for defaultvalue
    if (param.tstype !== constants_1.SPREAD_ARG_TYPE && arg === undefined) { // spread argument can not have default value
        return param[constants_1.DEFAULT_VALUE] !== undefined
            ? param[constants_1.DEFAULT_VALUE]
            : undefined;
    }
    return arg;
}
exports.getOptionalValue = getOptionalValue;
/** check if the rule contain duplicate rules that can not be resolve */
function checkDuplicateRules(rule) {
    return [
        validator_core_1.VALIDATE_KEY, validator_core_1.VALIDATE_ASYNC_KEY, validator_core_1.PLUGIN_FN_KEY // @TODO should pattern be standalone?
    ].filter((key) => rule[key] !== undefined);
}
exports.checkDuplicateRules = checkDuplicateRules;
