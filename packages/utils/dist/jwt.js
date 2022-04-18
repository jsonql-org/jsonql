"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64Decode = exports.base64Encode = exports.buff = void 0;
// ported from the jsonql-jwt
const constants_1 = require("@jsonql/constants");
/**
 * create a buffer from string
 */
function buff(str, format = constants_1.BASE64_FORMAT) {
    if (Buffer.isBuffer(str)) {
        return str;
    }
    return Buffer.from(str, format);
}
exports.buff = buff;
/**
 * encode in base64 string
 */
const base64Encode = (str) => window.btoa(unescape(encodeURIComponent(str)));
exports.base64Encode = base64Encode;
/**
 * decode from base64 string
 */
const base64Decode = (json) => decodeURIComponent(escape(window.atob(json)));
exports.base64Decode = base64Decode;
