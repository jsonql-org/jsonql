"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegex = exports.isRegExp = void 0;
const lodash_1 = require("./lodash");
/**
 * Just check if a pattern is an RegExp object
 */
function isRegExp(pat) {
    return pat instanceof RegExp;
}
exports.isRegExp = isRegExp;
/**
 * Find from the array by matching the pattern
 */
function getRegex(pattern) {
    switch (true) {
        case isRegExp(pattern):
            return pattern;
        case (0, lodash_1.isString)(pattern):
            return new RegExp(pattern);
        default:
            return false;
    }
}
exports.getRegex = getRegex;
