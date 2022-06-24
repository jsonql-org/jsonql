"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = exports.flatMap = exports.merge = exports.curry = void 0;
const truetypeof_1 = require("./truetypeof");
const object_1 = require("./object");
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
    if ((0, object_1.isObject)(target) && (0, object_1.isObject)(source)) {
        for (const key in source) {
            if ((0, object_1.isObject)(source[key])) {
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
// flatMap native
function flatMap(arr, callback) {
    if (!callback) {
        callback = n => n;
    }
    return arr.flatMap(callback);
}
exports.flatMap = flatMap;
// the lodash-es ESM module can not import from commonjs etc etc etc bug
// so we get rip of most of them
function isString(value) {
    return (0, truetypeof_1.trueTypeOf)(value) === 'string';
}
exports.isString = isString;
