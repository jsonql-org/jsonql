"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strToBool = exports.strToNum = void 0;
// this is mainly for the string (via url) input then convert to other two primitive type
const lodash_1 = require("./lodash");
/** convert string to number, t = true then throw and hail it */
function strToNum(input, t = false) {
    const n = parseFloat(input);
    if (!(0, lodash_1.isNaN)(n)) {
        return n;
    }
    if (t) {
        throw new Error(`${input} is not number like`);
    }
    return input;
}
exports.strToNum = strToNum;
/** convert string to boolean, same as above */
function strToBool(input, t = false) {
    const i = input.toLowerCase();
    if (i === 'false') {
        return false;
    }
    else if (i === 'true') {
        return true;
    }
    if (t) {
        throw new Error(`${input} is not boolean like`);
    }
    return input; // just return the original
}
exports.strToBool = strToBool;
