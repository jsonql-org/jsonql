"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectTypeHandler = exports.checkObject = void 0;
// validate object type
const lodash_1 = require("../lib/lodash");
// import filter from 'lodash-es/filter'
const combine_1 = require("./combine");
const array_1 = require("./array");
/**
 * @TODO if provide with the keys then we need to check if the key:value type as well
 */
const checkObject = function (value, keys) {
    if ((0, lodash_1.isPlainObject)(value)) {
        if (!keys) {
            return true;
        }
        // @TODO we might have to break it up into a different method
        if ((0, array_1.checkArray)(keys)) {
            // please note we DON'T care if some is optional
            // please refer to the contract.json for the keys
            return !keys.filter(key => {
                const _value = value[key.name];
                return !(key.type.length > key.type.filter(type => {
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
    }
    return false;
};
exports.checkObject = checkObject;
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
    return Reflect.apply(exports.checkObject, null, _args);
};
exports.objectTypeHandler = objectTypeHandler;
