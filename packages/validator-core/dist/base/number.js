"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUnsigned = exports.checkFloat = exports.checkInteger = exports.checkNumber = void 0;
// validator numbers
// import { NUMBER_TYPES } from './constants';
const truetypeof_1 = require("@jsonql/utils/dist/truetypeof");
/**
 * @2015-05-04 found a problem if the value is a number like string
 * it will pass, so add a check if it's string before we pass to next
 */
function checkNumber(value) {
    return (0, truetypeof_1.trueTypeOf)(value) !== 'number' ? false : !isNaN(parseFloat(value + ''));
}
exports.checkNumber = checkNumber;
// Add more number type / value checking
function checkInteger(value) {
    console.log(`@TODO checkInteger`, value);
}
exports.checkInteger = checkInteger;
function checkFloat(value) {
    console.log(`@TODO checkFloat`, value);
}
exports.checkFloat = checkFloat;
function checkUnsigned(value) {
    console.log(`@TODO check unsigned`, value);
}
exports.checkUnsigned = checkUnsigned;
