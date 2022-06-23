"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEqual = exports.isString = exports.isPlainObject = exports.flatMap = exports.isObject = exports.merge = exports.curry = void 0;
// DIY curry method
const curry = (fn, ...args) => (fn.length <= args.length) ?
    fn(...args) :
    (...more) => (0, exports.curry)(fn, ...args, ...more);
exports.curry = curry;
// import mapKeys from 'lodash-es/mapKeys'
// import omitBy from 'lodash-es/omitBy'
// import findKey from 'lodash-es/findKey'
const merge = (target, ...sources) => {
    if (!sources.length)
        return target;
    const source = sources.shift();
    if ((0, exports.isObject)(target) && (0, exports.isObject)(source)) {
        for (const key in source) {
            if ((0, exports.isObject)(source[key])) {
                if (!target[key]) {
                    Object.assign(target, {
                        [key]: {}
                    });
                }
                (0, exports.merge)(target[key], source[key]);
            }
            else {
                Object.assign(target, {
                    [key]: source[key]
                });
            }
        }
    }
    return (0, exports.merge)(target, ...sources);
};
exports.merge = merge;
const isObject = (item) => {
    return (item && typeof item === 'object' && !Array.isArray(item));
};
exports.isObject = isObject;
function flatMap(arr, callback) {
    if (!callback) {
        callback = n => n;
    }
    return arr.flatMap(callback);
}
exports.flatMap = flatMap;
function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
exports.isPlainObject = isPlainObject;
// the lodash-es ESM module can not import from commonjs etc etc etc bug
// so we get rip of most of them
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
// Poorman way ...
function isEqual(obj1, obj2) {
    try {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
    catch (e) {
        return false;
    }
}
exports.isEqual = isEqual;
