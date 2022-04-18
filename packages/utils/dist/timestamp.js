"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamp = void 0;
/**
 * create a timestamp in seconds
 */
const timestamp = (sec = false) => {
    let time = Date.now();
    return sec ? Math.floor(time / 1000) : time;
};
exports.timestamp = timestamp;
