"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDuplicateRules = exports.patternPluginFanctory = exports.pluginHasFunc = exports.checkPluginArg = exports.getOptionalValue = exports.unwrapPreparedValidateResult = exports.processValidateResults = exports.isResultPackage = exports.successThen = exports.constructRuleCb = exports.createAutomaticRules = void 0;
const tslib_1 = require("tslib");
const validator_core_1 = require("@jsonql/validator-core");
const constants_1 = require("@jsonql/constants");
const constants_2 = require("../constants");
const errors_1 = require("@jsonql/errors");
const utils_1 = require("@jsonql/utils");
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
        ast[constants_2.RULES_KEY] = [constructRuleCb(name, ruleFn, ruleName)];
        return ast;
    });
}
exports.createAutomaticRules = createAutomaticRules;
/**
this will get re-use in the class to create method for the queue execution
 */
function constructRuleCb(argName, ruleFn, ruleName) {
    debug('ruleFn', ruleFn, argName);
    return (value, lastResult, pos) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        return Reflect.apply(ruleFn, null, [value])
            .then(successThen(argName, value, lastResult, pos))
            .catch((error) => {
            debug('failed', argName, value, error, pos);
            // the name should be the validator name - not the property name
            // because the pos already indicator the property
            return Promise.reject(new errors_1.JsonqlValidationError(ruleName, pos));
        });
    });
}
exports.constructRuleCb = constructRuleCb;
/** This is taken out from the above then call for re-use when we want to fall through a rule */
function successThen(argName, value, lastResult, pos // for internal debug use only
) {
    return (result) => {
        const idx = pos[0];
        debug('passed', argName, value, result, pos);
        debug('lastResult', lastResult);
        const newResult = { [constants_2.IDX_KEY]: idx, [constants_2.VALUE_KEY]: value };
        if (lastResult === undefined) { // init
            return { [argName]: newResult };
        }
        // here is the problem with spread result - they have the same name
        if (argName in lastResult) { // we need to check if the key exist this is import NOT VALUE check
            const lr = lastResult[argName];
            if (isResultPackage(lr)) {
                if (!lr.includes(newResult)) {
                    lastResult[argName].push(newResult);
                }
            }
            else if (lr[constants_2.IDX_KEY] !== idx) {
                lastResult[argName] = (0, utils_1.toArray)(lastResult[argName]).concat([newResult]);
            }
            // if it's the same then do nothing
            return lastResult;
        }
        // return the argument name with the value
        return (0, utils_1.assign)(lastResult, { [argName]: newResult });
    };
}
exports.successThen = successThen;
/** check to see if the lastResult contain our lastResult package format or just their value */
function isResultPackage(lastResult, key = constants_2.IDX_KEY) {
    try {
        if (Array.isArray(lastResult)) {
            return !!lastResult.filter((res) => key in res).length;
        }
    }
    catch (e) {
        debug('isResultPackage', e);
    }
    return false;
}
exports.isResultPackage = isResultPackage;
/** need to do this in two steps, first package it again and unwrap it, then next step flatten it */
function processValidateResults(argNames, validateResult) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return argNames.map((argName) => {
            if (constants_2.VALUE_KEY in validateResult[argName]) {
                return validateResult[argName][constants_2.VALUE_KEY];
            }
            else if (isResultPackage(validateResult[argName])) {
                // @BUG this is still wrong its array wrap in an array
                // we need to wrap this one more time for the next step
                return {
                    [constants_2.IS_SPREAD_VALUES_KEY]: validateResult[argName].map((res) => res[constants_2.VALUE_KEY])
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
        if (ctn === 1 && (0, utils_1.objectHasKey)(result[0], constants_2.IS_SPREAD_VALUES_KEY)) {
            return result[0][constants_2.IS_SPREAD_VALUES_KEY];
        }
        else if (isResultPackage(result, constants_2.IS_SPREAD_VALUES_KEY)) {
            let tmp = [];
            for (let i = 0; i < ctn; ++i) {
                if (constants_2.IS_SPREAD_VALUES_KEY in result[i]) {
                    tmp = tmp.concat(result[i][constants_2.IS_SPREAD_VALUES_KEY]);
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
/** only deal with constructing the basic rules validation fucntion */
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
                    return (0, validator_core_1.promisify)(utils_1.notEmpty)(value, true);
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
/** check plugin argument */
function checkPluginArg(params) {
    return !(params.filter(param => (0, utils_1.inArray)(constants_2.KEYWORDS, param)).length > 0);
}
exports.checkPluginArg = checkPluginArg;
/** check if the actually provide a func or pattern to construct function */
function pluginHasFunc(rule) {
    if (!rule[constants_2.PATTERN_KEY]) {
        const checks = [constants_2.VALIDATE_KEY, constants_2.VALIDATE_ASYNC_KEY, constants_2.PLUGIN_FN_KEY];
        for (let i = 0; i < checks.length; ++i) {
            const fn = rule[checks[i]];
            if (fn && (0, utils_1.isFunction)(fn)) {
                return true;
            }
        }
    }
    return false;
}
exports.pluginHasFunc = pluginHasFunc;
/** If the plugin provide a pattern and we construct a function out of it */
function patternPluginFanctory(pattern) {
    const regex = (0, utils_1.getRegex)(pattern);
    return (value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        return regex.test(value) ?
            Promise.resolve(true) :
            Promise.reject(false);
    });
}
exports.patternPluginFanctory = patternPluginFanctory;
/** check if the rule contain duplicate rules that can not be resolve */
function checkDuplicateRules(rule) {
    return [
        constants_2.VALIDATE_KEY, constants_2.VALIDATE_ASYNC_KEY, constants_2.PLUGIN_FN_KEY // @TODO should pattern be standalone?
    ].filter((key) => rule[key] !== undefined);
}
exports.checkDuplicateRules = checkDuplicateRules;
