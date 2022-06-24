"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readOnly = exports.objectHasKey = exports.arrToObj = exports.assign = exports.getConfigValue = exports.isClass = exports.isPlainObject = exports.isObject = void 0;
const common_1 = require("./common");
const truetypeof_1 = require("./truetypeof");
function isObject(o) {
    return (0, truetypeof_1.trueTypeOf)(o) === 'object';
}
exports.isObject = isObject;
// move the isPlainObject method here
function isPlainObject(o) {
    if (isObject(o)) {
        // If has modified constructor
        const constr = o.constructor;
        /* this check is pointless even {} has prototype
        if (constr === undefined) {
          return true
        } */
        const prot = constr.prototype;
        const nullType = '[Object: null prototype]';
        if (prot.toString().substring(0, nullType.length) === nullType) {
            return true;
        }
        // If has modified prototype
        if (isObject(prot) === false) {
            return false;
        }
        return Reflect.apply(prot['hasOwnProperty'], prot, ['isPrototypeOf']);
    }
    return false;
}
exports.isPlainObject = isPlainObject;
/** short hand of !isPlainObject */
const isClass = (o) => !isPlainObject(o);
exports.isClass = isClass;
/**
 * simple util method to get the value from the config object
 */
const getConfigValue = (name, obj) => (obj && isPlainObject(obj) ? ((name in obj) ? obj[name] : undefined) : undefined);
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
