"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayTypeHandler = exports.isArrayLike = exports.checkArray = void 0;
// validate array type
const lodash_1 = require("../lib/lodash");
const combine_1 = require("./combine");
const constants_1 = require("@jsonql/constants");
const STYLES = {
    ts: constants_1.ARRAY_TS_TYPE_LFT,
    jsdoc: constants_1.ARRAY_TYPE_LFT
};
/**
 * check if its array or array like
 * why the type is a not a boolean?
 */
function checkArray(value, type // @TODO more combination
) {
    if (Array.isArray(value)) {
        if (!type) {
            return true;
        }
        // we test it in reverse
        // @TODO if the type is an array (OR) then what?
        // we need to take into account this could be an array
        let c;
        if (Array.isArray(type)) { // Union type
            c = value.filter((v) => {
                // only need one is correct
                const ctn = type.length;
                for (let i = 0; i < ctn; ++i) {
                    const t = type[i];
                    if ((t === constants_1.ARRAY_TYPE && Array.isArray(v)) ||
                        (t === constants_1.OBJECT_TYPE && (0, lodash_1.isPlainObject)(v)) ||
                        (0, combine_1.combineCheck)(t)(v)) {
                        return false;
                    }
                }
                return true;
            });
        }
        else {
            c = value.filter(v => !(0, combine_1.combineCheck)(type)(v));
        }
        return !(c.length > 0);
    }
    return false;
}
exports.checkArray = checkArray;
/** Take the string type like array.<T> or Array<T> apart */
function destructArrayStr(type, syntax = 'ts') {
    const left = STYLES[syntax];
    if (!left) {
        throw new Error(`Syntax not supported! ${Object.keys(STYLES)}`);
    }
    if (type.indexOf(left) > -1 && type.indexOf(constants_1.ARRAY_TYPE_RGT) > -1) {
        const _type = type.replace(left, '').replace(constants_1.ARRAY_TYPE_RGT, '');
        if (_type.indexOf(constants_1.OR_SEPERATOR)) {
            // return as array
            return _type.split(constants_1.OR_SEPERATOR);
        }
        // return as array
        return [_type];
    }
    return false;
}
/**
 * check if it matches the array.<T> pattern
 * This method will be deprecated soon - we are not using the jsdoc to get the type any more
 * @TODO 2022-04-23 Instead of deprecated this we need to expand this method to use the swc generated map
 * also make it compatible between the array.<T> and the array<T> style (jsdoc or ts)
 */
function isArrayLike(type) {
    // debugFn(type)
    // check ts first
    const check1 = destructArrayStr(type);
    if (!check1) {
        return destructArrayStr(type, 'jsdoc');
    }
    /**
    Todo read the swc generate map here
  
    **/
    return false;
}
exports.isArrayLike = isArrayLike;
/**
 * we might encounter something like array.<T> then we need to take it apart
 @deprecated This method is no longer needed here
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
