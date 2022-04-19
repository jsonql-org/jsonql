"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractWsPayload = exports.isWsReply = exports.createAcknowledgeMsg = exports.createReplyMsg = exports.createWsReply = exports.createSendPayload = void 0;
// There are the socket related methods ported back from
// ws-server-core and ws-client-core
const constants_1 = require("@jsonql/constants");
const errors_1 = require("@jsonql/errors");
const lodash_1 = require("./lodash");
const params_api_1 = require("./params-api");
const common_1 = require("./common");
const timestamp_1 = require("./timestamp");
const PAYLOAD_NOT_DECODED_ERR = 'payload can not decoded';
const WS_KEYS = [
    constants_1.WS_REPLY_TYPE,
    constants_1.WS_EVT_NAME,
    constants_1.WS_DATA_NAME
];
/////////////////////////////////////
//         REPLY FROM SERVER       //
/////////////////////////////////////
/**
 * This will be a event emit from the client using the send method
 * But we have to change the server to understand it
 */
const createSendPayload = (resolverName, args, str = false) => {
    if ((0, lodash_1.isString)(resolverName) && Array.isArray(args)) {
        let payload = (0, params_api_1.formatPayload)(args);
        // the different is we add a additonal type in the payload
        const result = (0, params_api_1.createDeliverable)(resolverName, payload, { type: constants_1.EMIT_SEND_TYPE });
        return str ? JSON.stringify(result) : result;
    }
    throw new errors_1.JsonqlValidationError(`utils:socket:createSendMsg`, {
        resolverName,
        args,
        message: 'expect resolverName to be string and args to be array!'
    });
};
exports.createSendPayload = createSendPayload;
/**
 * We need to find the TS field and take it out from the previous payload
 * otherwise it will keep on rolling into the structure which is not what we wanted
 * @BUG this never works, the new version of the contract will have a META field to hold this info
 */
const getTsFieldFromData = (data) => {
    let obj = {
        data: {}
    };
    obj[constants_1.TIMESTAMP_PARAM_NAME] = [];
    if (data[constants_1.TIMESTAMP_PARAM_NAME]) {
        const ts = data[constants_1.TIMESTAMP_PARAM_NAME];
        obj[constants_1.TIMESTAMP_PARAM_NAME] = Array.isArray(ts) ? ts : [ts];
        delete data[constants_1.TIMESTAMP_PARAM_NAME];
    }
    obj.data = data;
    return obj;
};
/**
 * The ws doesn't have a acknowledge callback like socket.io
 * so we have to DIY one for ws and other that doesn't have it
 */
const createWsReply = (type, resolverName, data, ts = []) => {
    const obj = getTsFieldFromData((0, common_1.parseJson)(data));
    ts = ts.concat(obj[constants_1.TIMESTAMP_PARAM_NAME]);
    if (!ts.length) {
        ts.push((0, timestamp_1.timestamp)());
    }
    return JSON.stringify({
        data: {
            [constants_1.WS_REPLY_TYPE]: type,
            [constants_1.WS_EVT_NAME]: resolverName,
            [constants_1.WS_DATA_NAME]: obj.data
        },
        [constants_1.TIMESTAMP_PARAM_NAME]: ts
    });
};
exports.createWsReply = createWsReply;
// extended function
const createReplyMsg = (resolverName, data, ts = []) => ((0, exports.createWsReply)(constants_1.EMIT_REPLY_TYPE, resolverName, data, ts));
exports.createReplyMsg = createReplyMsg;
const createAcknowledgeMsg = (resolverName, data, ts = []) => ((0, exports.createWsReply)(constants_1.ACKNOWLEDGE_REPLY_TYPE, resolverName, data, ts));
exports.createAcknowledgeMsg = createAcknowledgeMsg;
/**
 * Check if this is a ws reply
 */
const isWsReply = (payload) => {
    const json = (0, lodash_1.isString)(payload) ? (0, common_1.parseJson)(payload) : payload;
    const { data } = json;
    if (data) {
        let result = WS_KEYS.filter(key => (0, common_1.isObjectHasKey)(data, key));
        return (result.length === WS_KEYS.length) ? data : false;
    }
    return false;
};
exports.isWsReply = isWsReply;
/**
 * Extract data from ws payload
 */
const extractWsPayload = (payload, cb = common_1.nil) => {
    try {
        const json = (0, common_1.parseJson)(payload);
        // now handle the data
        let _data;
        if ((_data = (0, exports.isWsReply)(json)) !== false) {
            // note the ts property is on its own
            Reflect.apply(cb, null, ['_data', _data]);
            return {
                data: (0, common_1.parseJson)(_data[constants_1.WS_DATA_NAME]),
                resolverName: _data[constants_1.WS_EVT_NAME],
                type: _data[constants_1.WS_REPLY_TYPE]
            };
        }
        throw new errors_1.JsonqlError(PAYLOAD_NOT_DECODED_ERR, payload);
    }
    catch (e) {
        return Reflect.apply(cb, null, [constants_1.ERROR_KEY, e]);
    }
};
exports.extractWsPayload = extractWsPayload;
