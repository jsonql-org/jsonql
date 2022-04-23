"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineCheck = void 0;
// primitive types
const number_1 = require("./number");
const string_1 = require("./string");
const boolean_1 = require("./boolean");
const any_1 = require("./any");
const constants_1 = require("../lib/constants");
/**
 * this is a wrapper method to call different one based on their type
 */
function combineCheck(type) {
    switch (type) {
        case constants_1.NUMBER_TYPE:
            return number_1.checkNumber;
        case constants_1.STRING_TYPE:
            return string_1.checkString;
        case constants_1.BOOLEAN_TYPE:
            return boolean_1.checkBoolean;
        default:
            return any_1.checkAny;
    }
}
exports.combineCheck = combineCheck;
