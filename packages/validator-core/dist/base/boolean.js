"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBoolean = void 0;
// check for boolean
const truetypeof_1 = require("@jsonql/utils/dist/truetypeof");
/**
 * if something is a boolean
 */
function checkBoolean(value) {
    return (0, truetypeof_1.trueTypeOf)(value) === 'boolean';
}
exports.checkBoolean = checkBoolean;
