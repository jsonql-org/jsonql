"use strict";
// check for boolean
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBoolean = void 0;
/**
 * if something is a boolean
 */
function checkBoolean(value) {
    return value !== null && value !== undefined && typeof value === 'boolean';
}
exports.checkBoolean = checkBoolean;
