"use strict";
// some useful methods for error handling
// import { inspect } from 'util'
Object.defineProperty(exports, "__esModule", { value: true });
exports.printError = exports.replaceErrors = void 0;
/**
 * Port this from the CIS App
 * Note the original call singature has a param call `key` but never used
 */
const replaceErrors = function (value) {
    if (value instanceof Error) {
        var error = {};
        Object.getOwnPropertyNames(value).forEach(function (key) {
            error[key] = value[key];
        });
        return error;
    }
    return value;
};
exports.replaceErrors = replaceErrors;
/**
 * create readible string version of the error object
 */
const printError = function (error) {
    //return 'MASKED'; //error.toString();
    return JSON.stringify(error, exports.replaceErrors);
    // return inspect(error, false, null, true)
};
exports.printError = printError;
