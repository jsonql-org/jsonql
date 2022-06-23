"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curry = exports.merge = exports.isEqual = exports.isString = exports.isPlainObject = exports.flatMap = void 0;
const tslib_1 = require("tslib");
// group all the lodash import export in one place
const lodash_merge_1 = tslib_1.__importDefault(require("lodash.merge"));
exports.merge = lodash_merge_1.default;
const lodash_curry_1 = tslib_1.__importDefault(require("lodash.curry"));
exports.curry = lodash_curry_1.default;
// import mapKeys from 'lodash-es/mapKeys'
// import omitBy from 'lodash-es/omitBy'
/// import isEqual from 'lodash-es/isEqual'
// import findKey from 'lodash-es/findKey'
// import flatMap from 'lodash-es/flatMap'
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
