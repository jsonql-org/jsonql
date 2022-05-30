"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = void 0;
/**
 * Simple check if the prop is function
 * We found situtation where it report as an object but debug output show as [Function]
 */
const isFunction = function (prop, debug = false) {
    if (typeof prop === 'function') {
        return true;
    }
    if (debug) {
        console.error(`Expect to be Function type! Got ${typeof prop}`);
    }
    return false;
};
exports.isFunction = isFunction;
