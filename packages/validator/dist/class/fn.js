"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patternPluginFanctory = exports.hasPluginFunc = exports.checkPluginArg = exports.getOptionalValue = exports.successThen = exports.constructRuleCb = exports.createAutomaticRules = void 0;
const tslib_1 = require("tslib");
const src_1 = require("@jsonql/validator-core/src");
const constants_1 = require("@jsonql/constants");
const constants_2 = require("../constants");
const src_2 = require("@jsonql/errors/src");
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
        ast[constants_2.RULES_KEY] = [contructRuleCbWithAst(ast)];
        return ast;
    });
}
exports.createAutomaticRules = createAutomaticRules;
/**
 when this get put in the execution queue we also
 provide the index (argument position)
 and i the position of this rule within the rules
 */
function contructRuleCbWithAst(ast) {
    const { name } = ast;
    const ruleFn = getValidateRules(ast);
    return constructRuleCb(name, ruleFn);
}
/**
this will get re-use in the class to create method for the queue execution
 */
function constructRuleCb(name, ruleFn) {
    return (value, lastResult, pos) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        return Reflect.apply(ruleFn, null, [value])
            .then(successThen(name, value, lastResult, pos))
            .catch((error) => {
            debug('failed', name, value, error, pos);
            return Promise.reject(new src_2.JsonqlValidationError(name, pos));
        });
    });
}
exports.constructRuleCb = constructRuleCb;
/** This is taken out from the above then call for re-use when we want to fall through a rule */
function successThen(name, value, lastResult, pos) {
    return (result) => {
        debug('passed', name, value, result, pos);
        // return the argument name with the value
        return (0, utils_1.assign)(lastResult, { [name]: value });
    };
}
exports.successThen = successThen;
/** only deal with constructing the basic rules validation fucntion */
function getValidateRules(ast) {
    switch (ast[constants_1.TS_TYPE_NAME]) {
        case constants_1.TS_UNION_TYPE:
            // @TODO need more test on different situation
            // @ts-ignore Typescript is confused again
            return (value) => tslib_1.__awaiter(this, void 0, void 0, function* () { return (0, src_1.checkUnion)(value, ast.type); });
        case constants_1.TS_ARRAY_TYPE || constants_1.SPREAD_ARG_TYPE:
            // need to apply for the type as well
            // @TODO need to examine the input to see what more sutation could come up
            return (value) => tslib_1.__awaiter(this, void 0, void 0, function* () { return (0, src_1.promisify)(src_1.checkArray)(value, ast.types); });
        case constants_1.TS_TYPE_REF || constants_1.TS_TYPE_LIT:
            // @TODO should this get a special treatment
            return (value) => tslib_1.__awaiter(this, void 0, void 0, function* () { return (0, src_1.promisify)(src_1.checkAny)(value); });
        default: // no tstype then should be primitive
            if ((0, src_1.checkString)(ast.type)) {
                return (value) => tslib_1.__awaiter(this, void 0, void 0, function* () { return (0, src_1.promisify)((0, src_1.combineCheck)(ast.type))(value); });
            }
    }
    throw new src_2.JsonqlError(`Unable to determine type from ast map to create validator!`, ast);
}
/** extract the default value if there is none */
function getOptionalValue(arg, param) {
    if (arg !== undefined) {
        return arg;
    }
    return (
    /* param.required === false // we don't need to check this
    && */
    param[constants_1.DEFAULT_VALUE] !== undefined
        ? param[constants_1.DEFAULT_VALUE]
        : undefined);
}
exports.getOptionalValue = getOptionalValue;
/** check plugin argument */
function checkPluginArg(params) {
    return !!params.filter(param => (0, utils_1.inArray)(constants_2.KEYWORDS, param)).length;
}
exports.checkPluginArg = checkPluginArg;
/** check if the actually provide a func or pattern to construct function */
function hasPluginFunc(rule) {
    if (!rule[constants_2.PATTERN_KEY]) {
        const checks = [constants_2.VALIDATE_KEY, constants_2.VALIDATE_ASYNC_KEY, constants_2.PLUGIN_FN_KEY];
        for (let i = 0; i < checks.length; ++i) {
            const fn = checks[i];
            if (rule[fn] && (0, utils_1.isFunction)(fn)) {
                return true;
            }
        }
    }
    return true;
}
exports.hasPluginFunc = hasPluginFunc;
/** If the plugin provide a pattern */
function patternPluginFanctory(pattern) {
    const regex = (0, utils_1.getRegex)(pattern);
    return (value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        return regex.test(value) ?
            Promise.resolve(true) :
            Promise.reject(false);
    });
}
exports.patternPluginFanctory = patternPluginFanctory;
