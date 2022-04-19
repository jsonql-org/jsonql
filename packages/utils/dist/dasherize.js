"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dasherize = void 0;
// import trim from 'lodash-es/trim'
/**
 * From underscore.string library
 * turn a string into a-string
 */
const dasherize = (str) => {
    return clearOutput(str
        .trim()
        .replace(/([A-Z])/g, '-$1')
        .replace(/[-_\s]+/g, '-')
        .toLowerCase());
};
exports.dasherize = dasherize;
const clearOutput = (str) => {
    const fc = str.substring(0, 1);
    return (fc !== '_' && fc !== '-') ? str : str.substring(1);
};
