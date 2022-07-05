"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatStr = exports.showDeep = exports.nil = exports.createEvtName = exports.parseJson = void 0;
const truetypeof_1 = require("./truetypeof");
/**
 * parse string to json or just return the original value if error happened
 */
const parseJson = (n, t = true) => {
    try {
        return (0, truetypeof_1.trueTypeOf)(n) === 'string' ?
            JSON.parse(n) :
            JSON.parse(JSON.stringify(n));
    }
    catch (e) {
        if (t) {
            return n;
        }
        throw e; // just rethrow it
    }
};
exports.parseJson = parseJson;
/**
 * create an event name
 */
const createEvtName = (...args) => args.join('_');
exports.createEvtName = createEvtName;
/**
 * generic placeholder function
 */
const nil = () => false;
exports.nil = nil;
/** handy method to show deep json structure */
const showDeep = (code) => {
    console.dir(code, { depth: null });
};
exports.showDeep = showDeep;
/** from https://www.tutorialstonight.com/javascript-string-format.php
  change to a standard function instead of prototype pollution
*/
function formatStr(str, ...args) {
    return str.replace(/{([0-9]+)}/g, (match, index) => (typeof args[index] === 'undefined' ? match : args[index]));
}
exports.formatStr = formatStr;
