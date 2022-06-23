"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneDeep = exports.cloneDeepCheap = void 0;
const truetypeof_1 = require("./truetypeof");
// Poorman ...
const cloneDeepCheap = (obj) => JSON.parse(JSON.stringify(obj));
exports.cloneDeepCheap = cloneDeepCheap;
/*!
 * Create an immutable clone of data (an array, object, map, set, etc.)
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * (c) 2022 Joel Chu rewritten in Typescript and fix a lot of coding style
 */
function cloneDeep(obj) {
    /**
     * Copy properties from the original object to the clone
     */
    function copyProps(clone) {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                clone[key] = cloneDeep(obj[key]);
            }
        }
    }
    /**
     * Create an immutable copy of an object
     */
    function cloneObj() {
        const clone = {};
        copyProps(clone);
        return clone;
    }
    /**
     * Create an immutable copy of an array
     */
    function cloneArr() {
        return obj.map(function (item) {
            return cloneDeep(item);
        });
    }
    /**
     * Create an immutable copy of a Map
     */
    function cloneMap() {
        const clone = new Map();
        for (const [key, val] of obj) {
            clone.set(key, cloneDeep(val));
        }
        return clone;
    }
    /**
     * Create an immutable clone of a Set
     */
    function cloneSet() {
        const clone = new Set();
        for (const item of obj) {
            clone.add(cloneDeep(item));
        }
        return clone;
    }
    /**
     * Create an immutable copy of a function
     */
    function cloneFunction() {
        // @ts-ignore
        const self = this;
        const clone = obj.bind(self);
        copyProps(clone);
        return clone;
    }
    // Get object type
    const type = (0, truetypeof_1.trueTypeOf)(obj);
    switch (type) {
        case 'object':
            return cloneObj();
        case 'array':
            return cloneArr();
        case 'map':
            return cloneMap();
        case 'set':
            return cloneSet();
        case 'function':
            return cloneFunction();
        default:
            return obj;
    }
}
exports.cloneDeep = cloneDeep;
