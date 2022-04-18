"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorNameByInstanceWithDefault = exports.getErrorNameByInstance = void 0;
// get error name by instance
const constants_1 = require("../constants");
/**
 * @param {array} errs list of errors to compare from
 * @param {object} e the error captured
 * @return {array} filtered with name as value
 */
function mapErrToName(errs, e) {
    return errs.filter((err) => e instanceof err)
        .map((err) => err.name);
}
/**
 * just what the name said
 * default return the UNKNOWN_ERROR
 */
function getErrorNameByInstance(errs, e) {
    let error = mapErrToName(errs, e);
    return error.length ? error[0] : constants_1.UNKNOWN_ERROR;
}
exports.getErrorNameByInstance = getErrorNameByInstance;
/**
 * the same as above with a default JsonqlError as default
 */
function getErrorNameByInstanceWithDefault(errs, e) {
    let name = getErrorNameByInstance(errs, e);
    return name === constants_1.UNKNOWN_ERROR ? 'JsonqlError' : name;
}
exports.getErrorNameByInstanceWithDefault = getErrorNameByInstanceWithDefault;
