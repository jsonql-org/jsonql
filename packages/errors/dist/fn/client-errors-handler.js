"use strict";
// this will add directly to the then call in each http call
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const error_1 = tslib_1.__importDefault(require("../error"));
// import getErrorByStatus from './get-error-by-status'
const constants_1 = require("../constants");
/**
 * We can not just check something like result.data what if the result if false?
 */
const isObjectHasKey = (obj, key) => {
    const keys = Object.keys(obj);
    return !!keys.filter(k => key === k).length;
};
/**
 * It will ONLY have our own jsonql specific implement check
 */
function clientErrorsHandler(result) {
    if (isObjectHasKey(result, 'error')) {
        const { error } = result;
        const { className, name } = error;
        const errorName = className || name;
        // just throw the whole thing back
        const msg = error.message || constants_1.NO_ERROR_MSG;
        const detail = error.detail || error;
        if (errorName && error[errorName]) {
            throw new error[className](msg, detail);
        }
        throw new error_1.default(msg, detail);
    }
    // pass through to the next
    return result;
}
exports.default = clientErrorsHandler;
