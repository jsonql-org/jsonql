"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readOnly = exports.nil = exports.assign = exports.isFunction = exports.isEmpty = exports.notEmpty = exports.isNotEmpty = exports.getConfigValue = exports.createEvtName = exports.objectHasKey = exports.parseJson = exports.isEmptyObj = exports.toArray = exports.inArray = void 0;
// bunch of generic helpers
// import isArray from 'lodash-es/isArray'
const lodash_1 = require("./lodash");
/**
 * DIY in Array
 */
const inArray = (arr, value) => !!arr.filter(a => a === value).length;
exports.inArray = inArray;
// quick and dirty to turn non array to array
const toArray = (arg) => Array.isArray(arg) ? arg : [arg];
exports.toArray = toArray;
// check if an obj is empty, ported from Velocejs
const isEmptyObj = (obj) => (obj && Object.keys(obj).length === 0 && obj.constructor === Object);
exports.isEmptyObj = isEmptyObj;
/**
 * parse string to json or just return the original value if error happened
 */
const parseJson = (n, t = true) => {
    try {
        return (0, lodash_1.isString)(n) ?
            JSON.parse(n) :
            JSON.parse(JSON.stringify(n));
    }
    catch (e) {
        if (t) {
            return n;
        }
        throw e; // just rethrow it
    }
};
exports.parseJson = parseJson;
/**
 * check if the key existing in an object
 */
const objectHasKey = (obj, key) => {
    try {
        const keys = Object.keys(obj);
        return (0, exports.inArray)(keys, key);
    }
    catch (e) {
        // @_BUG when the obj is not an OBJECT we got some weird output
        return false;
    }
};
exports.objectHasKey = objectHasKey;
/**
 * create an event name
 */
const createEvtName = (...args) => args.join('_');
exports.createEvtName = createEvtName;
/**
 * simple util method to get the value from the config object
 */
const getConfigValue = (name, obj) => (obj && (0, lodash_1.isPlainObject)(obj) ? ((name in obj) ? obj[name] : undefined) : undefined);
exports.getConfigValue = getConfigValue;
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
    if ((0, lodash_1.isPlainObject)(a)) {
        return valueCheck ? !(0, exports.isEmptyObj)(a) : false;
    }
    return (0, exports.isNotEmpty)(a);
}
exports.notEmpty = notEmpty;
// just not to make my head hurt
const isEmpty = (value, valueCheck) => !notEmpty(value, valueCheck);
exports.isEmpty = isEmpty;
/**
 * Simple check if the prop is function
 */
const isFunction = (prop) => {
    if (typeof prop === 'function') {
        return true;
    }
    console.error(`Expect to be Function type! Got ${typeof prop}`);
    return false;
};
exports.isFunction = isFunction;
/**
 * Shorthand method for Object.assign
 */
const assign = (...args) => Reflect.apply(Object.assign, Object, args);
exports.assign = assign;
/**
 * generic placeholder function
 */
const nil = () => false;
exports.nil = nil;
/**
 * Shorthand method to turn config into immutatble (readonly)
 * was call freeze
 */
const readOnly = (config) => Object.freeze(config);
exports.readOnly = readOnly;
