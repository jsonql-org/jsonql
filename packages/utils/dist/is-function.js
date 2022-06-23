"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAsyncFunction = exports.isFunction = void 0;
const truetypeof_1 = require("./truetypeof");
const expected = ['asyncfunction', 'function'];
/**
 * Simple check if the prop is function
 * We found situtation where it report as an object but debug output show as [Function]
 */
const isFunction = function (prop, debug = false) {
    const result = (0, truetypeof_1.trueTypeOf)(prop);
    if (expected.includes(result)) {
        return true;
    }
    if (debug) {
        console.error(`Expect to be Function type! Got ${typeof prop}`);
    }
    return false;
};
exports.isFunction = isFunction;
/** finally found a solution to check if something is an async function */
function isAsyncFunction(prop) {
    return (0, truetypeof_1.trueTypeOf)(prop) === expected[0];
}
exports.isAsyncFunction = isAsyncFunction;
