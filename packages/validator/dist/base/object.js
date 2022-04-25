"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectTypeHandler = exports.checkObject = void 0;
// validate object type
const lodash_1 = require("../lib/lodash");
// import filter from 'lodash-es/filter'
const combine_1 = require("./combine");
const array_1 = require("./array");
/**
 * check if the input is object also able to check if key(s) existed in that object
 @TODO need to rethink about how this checkObject keys should be
 */
function checkObject(value, keys) {
    if ((0, lodash_1.isPlainObject)(value)) {
        if (!keys) {
            return true;
        }
        // bs about ts
        if (typeof keys === 'string') {
            return keys in value;
        }
        // @TODO we might have to break it up into a different method
        else if ((0, array_1.checkArray)(keys)) {
            if (typeof keys[0] === 'string') {
                return checkIfKeysInObj(value, keys);
            }
            return checkIfNameTypeInObj(value, keys);
        }
    }
    return false;
}
exports.checkObject = checkObject;
/** check if the keys existed in the object */
function checkIfKeysInObj(value, keys) {
    return !keys.filter((key) => {
        return !(key in value);
    }).length;
}
/** check if JsonqlCheckObjectKeys is in the object */
function checkIfNameTypeInObj(value, keys) {
    // please note we DON'T care if some is optional
    // please refer to the contract.json for the keys
    return !keys.filter((key) => {
        const _value = value[key.name];
        return !(key.type.length > key.type.filter((type) => {
            let tmp;
            if (_value !== undefined) {
                if ((tmp = (0, array_1.isArrayLike)(type)) !== false) {
                    return !(0, array_1.arrayTypeHandler)({ arg: _value }, tmp);
                    // return tmp.filter(t => !checkArray(_value, t)).length;
                    // @TODO there might be an object within an object with keys as well :S
                }
                return !(0, combine_1.combineCheck)(type)(_value);
            }
            return true;
        }).length);
    }).length;
}
/**
 * fold this into it's own function to handler different object type
 */
const objectTypeHandler = function (p) {
    const { arg, param } = p;
    const _args = [arg];
    if (Array.isArray(param.keys) && param.keys.length) {
        _args.push(param.keys);
    }
    // just simple check
    return Reflect.apply(checkObject, null, _args);
};
exports.objectTypeHandler = objectTypeHandler;
