"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runValidation = exports.runValidationAction = exports.checkerHandler = exports.enumHandler = exports.validateHandler = void 0;
// breaking the whole thing up to see what cause the multiple calls issue
const lodash_1 = require("../lib/lodash");
const errors_1 = require("@jsonql/errors");
const constants_1 = require("../lib/constants");
const base_1 = require("../base");
const utils_1 = require("@jsonql/utils");
// import debug from 'debug';
// const debugFn = debug('jsonql-params-validator:options:validation')
/**
 * break out to make the code easier to read
 */
function validateHandler(value, cb) {
    // cb is the validateSync methods
    const args = [
        [value[constants_1.ARGS_KEY]],
        [{
                [constants_1.TYPE_KEY]: (0, utils_1.toArray)(value[constants_1.TYPE_KEY]),
                [constants_1.OPTIONAL_KEY]: value[constants_1.OPTIONAL_KEY]
            }]
    ];
    // debugFn('validateHandler', args)
    return Reflect.apply(cb, null, args);
}
exports.validateHandler = validateHandler;
/**
 * Check against the enum value if it's provided
 */
function enumHandler(value, enumv) {
    if ((0, base_1.checkArray)(enumv)) {
        return (0, utils_1.inArray)(enumv, value);
    }
    return true;
}
exports.enumHandler = enumHandler;
/**
 * Allow passing a function to check the value
 * There might be a problem here if the function is incorrect
 * and that will makes it hard to debug what is going on inside
 * @TODO there could be a few feature add to this one under different circumstance
 */
function checkerHandler(value, checker) {
    try {
        return (0, lodash_1.isFunction)(checker) ? checker.apply(null, [value]) : false;
    }
    catch (e) {
        return false;
    }
}
exports.checkerHandler = checkerHandler;
/**
 * Taken out from the runValidaton this only validate the required values
 */
function runValidationAction(cb) {
    return (value, key) => {
        // debugFn('runValidationAction', key, value)
        if (value[constants_1.KEY_WORD]) {
            return value[constants_1.ARGS_KEY];
        }
        const check = validateHandler(value, cb);
        if (check.length) {
            // log('runValidationAction', key, value)
            throw new errors_1.JsonqlTypeError(key, check);
        }
        if (value[constants_1.ENUM_KEY] !== false && !enumHandler(value[constants_1.ARGS_KEY], value[constants_1.ENUM_KEY])) {
            // log(ENUM_KEY, value[ENUM_KEY])
            throw new errors_1.JsonqlEnumError(key);
        }
        if (value[constants_1.CHECKER_KEY] !== false && !checkerHandler(value[constants_1.ARGS_KEY], value[constants_1.CHECKER_KEY])) {
            // log(CHECKER_KEY, value[CHECKER_KEY])
            throw new errors_1.JsonqlCheckerError(key);
        }
        return value[constants_1.ARGS_KEY];
    };
}
exports.runValidationAction = runValidationAction;
/**
 * finally run the options validation
 */
function runValidation(args, cb) {
    const [argsForValidate, pristineValues] = args;
    // turn the thing into an array and see what happen here
    // debugFn('_args', argsForValidate)
    const result = (0, lodash_1.mapValues)(argsForValidate, runValidationAction(cb));
    return (0, lodash_1.merge)(result, pristineValues);
}
exports.runValidation = runValidation;
