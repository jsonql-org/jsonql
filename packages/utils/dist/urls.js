"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheBurst = exports.cacheBurstUrl = exports.urlParams = void 0;
const timestamp_1 = require("./timestamp");
/**
 * construct a url with query parameters
 */
const urlParams = (url, params) => {
    const parts = [];
    for (const key in params) {
        parts.push([key, params[key]].join('='));
    }
    return [url, parts.join('&')].join('?');
};
exports.urlParams = urlParams;
/**
 * construct a url with cache burster
 */
const cacheBurstUrl = (url) => (0, exports.urlParams)(url, (0, exports.cacheBurst)());
exports.cacheBurstUrl = cacheBurstUrl;
/**
 * return _cb as key with timestamp
 */
const cacheBurst = () => ({ _cb: (0, timestamp_1.timestamp)() });
exports.cacheBurst = cacheBurst;
