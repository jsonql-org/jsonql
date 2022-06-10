"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readOnly = exports.objectHasKey = exports.arrToObj = exports.assign = exports.getConfigValue = void 0;
// bunch of object related methods
const common_1 = require("./common");
const lodash_1 = require("./lodash");
/**
 * simple util method to get the value from the config object
 */
const getConfigValue = (name, obj) => (obj && (0, lodash_1.isPlainObject)(obj) ? ((name in obj) ? obj[name] : undefined) : undefined);
exports.getConfigValue = getConfigValue;
/**
 * Shorthand method for Object.assign
 */
const assign = (...args) => Reflect.apply(Object.assign, Object, args);
exports.assign = assign;
/**
Array to object
*/
const arrToObj = (args, processor, initValue = {}) => args.map(processor).reduce((a, b) => (0, exports.assign)(a, b), initValue);
exports.arrToObj = arrToObj;
/**
 * check if the key existing in an object
 */
const objectHasKey = (obj, key) => {
    try {
        const keys = Object.keys(obj);
        return (0, common_1.inArray)(keys, key);
    }
    catch (e) {
        // @_BUG when the obj is not an OBJECT we got some weird output
        return false;
    }
};
exports.objectHasKey = objectHasKey;
/**
 * Shorthand method to turn config into immutatble (readonly)
 * was call freeze
 */
const readOnly = (config) => Object.freeze(config);
exports.readOnly = readOnly;
