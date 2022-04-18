"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// just a simple util method to return the error based on the status code
const constants_1 = require("../constants");
/**
 * use the status code to find the right type of error
 */
function getErrorByStatus(statusCode, contract = false) {
    switch (statusCode) {
        case constants_1.UNAUTHORIZED_STATUS:
            return contract ? 'JsonqlContractAuthError' : 'JsonqlAuthorisationError';
        case constants_1.FORBIDDEN_STATUS:
            return 'JsonqlForbiddenError';
        case constants_1.NOT_FOUND_STATUS:
            return 'JsonqlResolverNotFoundError';
        case constants_1.NOT_ACCEPTABLE_STATUS:
            return 'Jsonql406Error';
        case constants_1.SERVER_INTERNAL_STATUS:
            return 'Jsonql500Error';
        default:
            return 'JsonqlError';
    }
}
exports.default = getErrorByStatus;
