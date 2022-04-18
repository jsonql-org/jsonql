"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractParamsFromContract = exports.extractArgsFromPayload = exports.extractSocketPart = exports.isContract = exports.checkIsContract = void 0;
// split the contract into the node side and the generic side
const lodash_1 = require("./lodash");
const generic_1 = require("./generic");
const constants_1 = require("@jsonql/constants");
const errors_1 = require("@jsonql/errors");
/**
 * Check if the json is a contract file or not
 */
function checkIsContract(contract) {
    return (0, lodash_1.isPlainObject)(contract)
        && ((0, generic_1.isObjectHasKey)(contract, constants_1.QUERY_NAME)
            || (0, generic_1.isObjectHasKey)(contract, constants_1.MUTATION_NAME)
            || (0, generic_1.isObjectHasKey)(contract, constants_1.SOCKET_NAME));
}
exports.checkIsContract = checkIsContract;
/**
 * Wrapper method that check if it's contract then return the contract or false
 */
function isContract(contract) {
    return checkIsContract(contract) ? contract : false;
}
exports.isContract = isContract;
/**
 * Ported from jsonql-params-validator but different
 * if we don't find the socket part then return false
 */
function extractSocketPart(contract) {
    if ((0, generic_1.isObjectHasKey)(contract, constants_1.SOCKET_NAME)) {
        return contract[constants_1.SOCKET_NAME];
    }
    return false;
}
exports.extractSocketPart = extractSocketPart;
/**
 * Extract the args from the payload
 */
function extractArgsFromPayload(payload, type) {
    switch (type) {
        case constants_1.QUERY_NAME:
            return payload[constants_1.QUERY_ARG_NAME];
        case constants_1.MUTATION_NAME:
            return [
                payload[constants_1.PAYLOAD_PARAM_NAME],
                payload[constants_1.CONDITION_PARAM_NAME]
            ];
        default:
            throw new errors_1.JsonqlError(`Unknown ${type} to extract argument from!`);
    }
}
exports.extractArgsFromPayload = extractArgsFromPayload;
/**
 * extract the param from a contracct
 */
function extractParamsFromContract(contract, type, name) {
    try {
        const result = contract[type][name];
        // debug('extractParamsFromContract', result)
        if (!result) {
            // debug(name, type, contract)
            throw new errors_1.JsonqlResolverNotFoundError(name, type);
        }
        return result;
    }
    catch (e) {
        throw new errors_1.JsonqlResolverNotFoundError(name, e);
    }
}
exports.extractParamsFromContract = extractParamsFromContract;
