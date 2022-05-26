"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAsyncFn = exports.patternPluginFanctory = exports.isResultPackage = exports.successThen = exports.constructRuleCb = exports.paramMatches = exports.pluginHasFunc = exports.checkPluginArg = void 0;
const tslib_1 = require("tslib");
const errors_1 = require("@jsonql/errors");
const constants_1 = require("../constants");
const utils_1 = require("@jsonql/utils");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('jsonql:validator-core:common');
/** check plugin argument against keywords list */
function checkPluginArg(params) {
    return !(params.filter(param => (0, utils_1.inArray)(constants_1.KEYWORDS, param)).length > 0);
}
exports.checkPluginArg = checkPluginArg;
/** now simply it with just one prop check main */
function pluginHasFunc(rule) {
    return rule[constants_1.PLUGIN_FN_KEY] && (0, utils_1.isFunction)(rule[constants_1.PLUGIN_FN_KEY]);
}
exports.pluginHasFunc = pluginHasFunc;
/** check if the params they provide is matching their main method */
function paramMatches(rule) {
    const params = splitMethod(rule.main.toString());
    params.pop();
    const l = params.length;
    if (l === 0 && !rule[constants_1.PARAMS_KEY]) {
        return true; // nothing to check
    }
    const _params = rule.params !== undefined && Array.isArray(rule.params)
        ? rule.params : false;
    if (_params === false) {
        return false;
    }
    if (l > 0 && l === _params.length) {
        if (!!params.filter((param, i) => param !== _params[i]).length) {
            return false;
        }
        return true;
    }
    return false;
}
exports.paramMatches = paramMatches;
function splitMethod(fnStr) {
    return fnStr.split('(')[1]
        .split(')')[0]
        .split(',')
        .map(t => t.trim())
        .filter(t => t !== '');
}
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
        const newResult = { [constants_1.IDX_KEY]: idx, [constants_1.VALUE_KEY]: value };
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
            else if (lr[constants_1.IDX_KEY] !== idx) {
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
function isResultPackage(lastResult, key = constants_1.IDX_KEY) {
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
// from https://thewebdev.info/2022/03/03/how-to-check-a-function-is-async-with-javascript/
function isAsyncFn(fn) {
    const AsyncFunction = (() => tslib_1.__awaiter(this, void 0, void 0, function* () { })).constructor;
    return fn instanceof AsyncFunction;
}
exports.isAsyncFn = isAsyncFn;
