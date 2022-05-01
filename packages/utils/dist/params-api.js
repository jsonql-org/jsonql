"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMutationFromPayload = exports.getMutationFromArgs = exports.getQueryFromPayload = exports.getQueryFromArgs = exports.createMutationStr = exports.createMutation = exports.createQueryStr = exports.createQuery = exports.createDeliverable = exports.getResolverFromPayload = exports.formatPayload = exports.toPayload = exports.handleTimestamp = void 0;
// ported from jsonql-params-validator
// craete several helper function to construct / extract the payload
// and make sure they are all the same
const constants_1 = require("@jsonql/constants");
const errors_1 = require("@jsonql/errors");
const lodash_1 = require("./lodash");
const timestamp_1 = require("./timestamp");
const common_1 = require("./common");
/**
 * check if the payload has a timestamp field, then append a new timestamp to it
 */
const handleTimestamp = (payload) => {
    let ts = payload[constants_1.TIMESTAMP_PARAM_NAME];
    if (!Array.isArray(ts)) {
        ts = [ts];
    }
    ts.push((0, timestamp_1.timestamp)());
    return ts;
};
exports.handleTimestamp = handleTimestamp;
/**
 * make sure it's an object (it was call formatPayload but it doesn't make sense)
 */
const toPayload = (payload) => ((0, lodash_1.isString)(payload) ? (0, common_1.parseJson)(payload) : payload);
exports.toPayload = toPayload;
/**
 * format the payload with QUERY_ARG_NAME key
 */
const formatPayload = (args) => ({ [constants_1.QUERY_ARG_NAME]: args });
exports.formatPayload = formatPayload;
/**
 * extract the resolver name from the payload
 */
function getResolverFromPayload(payload) {
    const keys = Object.keys(payload);
    return keys.filter(key => key !== constants_1.TIMESTAMP_PARAM_NAME)[0];
}
exports.getResolverFromPayload = getResolverFromPayload;
/**
 * wrapper method to add the timestamp as well
 */
function createDeliverable(resolverName, payload, extra = {}) {
    return Object.assign({
        [resolverName]: payload,
        [constants_1.TIMESTAMP_PARAM_NAME]: [(0, timestamp_1.timestamp)()]
    }, extra);
}
exports.createDeliverable = createDeliverable;
/**
 * generate a query
 */
function createQuery(resolverName, args = [], jsonp = false) {
    if ((0, lodash_1.isString)(resolverName) && Array.isArray(args)) {
        const payload = (0, exports.formatPayload)(args);
        if (jsonp === true) {
            return payload;
        }
        return createDeliverable(resolverName, payload);
    }
    throw new errors_1.JsonqlValidationError('utils:params-api:createQuery', {
        message: `expect resolverName to be string and args to be array!`,
        resolverName,
        args
    });
}
exports.createQuery = createQuery;
/**
 * string version of the createQuery
 */
function createQueryStr(resolverName, args = [], jsonp = false) {
    return JSON.stringify(createQuery(resolverName, args, jsonp));
}
exports.createQueryStr = createQueryStr;
/**
 * create a mutation call
 */
function createMutation(resolverName, payload, condition = {}, jsonp = false) {
    const _payload = {
        [constants_1.PAYLOAD_PARAM_NAME]: payload,
        [constants_1.CONDITION_PARAM_NAME]: condition
    };
    if (jsonp === true) {
        return _payload;
    }
    if ((0, lodash_1.isString)(resolverName)) {
        return createDeliverable(resolverName, _payload);
    }
    throw new errors_1.JsonqlValidationError(`[createMutation] expect resolverName to be string!`, {
        resolverName, payload, condition
    });
}
exports.createMutation = createMutation;
/**
 * string version of createMutation
 */
function createMutationStr(resolverName, payload, condition = {}, jsonp = false) {
    return JSON.stringify(createMutation(resolverName, payload, condition, jsonp));
}
exports.createMutationStr = createMutationStr;
/**
 * Extract the parts from payload and format for use
 */
function getQueryFromArgs(resolverName, payload) {
    if (resolverName && (0, lodash_1.isPlainObject)(payload)) {
        const args = payload[resolverName];
        if (args[constants_1.QUERY_ARG_NAME]) {
            return {
                [constants_1.RESOLVER_PARAM_NAME]: resolverName,
                [constants_1.QUERY_ARG_NAME]: args[constants_1.QUERY_ARG_NAME],
                [constants_1.TIMESTAMP_PARAM_NAME]: (0, exports.handleTimestamp)(payload)
            };
        }
    }
    return false;
}
exports.getQueryFromArgs = getQueryFromArgs;
/**
 * Share function so no repeat
 */
function processPayload(payload, processor) {
    const p = (0, exports.toPayload)(payload);
    const resolverName = getResolverFromPayload(p);
    return Reflect.apply(processor, null, [resolverName, p]);
}
/**
 * extract the payload back
 */
function getQueryFromPayload(payload) {
    const result = processPayload(payload, getQueryFromArgs);
    if (result !== false) {
        return result;
    }
    throw new errors_1.JsonqlValidationError('[getQueryArgs] Payload is malformed!', payload);
}
exports.getQueryFromPayload = getQueryFromPayload;
/**
 * Further break down from method below for use else where
 */
function getMutationFromArgs(resolverName, payload) {
    if (resolverName && (0, lodash_1.isPlainObject)(payload)) {
        const args = payload[resolverName];
        if (args) {
            return {
                [constants_1.RESOLVER_PARAM_NAME]: resolverName,
                [constants_1.PAYLOAD_PARAM_NAME]: args[constants_1.PAYLOAD_PARAM_NAME],
                [constants_1.CONDITION_PARAM_NAME]: args[constants_1.CONDITION_PARAM_NAME],
                [constants_1.TIMESTAMP_PARAM_NAME]: (0, exports.handleTimestamp)(payload)
            };
        }
    }
    return false;
}
exports.getMutationFromArgs = getMutationFromArgs;
/**
 * Extract the mutation part from payload
 */
function getMutationFromPayload(payload) {
    const result = processPayload(payload, getMutationFromArgs);
    if (result !== false) {
        return result;
    }
    throw new errors_1.JsonqlValidationError('[getMutationArgs] Payload is malformed!', payload);
}
exports.getMutationFromPayload = getMutationFromPayload;
