"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultHandler = exports.packError = exports.isJsonqlErrorObj = exports.packResult = exports.getCallMethod = void 0;
// break up from node-middleware
const constants_1 = require("@jsonql/constants");
const common_1 = require("./common");
const timestamp_1 = require("./timestamp");
const lodash_1 = require("./lodash");
/**
 * get what is calling after the above check
 */
const getCallMethod = (method) => {
    const [POST, PUT] = constants_1.API_REQUEST_METHODS;
    switch (true) {
        case method === POST:
            return constants_1.QUERY_NAME;
        case method === PUT:
            return constants_1.MUTATION_NAME;
        default:
            return false;
    }
};
exports.getCallMethod = getCallMethod;
/**
 * wrapper method
 */
const packResult = function (result, ts = false) {
    const payload = { [constants_1.DATA_KEY]: result };
    if (ts && Array.isArray(ts)) {
        ts.push((0, timestamp_1.timestamp)());
        payload[constants_1.TIMESTAMP_PARAM_NAME] = ts;
    }
    return JSON.stringify(payload);
};
exports.packResult = packResult;
/**
 * Check if the error object contain our custom key
 */
const isJsonqlErrorObj = (e) => {
    const searchFields = ['detail', 'className'];
    const test = !!searchFields.filter(field => (0, common_1.objectHasKey)(e, field)).length;
    if (test) {
        return ['className', 'message', 'statusCode']
            .filter(field => (0, common_1.objectHasKey)(e, field))
            .map(field => ({
            [field]: typeof e[field] === 'object' ? e[field].toString() : e[field]
        }))
            .reduce(lodash_1.merge, { detail: e.toString() }); // can only get as much as possible
    }
    return false;
};
exports.isJsonqlErrorObj = isJsonqlErrorObj;
/**
 * wrapper method - the output is trying to match up the structure of the Error sub class
 */
const packError = function (detail, className = 'JsonqlError', statusCode = 0, message = '') {
    const errorObj = { detail, className, statusCode, message };
    // we need to check the detail object to see if it has detail, className and message
    // if it has then we should merge the object instead
    return JSON.stringify({
        [constants_1.ERROR_KEY]: (0, exports.isJsonqlErrorObj)(detail) || errorObj,
        [constants_1.TIMESTAMP_PARAM_NAME]: [(0, timestamp_1.timestamp)()]
    });
};
exports.packError = packError;
// ported from http-client
/**
 * handle the return data
 * @TODO how to handle the return timestamp and calculate the diff?
 */
const resultHandler = (result) => (((0, common_1.objectHasKey)(result, constants_1.DATA_KEY) &&
    !(0, common_1.objectHasKey)(result, constants_1.ERROR_KEY)) ? result[constants_1.DATA_KEY] : result);
exports.resultHandler = resultHandler;
