"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUnsigned = exports.checkFloat = exports.checkInteger = exports.checkNumber = void 0;
// validator numbers
// import { NUMBER_TYPES } from './constants';
const truetypeof_1 = require("@jsonql/utils/dist/truetypeof");
const expected = 'number';
/**
 * Historical library
 * @2015-05-04 found a problem if the value is a number like string
 * it will pass, so add a check if it's string before we pass to next
 * @2022 completely rewritten from ground up
 */
function checkNumber(value) {
    return (0, truetypeof_1.trueTypeOf)(value) !== expected ? false : !isNaN(parseFloat(value + ''));
}
exports.checkNumber = checkNumber;
// Add more number type / value checking
function checkInteger(value) {
    return (0, truetypeof_1.trueTypeOf)(value) === expected && Number.isInteger(value);
}
exports.checkInteger = checkInteger;
function checkFloat(value) {
    return (0, truetypeof_1.trueTypeOf)(value) === expected
        && !isNaN(value)
        && !Number.isInteger(value);
}
exports.checkFloat = checkFloat;
function checkUnsigned(value) {
    return checkInteger(value) && value >= 0;
}
exports.checkUnsigned = checkUnsigned;
