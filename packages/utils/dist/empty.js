"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = exports.notEmpty = exports.isNotEmpty = exports.isEmptyObj = void 0;
const object_1 = require("./object");
const isEmptyObj = (obj) => (obj && (0, object_1.isPlainObject)(obj) && Object.keys(obj).length === 0);
exports.isEmptyObj = isEmptyObj;
/**
 * Check several parameter that there is something in the param
 */
const isNotEmpty = (param) => (param !== undefined &&
    // param !== false &&
    param !== null &&
    (param + '').trim() !== '');
exports.isNotEmpty = isNotEmpty;
/**
 * Check several parameter that there is something in the param
 this is problematic should rename to isNotEmptyParam
 and we should check if its array is it empty array
 if it's object then if its empty object
 */
function notEmpty(a, valueCheck = false) {
    if (Array.isArray(a)) {
        // @NOTE we now check if its an empty array as well
        return valueCheck ? !!a.length : false;
    }
    if ((0, object_1.isPlainObject)(a)) {
        return valueCheck ? !(0, exports.isEmptyObj)(a) : false;
    }
    return (0, exports.isNotEmpty)(a);
}
exports.notEmpty = notEmpty;
/** just not to make my head hurt */
const isEmpty = (value, valueCheck) => !notEmpty(value, valueCheck);
exports.isEmpty = isEmpty;
