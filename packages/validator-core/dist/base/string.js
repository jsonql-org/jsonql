"use strict";
// validate string type
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkString = void 0;
const lodash_1 = require("@jsonql/utils/dist/lodash");
/**
 * double check if its string
 */
function checkString(value) {
    return ((value + '').trim() !== '') ? (0, lodash_1.isString)(value) : false;
}
exports.checkString = checkString;
