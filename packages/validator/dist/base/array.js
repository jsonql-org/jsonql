"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayTypeHandler = exports.isArrayLike = exports.checkArray = void 0;
// validate array type
const combine_1 = require("./combine");
const constants_1 = require("../lib/constants");
/**
 * check if its array or array like
 * why the type is a not a boolean?
 */
function checkArray(value, type = '') {
    if (Array.isArray(value)) {
        if (type === '' || (type + '').trim() === '') {
            return true;
        }
        // we test it in reverse
        // @TODO if the type is an array (OR) then what?
        // we need to take into account this could be an array
        const c = value.filter(v => !(0, combine_1.combineCheck)(type)(v));
        return !(c.length > 0);
    }
    return false;
}
exports.checkArray = checkArray;
/**
 * @deprecated
 * check if it matches the array.<T> pattern
 * This method will be deprecated soon - we are not using the jsdoc to get the type any more
 */
function isArrayLike(type) {
    // @TODO could that have something like array<> instead of array.<>? missing the dot?
    // because type script is Array<T> without the dot
    if (type.indexOf(constants_1.ARRAY_TYPE_LFT) > -1 && type.indexOf(constants_1.ARRAY_TYPE_RGT) > -1) {
        const _type = type.replace(constants_1.ARRAY_TYPE_LFT, '').replace(constants_1.ARRAY_TYPE_RGT, '');
        if (_type.indexOf(constants_1.OR_SEPERATOR)) {
            // return as array
            return _type.split(constants_1.OR_SEPERATOR);
        }
        // return as array
        return [_type];
    }
    // fail return false
    return false;
}
exports.isArrayLike = isArrayLike;
/**
 * we might encounter something like array.<T> then we need to take it apart
 */
function arrayTypeHandler(p, type) {
    const { arg } = p;
    // need a special case to handle the OR type
    // we need to test the args instead of the type(s)
    if (type.length > 1) {
        return !arg.filter((v) => (!(type.length > type.filter((t) => !(0, combine_1.combineCheck)(t)(v)).length))).length;
    }
    // type is array so this will be or!
    return type.length > type.filter((t) => !checkArray(arg, t)).length;
}
exports.arrayTypeHandler = arrayTypeHandler;
