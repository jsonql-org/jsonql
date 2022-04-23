"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAsync = exports.validateSync = exports.normalizeArgs = void 0;
// move the index.js code here that make more sense to find where things are
const base_1 = require("../base");
const constants_1 = require("../lib/constants");
const errors_1 = require("@jsonql/errors");
const utils_1 = require("@jsonql/utils");
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
            return !(0, base_1.objectTypeHandler)(value);
        case type === constants_1.ARRAY_TYPE:
            // debugFn('call ARRAY_TYPE')
            return !(0, base_1.checkArray)(value.arg);
        // @TODO when the type is not present, it always fall through here
        // so we need to find a way to actually pre-check the type first
        // AKA check the contract.json map before running here
        case (tmp = (0, base_1.isArrayLike)(type)) !== false:
            // debugFn('call ARRAY_LIKE: %O', value)
            return !(0, base_1.arrayTypeHandler)(value, tmp);
        default:
            return !(0, base_1.combineCheck)(type)(value.arg);
    }
};
/**
 * it get too longer to fit in one line so break it out from the fn below
 */
const getOptionalValue = function (arg, param) {
    if (arg !== undefined) {
        return arg;
    }
    return (param.optional === true && param.defaultvalue !== undefined ? param.defaultvalue : null);
};
/**
 * padding the arguments with defaultValue if the arguments did not provide the value
 * this will be the name export
 */
const normalizeArgs = function (args, params) {
    // first we should check if this call require a validation at all
    // there will be situation where the function doesn't need args and params
    if (!(0, base_1.checkArray)(params)) {
        // debugFn('params value', params)
        throw new errors_1.JsonqlValidationError(constants_1.PARAMS_NOT_ARRAY_ERR);
    }
    if (params.length === 0) {
        return [];
    }
    if (!(0, base_1.checkArray)(args)) {
        console.info(args);
        throw new errors_1.JsonqlValidationError(constants_1.ARGS_NOT_ARRAY_ERR);
    }
    // debugFn(args, params);
    // fall through switch
    switch (true) {
        case args.length == params.length: // standard
            return args.map((arg, i) => ({
                arg,
                index: i,
                param: params[i]
            }));
        case params[0].variable === true: // using spread syntax
            const type = params[0].type;
            return args.map((arg, i) => ({
                arg,
                index: i,
                param: params[i] || { type, name: '_' }
            }));
        // with optional defaultValue parameters
        case args.length < params.length:
            return params.map((param, i) => ({
                param,
                index: i,
                arg: getOptionalValue(args[i], param),
                optional: param.optional || false
            }));
        // this one pass more than it should have anything after the args.length will be cast as any type
        case args.length > params.length:
            let ctn = params.length;
            // this happens when we have those array.<number> type
            let _type = [constants_1.DEFAULT_TYPE];
            // we only looking at the first one, this might be a @BUG
            /*
            if ((tmp = isArrayLike(params[0].type[0])) !== false) {
              _type = tmp;
            } */
            // if we use the params as guide then the rest will get throw out
            // which is not what we want, instead, anything without the param
            // will get a any type and optional flag
            return args.map((arg, i) => {
                let optional = i >= ctn ? true : !!params[i].optional;
                let param = params[i] || { type: _type, name: `_${i}` };
                return {
                    arg: optional ? getOptionalValue(arg, param) : arg,
                    index: i,
                    param,
                    optional
                };
            });
        // @TODO find out if there is more cases not cover
        default: // this should never happen
            // debugFn('args', args)
            // debugFn('params', params)
            // this is unknown therefore we just throw it!
            throw new errors_1.JsonqlError(constants_1.EXCEPTION_CASE_ERR, { args, params });
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
    let cleanArgs = (0, exports.normalizeArgs)(args, params);
    let checkResult = cleanArgs.filter(p => {
        // v1.4.4 this fixed the problem, the root level optional is from the last fn
        // @ts-ignore need to fix this later
        if (p.optional === true || p.param.optional === true) {
            return optionalHandler(p);
        }
        // because array of types means OR so if one pass means pass
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
