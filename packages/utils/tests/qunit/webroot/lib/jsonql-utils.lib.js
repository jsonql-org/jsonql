(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.JsonqlUtils = {}));
})(this, (function (exports) { 'use strict';

    // this is mainly for the string (via url) input then convert to other two primitive type
    /** convert string to number, t = true then throw and hail it */
    function strToNum(input, t = false) {
        const n = parseFloat(input);
        if (!isNaN(n)) {
            return n;
        }
        if (t) {
            throw new Error(`${input} is not number like`);
        }
        return input;
    }
    /** convert string to boolean, same as above */
    function strToBool(input, t = false) {
        const i = input.toLowerCase();
        if (i === 'false') {
            return false;
        }
        else if (i === 'true') {
            return true;
        }
        if (t) {
            throw new Error(`${input} is not boolean like`);
        }
        return input; // just return the original
    }

    /** access an object node by dot not path */
    function accessByPath(obj, path) {
        if (path.indexOf('.') > -1) {
            const paths = path.split('.').map((p) => strToNum(p));
            const ctn = paths.length;
            let _tmp = null;
            for (let i = 0; i < ctn; ++i) {
                const p = paths[i];
                if (_tmp !== null) {
                    _tmp = _tmp[p];
                }
                else {
                    _tmp = obj[p];
                }
            }
            return _tmp;
        }
        return obj[path];
    }

    /*
     * More accurately check the type of a JavaScript object
     * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
     */
    function trueTypeOf(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    }

    /**
     * DIY in Array
     */
    const inArray = (arr, value) => arr.includes(value);
    // quick and dirty to turn non array to array
    const toArray = (arg) => Array.isArray(arg) ? arg : [arg];
    /**
     * parse string to json or just return the original value if error happened
     */
    const parseJson = (n, t = true) => {
        try {
            return trueTypeOf(n) === 'string' ?
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
    /**
     * create an event name
     */
    const createEvtName = (...args) => args.join('_');
    /**
     * generic placeholder function
     */
    const nil = () => false;
    /** handy method to show deep json structure */
    const showDeep = (code) => {
        console.dir(code, { depth: null });
    };
    /** from https://www.tutorialstonight.com/javascript-string-format.php
      change to a standard function instead of prototype pollution
    */
    function formatStr(str, ...args) {
        return str.replace(/{([0-9]+)}/g, (match, index) => (typeof args[index] === 'undefined' ? match : args[index]));
    }

    /**
     * using just the map reduce to chain multiple functions together
     * @_param {function} mainFn the init function
     * @_param {array} moreFns as many as you want to take the last value and return a new one
     * @_return {function} accept value for the mainFn
     */
    const chainFns = (mainFn, ...moreFns) => ((...args) => (moreFns.reduce((value, nextFn) => (
    // change here to check if the return value is array then we spread it
    Reflect.apply(nextFn, null, toArray(value))), Reflect.apply(mainFn, null, args))));
    /**
     * pass an array of functions to call chainFns
     */
    const chainArrayFns = (fns) => Reflect.apply(chainFns, null, fns);

    function isObject(o) {
        return trueTypeOf(o) === 'object';
    }
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
    /** short hand of !isPlainObject */
    const isClass = (o) => !isPlainObject(o);
    /**
     * simple util method to get the value from the config object
     */
    const getConfigValue = (name, obj) => (obj && isPlainObject(obj) ? ((name in obj) ? obj[name] : undefined) : undefined);
    /**
     * Shorthand method for Object.assign
     */
    const assign = (...args) => Reflect.apply(Object.assign, Object, args);
    /**
      Array to object
    */
    const arrToObj = (args, processor, initValue = {}) => args.map(processor).reduce((a, b) => assign(a, b), initValue);
    /**
     * check if the key existing in an object
     */
    const objectHasKey = (obj, key) => {
        try {
            const keys = Object.keys(obj);
            return inArray(keys, key);
        }
        catch (e) {
            // @_BUG when the obj is not an OBJECT we got some weird output
            return false;
        }
    };
    /**
     * Shorthand method to turn config into immutatble (readonly)
     * was call freeze
     */
    const readOnly = (config) => Object.freeze(config);

    // DIY curry method
    const curry = (fn, ...args) => (fn.length <= args.length) ?
        fn(...args) :
        (...more) => curry(fn, ...args, ...more);
    // import mapKeys from 'lodash-es/mapKeys'
    // import omitBy from 'lodash-es/omitBy'
    // import findKey from 'lodash-es/findKey'
    const merge = (target, ...sources) => {
        if (!sources.length)
            return target;
        const source = sources.shift();
        if (isObject(target) && isObject(source)) {
            for (const key in source) {
                if (isObject(source[key])) {
                    if (!target[key]) {
                        Object.assign(target, {
                            [key]: {}
                        });
                    }
                    merge(target[key], source[key]);
                }
                else {
                    Object.assign(target, {
                        [key]: source[key]
                    });
                }
            }
        }
        return merge(target, ...sources);
    };
    // flatMap native
    function flatMap(arr, callback) {
        if (!callback) {
            callback = n => n;
        }
        return arr.flatMap(callback);
    }
    // the lodash-es ESM module can not import from commonjs etc etc etc bug
    // so we get rip of most of them
    function isString(value) {
        return trueTypeOf(value) === 'string';
    }

    // break it out on its own because
    /**
     * previously we already make sure the order of the namespaces
     * and attach the auth client to it
     */
    function chainPromises(promises, asObject = false) {
        return promises.reduce((promiseChain, currentTask) => (promiseChain.then(chainResults => (currentTask.then(currentResult => (asObject === false ?
            [...chainResults, currentResult] :
            merge(chainResults, currentResult)))))), Promise.resolve(asObject === false ? [] : (isPlainObject(asObject) ? asObject : {})));
    }
    /**
     * This one return a different result from the chainPromises
     * it will be the same like chainFns that take one promise resolve as the next fn parameter
     */
    function chainProcessPromises(initPromise, ...promises) {
        return (...args) => (promises.reduce((promiseChain, currentTask) => (promiseChain.then((chainResult) => (currentTask(chainResult)))), Reflect.apply(initPromise, null, args)));
    }
    /**
     * This is a combine method to run the above chain process
     * cos sometime we don't want to have the process separate (see validator)
     */
    function queuePromisesProcess(queue, ...initValue) {
        // we need to make sure the Array is actually flat array
        const q = flatMap(queue);
        const ex = Reflect.apply(chainProcessPromises, null, q);
        return Reflect.apply(ex, null, initValue);
    }

    // import trim from 'lodash-es/trim'
    /**
     * From underscore.string library
     * turn a string into a-string
     */
    const dasherize = (str) => {
        return clearOutput(str
            .trim()
            .replace(/([A-Z])/g, '-$1')
            .replace(/[-_\s]+/g, '-')
            .toLowerCase());
    };
    const clearOutput = (str) => {
        const fc = str.substring(0, 1);
        return (fc !== '_' && fc !== '-') ? str : str.substring(1);
    };

    const isEmptyObj = (obj) => (obj && isPlainObject(obj) && Object.keys(obj).length === 0);
    /**
     * Check several parameter that there is something in the param
     */
    const isNotEmpty = (param) => (param !== undefined &&
        // param !== false &&
        param !== null &&
        (param + '').trim() !== '');
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
        if (isPlainObject(a)) {
            return valueCheck ? !isEmptyObj(a) : false;
        }
        return isNotEmpty(a);
    }
    /** just not to make my head hurt */
    const isEmpty = (value, valueCheck) => !notEmpty(value, valueCheck);

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    /* looks silly but save a lot of typing */
    const promise = (cb) => __awaiter(void 0, void 0, void 0, function* () { return new Promise(cb); });

    const expected = ['asyncfunction', 'function'];
    /**
     * Simple check if the prop is function
     * We found situtation where it report as an object but debug output show as [Function]
     */
    const isFunction = function (prop, debug = false) {
        const result = trueTypeOf(prop);
        if (expected.includes(result)) {
            return true;
        }
        if (debug) {
            console.error(`Expect to be Function type! Got ${typeof prop}`);
        }
        return false;
    };
    /** finally found a solution to check if something is an async function */
    function isAsyncFunction(prop) {
        return trueTypeOf(prop) === expected[0];
    }

    // Poorman ...
    const cloneDeepCheap = (obj) => JSON.parse(JSON.stringify(obj));
    /*
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
        const type = trueTypeOf(obj);
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

    /**
     * simple for browser console.info wrapper
     */
    function logger(...args) {
        try {
            if (window && window.DEBUG) {
                Reflect.apply(console.log, console, args);
            }
        }
        catch (e) {
            return;
        }
    }
    /**
     * generic logger method can control via global property
     */
    const getLogger = (name) => {
        const base = [name];
        return (...args) => {
            try {
                if (window && window.JSONQL_DEBUG) {
                    Reflect.apply(console.info, console, base.concat(args));
                }
            }
            catch (e) {
                return;
            }
        };
    };

    /**
     * this is essentially the same as the injectToFn
     * but this will not allow overwrite and set the setter and getter
     */
    function objDefineProps(obj, name, setter, getter = null) {
        if (Object.getOwnPropertyDescriptor(obj, name) === undefined) {
            Object.defineProperty(obj, name, {
                set: setter,
                get: getter === null ? function () { return null; } : getter
            });
        }
        return obj;
    }
    /**
     * check if the object has name property
     */
    function objHasProp(obj, name) {
        const prop = Object.getOwnPropertyDescriptor(obj, name);
        return prop !== undefined && prop.value ? prop.value : prop;
    }
    /**
     * After the user login we will use this Object.define add a new property
     * to the resolver with the decoded user data
     */
    function injectToFn(resolver, name, data, overwrite = false) {
        const check = objHasProp(resolver, name);
        if (overwrite === false && check !== undefined) {
            // console.info(`NOT INJECTED`)
            return resolver;
        }
        /* this will throw error! @TODO how to remove props?
        @NOTE 2022 perhaps we could just overwrite this prop with undefined
        if (overwrite === true && check !== undefined) {
          delete resolver[name] // delete this property
        }
        */
        // console.info(`INJECTED`)
        Object.defineProperty(resolver, name, {
            value: data,
            writable: overwrite // if its set to true then we should able to overwrite it
        });
        return resolver;
    }

    /**
     * Just check if a pattern is an RegExp object
     */
    function isRegExp(pat) {
        return pat instanceof RegExp;
    }
    /**
     * Find from the array by matching the pattern
     */
    function getRegex(pattern) {
        switch (true) {
            case isRegExp(pattern):
                return pattern;
            case isString(pattern):
                return new RegExp(pattern);
            default:
                return false;
        }
    }

    /**
     * create a timestamp in seconds
     */
    const timestamp = (sec = false) => {
        const time = Date.now();
        return sec ? Math.floor(time / 1000) : time;
    };

    /**
     * construct a url with query parameters
     */
    const urlParams = (url, params) => {
        const parts = [];
        for (const key in params) {
            parts.push([key, params[key]].join('='));
        }
        return [url, parts.join('&')].join('?');
    };
    /**
     * construct a url with cache burster
     */
    const cacheBurstUrl = (url) => urlParams(url, cacheBurst());
    /**
     * return _cb as key with timestamp
     */
    const cacheBurst = (name = '_cb') => ({ [name]: timestamp() });

    // move out from lodash
    // Poorman way ...
    function isEqualCheap(obj1, obj2) {
        try {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        }
        catch (e) {
            return false;
        }
    }
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

    /**
     * Decode a JWT payload
     * https://stackoverflow.com/a/38552302
     */
    function parseJWT(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    exports.accessByPath = accessByPath;
    exports.arrToObj = arrToObj;
    exports.assign = assign;
    exports.cacheBurst = cacheBurst;
    exports.cacheBurstUrl = cacheBurstUrl;
    exports.chainArrayFns = chainArrayFns;
    exports.chainFns = chainFns;
    exports.chainProcessPromises = chainProcessPromises;
    exports.chainPromises = chainPromises;
    exports.cloneDeep = cloneDeep;
    exports.cloneDeepCheap = cloneDeepCheap;
    exports.createEvtName = createEvtName;
    exports.curry = curry;
    exports.dasherize = dasherize;
    exports.flatMap = flatMap;
    exports.formatStr = formatStr;
    exports.getConfigValue = getConfigValue;
    exports.getLogger = getLogger;
    exports.getRegex = getRegex;
    exports.inArray = inArray;
    exports.injectToFn = injectToFn;
    exports.isAsyncFunction = isAsyncFunction;
    exports.isClass = isClass;
    exports.isEmpty = isEmpty;
    exports.isEmptyObj = isEmptyObj;
    exports.isEqual = isEqual;
    exports.isEqualCheap = isEqualCheap;
    exports.isFunction = isFunction;
    exports.isNotEmpty = isNotEmpty;
    exports.isObject = isObject;
    exports.isPlainObject = isPlainObject;
    exports.isRegExp = isRegExp;
    exports.isString = isString;
    exports.logger = logger;
    exports.merge = merge;
    exports.nil = nil;
    exports.notEmpty = notEmpty;
    exports.objDefineProps = objDefineProps;
    exports.objHasProp = objHasProp;
    exports.objectHasKey = objectHasKey;
    exports.parseJWT = parseJWT;
    exports.parseJson = parseJson;
    exports.promise = promise;
    exports.queuePromisesProcess = queuePromisesProcess;
    exports.readOnly = readOnly;
    exports.showDeep = showDeep;
    exports.strToBool = strToBool;
    exports.strToNum = strToNum;
    exports.timestamp = timestamp;
    exports.toArray = toArray;
    exports.trueTypeOf = trueTypeOf;
    exports.urlParams = urlParams;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
