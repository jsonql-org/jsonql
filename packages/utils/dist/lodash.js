"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEqual = exports.isEqualCheap = exports.isString = exports.isPlainObject = exports.flatMap = exports.isObject = exports.merge = exports.curry = void 0;
const truetypeof_1 = require("./truetypeof");
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
    return ((0, truetypeof_1.trueTypeOf)(item) === 'object' && !Array.isArray(item));
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
    return (0, truetypeof_1.trueTypeOf)(value) === 'string';
}
exports.isString = isString;
// Poorman way ...
function isEqualCheap(obj1, obj2) {
    try {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
    catch (e) {
        return false;
    }
}
exports.isEqualCheap = isEqualCheap;
/*
 * Check if two objects or arrays are equal
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * (c) 2022 Joel Chu rewrite in Typescript and fix styling issues
 */
function isEqual(obj1, obj2) {
    function getType(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    }
    function areArraysEqual() {
        // Check length
        if (obj1.length !== obj2.length) {
            return false;
        }
        // Check each item in the array
        for (let i = 0; i < obj1.length; i++) {
            if (!isEqual(obj1[i], obj2[i])) {
                return false;
            }
        }
        // If no errors, return true
        return true;
    }
    function areObjectsEqual() {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }
        // Check each item in the object
        for (const key in obj1) {
            if (Object.prototype.hasOwnProperty.call(obj1, key)) {
                if (!isEqual(obj1[key], obj2[key])) {
                    return false;
                }
            }
        }
        // If no errors, return true
        return true;
    }
    function areFunctionsEqual() {
        return obj1.toString() === obj2.toString();
    }
    function arePrimativesEqual() {
        return obj1 === obj2;
    }
    // Get the object type
    const type = getType(obj1);
    switch (type) {
        case 'array':
            return areArraysEqual();
        case 'object':
            return areObjectsEqual();
        case 'function':
            return areFunctionsEqual();
        default:
            if (type !== getType(obj2)) {
                return false;
            }
            return arePrimativesEqual();
    }
}
exports.isEqual = isEqual;
