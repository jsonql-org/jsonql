"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAsync = exports.validateSync = exports.normalizeArgs = void 0;
const tslib_1 = require("tslib");
// move the index.js code here that make more sense to find where things are
const src_1 = require("@jsonql/validator-core/src");
const constants_1 = require("@jsonql/constants");
const constants_2 = require("./constants");
const errors_1 = require("@jsonql/errors");
const utils_1 = require("@jsonql/utils");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debugFn = (0, debug_1.default)('validator:main');
// import debug from 'debug'
// const debugFn = debug('jsonql-params-validator:validator')
// also export this for use in other places
/**
 * We need to handle those optional parameter without a default value
 */
const optionalHandler = function (params) {
    const { arg, param } = params;
    if ((0, utils_1.notEmpty)(arg)) {
        // debug('call optional handler', arg, params);
        // loop through the type in param
        return !(param.type.length > param.type.filter((type) => validateHandler(type, params)).length);
    }
    return false;
};
/**
 * actually picking the validator
 */
const validateHandler = function (type, value) {
    let tmp;
    switch (true) {
        case type === constants_1.OBJECT_TYPE:
            // debugFn('call OBJECT_TYPE')
            return !(0, src_1.objectTypeHandler)(value);
        case type === constants_1.ARRAY_TYPE:
            // debugFn('call ARRAY_TYPE')
            return !(0, src_1.checkArray)(value.arg);
        // @TODO when the type is not present, it always fall through here
        // so we need to find a way to actually pre-check the type first
        // AKA check the contract.json map before running here
        case (tmp = (0, src_1.isArrayLike)(type)) !== false:
            // debugFn('call ARRAY_LIKE: %O', value)
            return !(0, src_1.arrayTypeHandler)(value, tmp);
        default:
            return !(0, src_1.combineCheck)(type)(value.arg);
    }
};
/**
 * it get too longer to fit in one line so break it out from the fn below
 */
const getOptionalValue = function (arg, param) {
    if (arg !== undefined) {
        return arg;
    }
    return ((param.optional === true ||
        param.required === false // this is the new SWC generate map
    ) &&
        param.defaultvalue !== undefined
        ? param.defaultvalue
        : null);
};
/**
 * padding the arguments with defaultValue if the arguments did not provide the value
 * this will be the name export
 * @TODO the rules will become
 */
const normalizeArgs = function (argValues, paramNames) {
    if (!(0, src_1.checkArray)(paramNames)) {
        // debugFn('params value', params)
        throw new errors_1.JsonqlValidationError(constants_2.PARAMS_NOT_ARRAY_ERR);
    }
    if (paramNames.length === 0) {
        return []; // when the function doesn't need to validate because no params
    }
    if (!(0, src_1.checkArray)(argValues)) {
        debugFn(argValues);
        throw new errors_1.JsonqlValidationError(constants_2.ARGS_NOT_ARRAY_ERR);
    }
    // debugFn(args, params);
    // fall through switch
    switch (true) {
        case argValues.length == paramNames.length: // standard
            return argValues.map((arg, i) => ({
                arg,
                index: i,
                param: paramNames[i]
            }));
        case paramNames[0].variable === true: // using spread syntax
            return argValues.map((arg, i) => ({
                arg,
                index: i,
                param: paramNames[i] || { type: paramNames[0].type, name: '_' }
            }));
        // with optional defaultValue parameters
        case argValues.length < paramNames.length:
            return paramNames.map((param, i) => ({
                param,
                index: i,
                arg: getOptionalValue(argValues[i], param),
                optional: param.optional || false,
                required: param.required || true
            }));
        // this one pass more than it should have anything after the args.length will be cast as any type
        case argValues.length > paramNames.length:
            // this happens when we have those array.<number> type
            // let _type = [ DEFAULT_TYPE ]
            // we only looking at the first one, this might be a @BUG
            /*
            if ((tmp = isArrayLike(params[0].type[0])) !== false) {
              _type = tmp;
            } */
            // if we use the params as guide then the rest will get throw out
            // which is not what we want, instead, anything without the param
            // will get a any type and optional flag
            return argValues.map((arg, i) => {
                const optional = i >= paramNames.length ? true : !!paramNames[i].optional;
                const required = !optional;
                const param = paramNames[i] || { type: constants_1.DEFAULT_TYPE, name: `_${i}` };
                return {
                    arg: optional ? getOptionalValue(arg, param) : arg,
                    index: i,
                    param,
                    optional,
                    required
                };
            });
        // @TODO find out if there is more cases not cover
        default: // this should never happen
            // debugFn('args', args)
            // debugFn('params', params)
            // this is unknown therefore we just throw it!
            throw new errors_1.JsonqlError(constants_2.EXCEPTION_CASE_ERR, { argValues, paramNames });
    }
};
exports.normalizeArgs = normalizeArgs;
// what we want is after the validaton we also get the normalized result
// which is with the optional property if the argument didn't provide it
/**
 * process the array of params back to their arguments
 */
const processReturn = (result) => result.map(r => r.arg);
/**
 * validator main interface
 */
const validateSync = function (args, params, withResult = false) {
    const cleanArgs = (0, exports.normalizeArgs)(args, params);
    // @TODO it will become an array
    debugFn(cleanArgs);
    const checkResult = cleanArgs.filter(p => {
        // v1.4.4 this fixed the problem, the root level optional is from the last fn
        // @ts-ignore need to fix this later
        if (p.optional === true || p.param.optional === true) {
            return optionalHandler(p);
        }
        // because array of types means OR so if one pass means pass
        // @TODO this will need to change to account for Array of Array
        // also when there is a function style callback
        // therefore there will be no more validateSync and only validateAsync
        return !(p.param.type.length > p.param.type.filter((type) => validateHandler(type, p)).length);
    });
    // using the same convention we been using all this time
    return !withResult ? checkResult : {
        [constants_1.ERROR_KEY]: checkResult,
        [constants_1.DATA_KEY]: processReturn(cleanArgs)
    };
};
exports.validateSync = validateSync;
/**
 * A wrapper method that return promise
 */
const validateAsync = function (args, params, withResult = false) {
    return new Promise((resolver, rejecter) => {
        const result = (0, exports.validateSync)(args, params, withResult);
        if (withResult) {
            return result[constants_1.ERROR_KEY].length ? rejecter(result[constants_1.ERROR_KEY])
                : resolver(result[constants_1.DATA_KEY]);
        }
        // the different is just in the then or catch phrase
        //  @ts-ignore
        return result.length ? rejecter(result) : resolver([]);
    });
};
exports.validateAsync = validateAsync;
