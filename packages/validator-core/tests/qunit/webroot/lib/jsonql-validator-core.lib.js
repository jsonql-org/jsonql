(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tty'), require('util'), require('os')) :
	typeof define === 'function' && define.amd ? define(['exports', 'tty', 'util', 'os'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.JsonqlValidatorCore = {}, global.require$$1, global.require$$1$1, global.require$$0));
})(this, (function (exports, require$$1, require$$1$1, require$$0) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
	var require$$1__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$1$1);
	var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var lodash = {};

	var truetypeof = {};

	Object.defineProperty(truetypeof, "__esModule", { value: true });
	var trueTypeOf_1 = truetypeof.trueTypeOf = void 0;
	/*
	 * More accurately check the type of a JavaScript object
	 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
	 */
	function trueTypeOf(obj) {
	    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	}
	trueTypeOf_1 = truetypeof.trueTypeOf = trueTypeOf;

	var object = {};

	var common$1 = {};

	Object.defineProperty(common$1, "__esModule", { value: true });
	common$1.formatStr = common$1.showDeep = common$1.nil = common$1.createEvtName = common$1.parseJson = toArray_1 = common$1.toArray = common$1.inArray = void 0;
	const truetypeof_1$1 = truetypeof;
	/**
	 * DIY in Array
	 */
	const inArray = (arr, value) => arr.includes(value);
	common$1.inArray = inArray;
	// quick and dirty to turn non array to array
	const toArray = (arg) => Array.isArray(arg) ? arg : [arg];
	var toArray_1 = common$1.toArray = toArray;
	/**
	 * parse string to json or just return the original value if error happened
	 */
	const parseJson = (n, t = true) => {
	    try {
	        return (0, truetypeof_1$1.trueTypeOf)(n) === 'string' ?
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
	common$1.parseJson = parseJson;
	/**
	 * create an event name
	 */
	const createEvtName = (...args) => args.join('_');
	common$1.createEvtName = createEvtName;
	/**
	 * generic placeholder function
	 */
	const nil = () => false;
	common$1.nil = nil;
	/** handy method to show deep json structure */
	const showDeep = (code) => {
	    console.dir(code, { depth: null });
	};
	common$1.showDeep = showDeep;
	/** from https://www.tutorialstonight.com/javascript-string-format.php
	  change to a standard function instead of prototype pollution
	*/
	function formatStr(str, ...args) {
	    return str.replace(/{([0-9]+)}/g, (match, index) => (typeof args[index] === 'undefined' ? match : args[index]));
	}
	common$1.formatStr = formatStr;

	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.readOnly = exports.objectHasKey = exports.arrToObj = exports.assign = exports.getConfigValue = exports.isClass = exports.isPlainObject = exports.isObject = void 0;
		const common_1 = common$1;
		const truetypeof_1 = truetypeof;
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
	} (object));

	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.isString = exports.flatMap = exports.merge = exports.curry = void 0;
		const truetypeof_1 = truetypeof;
		const object_1 = object;
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
	} (lodash));

	// validate string type
	/**
	 * double check if its string
	 */
	function checkString(value) {
	    return ((value + '').trim() !== '') ? lodash.isString(value) : false;
	}

	// check for boolean
	/**
	 * if something is a boolean
	 */
	function checkBoolean(value) {
	    return trueTypeOf_1(value) === 'boolean';
	}

	// validator numbers
	/**
	 * @2015-05-04 found a problem if the value is a number like string
	 * it will pass, so add a check if it's string before we pass to next
	 */
	function checkNumber(value) {
	    return trueTypeOf_1(value) !== 'number' ? false : !isNaN(parseFloat(value + ''));
	}
	// Add more number type / value checking
	function checkInteger(value) {
	    console.log(`@TODO checkInteger`, value);
	}
	function checkFloat(value) {
	    console.log(`@TODO checkFloat`, value);
	}
	function checkUnsigned(value) {
	    console.log(`@TODO check unsigned`, value);
	}

	/** validate any thing only check if there is something */
	function checkAny(value, checkNull = true) {
	    if (value !== undefined && value !== '' && (value + '').trim() !== '') {
	        if (checkNull === false || (checkNull === true && value !== null)) {
	            return true;
	        }
	    }
	    return false;
	}

	// ported from @jsonql/constants
	const OR_SEPERATOR = '|';
	const BOOLEAN_TYPE = 'boolean';
	const STRING_TYPE = 'string';
	const NUMBER_TYPE = 'number';
	const ARRAY_TYPE = 'array';
	const OBJECT_TYPE = 'object';
	// Legacy
	const ARRAY_TS_TYPE_LFT = 'Array<';
	const ARRAY_TYPE_LFT = 'array.<';
	const ARRAY_TYPE_RGT = '>';
	// local
	const VALIDATE_KEY = 'validate';
	const VALIDATE_ASYNC_KEY = 'validateAsync';
	const PLUGIN_KEY = 'plugin';
	const PLUGIN_FN_KEY = 'main';
	const PATTERN_KEY = 'pattern';
	const RULES_KEY = 'rules';
	const NAME_KEY = 'name';
	const PARAMS_KEY = 'params';
	const IDX_KEY = '$$idx';
	const VALUE_KEY = '$$value';
	const RESERVED_WORD_ERR = 'Your plugin config argument contains reserved keywords';
	const ARG_NOT_MATCH_ERR = "Your params doesn't matching your main argument list";
	const MAIN_NOT_FOUND_ERR = "Can not find 'main' method in your plugin config";
	const KEYWORDS = [
	    PARAMS_KEY,
	    PATTERN_KEY,
	    VALIDATE_KEY,
	    VALIDATE_ASYNC_KEY,
	    PLUGIN_KEY,
	    RULES_KEY,
	    'name',
	    'type',
	    'types',
	    'server',
	    'tstype',
	    'value',
	    'optional',
	    'tmp',
	    'pos',
	    'lastResult',
	];

	// primitive types
	/**
	 * this is a wrapper method to call different one based on their type
	 */
	function combineCheck(type) {
	    switch (type) {
	        case NUMBER_TYPE:
	            return checkNumber;
	        case STRING_TYPE:
	            return checkString;
	        case BOOLEAN_TYPE:
	            return checkBoolean;
	        default:
	            return checkAny;
	    }
	}

	const STYLES = {
	    ts: ARRAY_TS_TYPE_LFT,
	    jsdoc: ARRAY_TYPE_LFT
	};
	/**
	 * check if its array or array like
	 * why the type is a not a boolean?
	 */
	function checkArray(value, type // @TODO more combination
	) {
	    if (Array.isArray(value)) {
	        if (!type) {
	            return true;
	        }
	        // we test it in reverse
	        // @TODO if the type is an array (OR) then what?
	        // we need to take into account this could be an array
	        let c;
	        if (Array.isArray(type)) { // Union type
	            c = value.filter((v) => {
	                // only need one is correct
	                const ctn = type.length;
	                for (let i = 0; i < ctn; ++i) {
	                    const t = type[i];
	                    if ((t === ARRAY_TYPE && Array.isArray(v)) ||
	                        (t === OBJECT_TYPE && object.isPlainObject(v)) ||
	                        combineCheck(t)(v)) {
	                        return false;
	                    }
	                }
	                return true;
	            });
	        }
	        else {
	            c = value.filter(v => !combineCheck(type)(v));
	        }
	        return !(c.length > 0);
	    }
	    return false;
	}
	/** Take the string type like array.<T> or Array<T> apart */
	function destructArrayStr(type, syntax = 'ts') {
	    const left = STYLES[syntax];
	    if (!left) {
	        throw new Error(`Syntax not supported! ${Object.keys(STYLES)}`);
	    }
	    if (type.indexOf(left) > -1 && type.indexOf(ARRAY_TYPE_RGT) > -1) {
	        const _type = type.replace(left, '').replace(ARRAY_TYPE_RGT, '');
	        if (_type.indexOf(OR_SEPERATOR)) {
	            // return as array
	            return _type.split(OR_SEPERATOR);
	        }
	        // return as array
	        return [_type];
	    }
	    return false;
	}
	/**
	 * check if it matches the array.<T> pattern
	 * This method will be deprecated soon - we are not using the jsdoc to get the type any more
	 * @TODO 2022-04-23 Instead of deprecated this we need to expand this method to use the swc generated map
	 * also make it compatible between the array.<T> and the array<T> style (jsdoc or ts)
	 */
	function isArrayLike(type) {
	    // debugFn(type)
	    // check ts first
	    const check1 = destructArrayStr(type);
	    if (!check1) {
	        return destructArrayStr(type, 'jsdoc');
	    }
	    /**
	    Todo read the swc generate map here
	  
	    **/
	    return false;
	}
	/**
	 * we might encounter something like array.<T> then we need to take it apart
	 @TODO_deprecated This method is no longer needed here
	 */
	function arrayTypeHandler(p, type) {
	    const { arg } = p;
	    // need a special case to handle the OR type
	    // we need to test the args instead of the type(s)
	    if (type.length > 1) {
	        return !arg.filter((v) => (!(type.length > type.filter((t) => !combineCheck(t)(v)).length))).length;
	    }
	    // type is array so this will be or!
	    return type.length > type.filter((t) => !checkArray(arg, t)).length;
	}

	/**
	 * check if the input is object also able to check if key(s) existed in that object
	 @TODO need to rethink about how this checkObject keys should be
	 */
	function checkObject(value, keys) {
	    if (object.isPlainObject(value)) {
	        if (!keys) {
	            return true;
	        }
	        // bs about ts
	        if (typeof keys === 'string') {
	            return keys in value;
	        }
	        // @TODO we might have to break it up into a different method
	        else if (checkArray(keys)) {
	            if (typeof keys[0] === 'string') {
	                return checkIfKeysInObj(value, keys);
	            }
	            return checkIfNameTypeInObj(value, keys);
	        }
	    }
	    return false;
	}
	/** check if the keys existed in the object */
	function checkIfKeysInObj(value, keys) {
	    return !keys.filter((key) => {
	        return !(key in value);
	    }).length;
	}
	/** check if JsonqlCheckObjectKeys is in the object */
	function checkIfNameTypeInObj(value, keys) {
	    // please note we DON'T care if some is optional
	    // please refer to the contract.json for the keys
	    return !keys.filter((key) => {
	        const _value = value[key.name];
	        return !(key.type.length > key.type.filter((type) => {
	            let tmp;
	            if (_value !== undefined) {
	                if ((tmp = isArrayLike(type)) !== false) {
	                    return !arrayTypeHandler({ arg: _value }, tmp);
	                    // return tmp.filter(t => !checkArray(_value, t)).length;
	                    // @TODO there might be an object within an object with keys as well :S
	                }
	                return !combineCheck(type)(_value);
	            }
	            return true;
	        }).length);
	    }).length;
	}
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
	    return Reflect.apply(checkObject, null, _args);
	};
	/** check if an object is empty */
	const isEmptyObject = function (value) {
	    if (object.isPlainObject(value)) {
	        const keys = Object.keys(value);
	        return !keys.length;
	    }
	    return false;
	};

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

	var chainPromises$1 = {};

	Object.defineProperty(chainPromises$1, "__esModule", { value: true });
	var queuePromisesProcess_1 = chainPromises$1.queuePromisesProcess = chainPromises$1.chainProcessPromises = chainPromises$1.chainPromises = void 0;
	// break it out on its own because
	// it's building from the lodash-es from scratch
	// according to this discussion https://github.com/lodash/lodash/issues/3298
	const lodash_1$1 = lodash;
	const object_1 = object;
	/**
	 * previously we already make sure the order of the namespaces
	 * and attach the auth client to it
	 */
	function chainPromises(promises, asObject = false) {
	    return promises.reduce((promiseChain, currentTask) => (promiseChain.then(chainResults => (currentTask.then(currentResult => (asObject === false ?
	        [...chainResults, currentResult] :
	        (0, lodash_1$1.merge)(chainResults, currentResult)))))), Promise.resolve(asObject === false ? [] : ((0, object_1.isPlainObject)(asObject) ? asObject : {})));
	}
	chainPromises$1.chainPromises = chainPromises;
	/**
	 * This one return a different result from the chainPromises
	 * it will be the same like chainFns that take one promise resolve as the next fn parameter
	 */
	function chainProcessPromises(initPromise, ...promises) {
	    return (...args) => (promises.reduce((promiseChain, currentTask) => (promiseChain.then((chainResult) => (currentTask(chainResult)))), Reflect.apply(initPromise, null, args)));
	}
	chainPromises$1.chainProcessPromises = chainProcessPromises;
	/**
	 * This is a combine method to run the above chain process
	 * cos sometime we don't want to have the process separate (see validator)
	 */
	function queuePromisesProcess(queue, ...initValue) {
	    // we need to make sure the Array is actually flat array
	    const q = (0, lodash_1$1.flatMap)(queue);
	    const ex = Reflect.apply(chainProcessPromises, null, q);
	    return Reflect.apply(ex, null, initValue);
	}
	queuePromisesProcess_1 = chainPromises$1.queuePromisesProcess = queuePromisesProcess;

	/** wrap the or return result together */
	function typeAsFail(result, type) {
	    return result || type;
	}
	/**
	We use the chainProcessPromises fail and exit side effects to
	accomplish this task fast, because it's OR so only need to
	have one of them pass that means all pass
	so if one pass we throw Error and it will exist
	if it fail we resolve it therefore the then is actually failed
	*/
	function generateReversePromisesFn(value, types, extended // this will be check keys
	) {
	    // we return it as a function therefore
	    // if the last one fail the next one no need to get exeucte
	    return types.map((type, i) => {
	        const args = [value];
	        if (extended && extended[i]) {
	            args.push(extended[i]);
	        }
	        switch (type) {
	            case ARRAY_TYPE:
	                return () => typeAsFail(Reflect.apply(checkArray, null, args), type);
	            case OBJECT_TYPE:
	                return () => typeAsFail(Reflect.apply(checkObject, null, args), type);
	            default:
	                return () => typeAsFail(combineCheck(type)(value), type);
	        }
	    })
	        .map(fn => (
	    // this treat result in opposite way because once one pass
	    // then we want to exit the queue (it's OR just need one to pass)
	    () => __awaiter(this, void 0, void 0, function* () {
	        const result = fn();
	        // @TODO may be push them together in one array?
	        return result === true ? Promise.reject(true) : Promise.resolve(result);
	    })));
	}
	/**
	  because the union type is OR
	  therefore it has to be check in one rule
	*/
	function checkUnion(value, types, extended) {
	    return __awaiter(this, void 0, void 0, function* () {
	        const ps = generateReversePromisesFn(value, types, extended);
	        // we wrap this in another promise to reverse the result
	        return new Promise((resolver, rejecter) => {
	            /**
	            There is a weird behavior here, if we call the catch first
	            the 'then' always get call, it might be a promise A behavior
	            */
	            queuePromisesProcess_1(ps, types[0])
	                .then((type) => {
	                // console.log('failed', type)
	                rejecter(type);
	            })
	                .catch((res) => {
	                // console.log('passed', res)
	                resolver(res);
	            });
	        });
	    });
	}
	/**
	 * Create a sync version of checkUnion
	 */
	function checkUnionSync(value, types) {
	    const ctn = types.length;
	    for (let i = 0; i < ctn; ++i) {
	        const type = types[i];
	        switch (type) {
	            case ARRAY_TYPE:
	                if (checkArray(value)) {
	                    return true;
	                }
	                break;
	            case OBJECT_TYPE:
	                if (checkObject(value)) {
	                    return true;
	                }
	                break;
	            default:
	                if (combineCheck(type)(value)) {
	                    return true;
	                }
	        }
	    }
	    return false;
	}

	// create our own promisify method here
	/** it's quite annoying Typescript Function type is useless */
	function promisify(fn) {
	    return (...args) => __awaiter(this, void 0, void 0, function* () {
	        const result = yield Reflect.apply(fn, null, args);
	        return result ? Promise.resolve(result) : Promise.reject(result);
	    });
	}
	/** When the result is true get rejected and vice vesa */
	function reversePromisifyResult(fn) {
	    return (...args) => __awaiter(this, void 0, void 0, function* () {
	        const result = yield Reflect.apply(fn, null, args);
	        return result ? Promise.reject(result) : Promise.resolve(result);
	    });
	}

	// import { isString } from '@jsonql/utils/dist/lodash'
	// @NOTE can not use the isString method because stupid Typescript complaint it's not string
	// even you cast it again
	function len(value) {
	    return typeof value === 'string'
	        ? value.length
	        : value;
	}

	const name$8 = 'moreThan';
	function main$8(num, value) {
	    return len(value) > num;
	}
	var moreThan = {
	    name: name$8,
	    main: main$8,
	    params: ['num']
	};

	const name$7 = "lessThan";
	function main$7(num, value) {
	    return len(value) < num;
	}
	var lessThan = {
	    name: name$7,
	    main: main$7,
	    params: ['num']
	};

	// between
	const name$6 = 'between';
	function main$6(max, min, value) {
	    return lessThan.main(max, value) && moreThan.main(min, value);
	}
	// so when we register it, we know what param we should expect
	var between = {
	    main: main$6,
	    name: name$6,
	    params: ['max', 'min']
	};

	// email validator
	// this is an example how to create a plugin
	// one default export method accept one parameter value return boolean
	// then export a named export call name: string and that's it
	// or just return a string regex pattern: string
	const name$5 = 'email';
	function main$5(value) {
	    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return pattern.test(value);
	}
	var email = {
	    main: main$5,
	    name: name$5,
	};

	// test for integer
	const name$4 = "int";
	function main$4(value) {
	    return Number.isInteger(value);
	}
	var int = {
	    name: name$4,
	    main: main$4,
	};

	const name$3 = 'lessThanEqual';
	function main$3(num, value) {
	    return len(value) <= num;
	}
	var lessThanEqual = {
	    name: name$3,
	    main: main$3,
	    params: ['num']
	};

	const name$2 = 'moreThanEqual';
	function main$2(num, value) {
	    return len(value) >= num;
	}
	var moreThanEqual = {
	    name: name$2,
	    main: main$2,
	    params: ['num']
	};

	const name$1 = "unit";
	function main$1(value) {
	    return Number.isInteger(value) && value >= 0;
	}
	var unit = {
	    name: name$1,
	    main: main$1,
	};

	const name = 'main';
	function main(max, min, value) {
	    return lessThanEqual.main(max, value) && moreThanEqual.main(min, value);
	}
	var within = {
	    name,
	    main,
	    params: ['max', 'min']
	};

	// This export files also will get build individually for the client side
	const plugins = [
	    between,
	    email,
	    int,
	    lessThanEqual,
	    lessThan,
	    moreThanEqual,
	    moreThan,
	    unit,
	    within,
	];

	var generalException = {};

	// this is a new Error class that is not part of the Jsonql
	// but we will use it in other external modules
	Object.defineProperty(generalException, "__esModule", { value: true });
	class GeneralException extends Error {
	    constructor(...args) {
	        super(...args);
	        this.message = args[0];
	        this.detail = args[1];
	        this.className = GeneralException.name;
	        if (Error.captureStackTrace) {
	            Error.captureStackTrace(this, GeneralException);
	        }
	    }
	}
	var _default$1 = generalException.default = GeneralException;

	/**
	  construct the curry plugin method
	  @0.5.0 we make this generic
	*/
	function curryPlugin(input, pluginConfig) {
	    const { plugin } = input;
	    if (plugin) {
	        const params = pluginConfig[PARAMS_KEY]; // if we use pluginExport.params then TS complain!
	        if (params) {
	            // @BUG if the input missing the key then it wont throw for example
	            // we expect `arg` but pass the `min` then it will run but just failed
	            if (!checkArgKeys(input, params)) {
	                throw new _default$1(`Expected params: ${params.join(',')} not found!`);
	            }
	            const args = params.map((param) => input[param]);
	            return Reflect.apply(lodash.curry(pluginConfig.main), null, args);
	        }
	        else {
	            throw new _default$1(`This plugin ${pluginConfig.name} can not be curry`);
	        }
	    }
	    throw new _default$1(`Unable to find plugin in config`);
	}
	/** check if the expected key presented in the config */
	function checkArgKeys(config, params) {
	    return params.filter(key => config[key]).length === params.length;
	}

	var validationError = {};

	// custom validation error class
	// when validaton failed
	// should there also be a errors result somewhere
	Object.defineProperty(validationError, "__esModule", { value: true });
	class ValidationError extends Error {
	    constructor(...args) {
	        super(...args);
	        this.message = args[0];
	        this.detail = args[1];
	        this.className = ValidationError.name;
	        if (Error.captureStackTrace) {
	            Error.captureStackTrace(this, ValidationError);
	        }
	    }
	}
	var _default = validationError.default = ValidationError;

	var isFunction$1 = {};

	Object.defineProperty(isFunction$1, "__esModule", { value: true });
	isFunction$1.isAsyncFunction = isFunction_2 = isFunction$1.isFunction = void 0;
	const truetypeof_1 = truetypeof;
	const expected = ['asyncfunction', 'function'];
	/**
	 * Simple check if the prop is function
	 * We found situtation where it report as an object but debug output show as [Function]
	 */
	const isFunction = function (prop, debug = false) {
	    const result = (0, truetypeof_1.trueTypeOf)(prop);
	    if (expected.includes(result)) {
	        return true;
	    }
	    if (debug) {
	        console.error(`Expect to be Function type! Got ${typeof prop}`);
	    }
	    return false;
	};
	var isFunction_2 = isFunction$1.isFunction = isFunction;
	/** finally found a solution to check if something is an async function */
	function isAsyncFunction(prop) {
	    return (0, truetypeof_1.trueTypeOf)(prop) === expected[0];
	}
	isFunction$1.isAsyncFunction = isAsyncFunction;

	var regex = {};

	Object.defineProperty(regex, "__esModule", { value: true });
	var getRegex_1 = regex.getRegex = regex.isRegExp = void 0;
	const lodash_1 = lodash;
	/**
	 * Just check if a pattern is an RegExp object
	 */
	function isRegExp(pat) {
	    return pat instanceof RegExp;
	}
	regex.isRegExp = isRegExp;
	/**
	 * Find from the array by matching the pattern
	 */
	function getRegex(pattern) {
	    switch (true) {
	        case isRegExp(pattern):
	            return pattern;
	        case (0, lodash_1.isString)(pattern):
	            return new RegExp(pattern);
	        default:
	            return false;
	    }
	}
	getRegex_1 = regex.getRegex = getRegex;

	var global$1 = (typeof global !== "undefined" ? global :
	  typeof self !== "undefined" ? self :
	  typeof window !== "undefined" ? window : {});

	// shim for using process in browser
	// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	var cachedSetTimeout = defaultSetTimout;
	var cachedClearTimeout = defaultClearTimeout;
	if (typeof global$1.setTimeout === 'function') {
	    cachedSetTimeout = setTimeout;
	}
	if (typeof global$1.clearTimeout === 'function') {
	    cachedClearTimeout = clearTimeout;
	}

	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	function nextTick(fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	}
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	var title = 'browser';
	var platform = 'browser';
	var browser$1 = true;
	var env = {};
	var argv = [];
	var version = ''; // empty string to avoid regexp issues
	var versions = {};
	var release = {};
	var config = {};

	function noop() {}

	var on = noop;
	var addListener = noop;
	var once = noop;
	var off = noop;
	var removeListener = noop;
	var removeAllListeners = noop;
	var emit = noop;

	function binding(name) {
	    throw new Error('process.binding is not supported');
	}

	function cwd () { return '/' }
	function chdir (dir) {
	    throw new Error('process.chdir is not supported');
	}function umask() { return 0; }

	// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
	var performance = global$1.performance || {};
	var performanceNow =
	  performance.now        ||
	  performance.mozNow     ||
	  performance.msNow      ||
	  performance.oNow       ||
	  performance.webkitNow  ||
	  function(){ return (new Date()).getTime() };

	// generate timestamp or delta
	// see http://nodejs.org/api/process.html#process_process_hrtime
	function hrtime(previousTimestamp){
	  var clocktime = performanceNow.call(performance)*1e-3;
	  var seconds = Math.floor(clocktime);
	  var nanoseconds = Math.floor((clocktime%1)*1e9);
	  if (previousTimestamp) {
	    seconds = seconds - previousTimestamp[0];
	    nanoseconds = nanoseconds - previousTimestamp[1];
	    if (nanoseconds<0) {
	      seconds--;
	      nanoseconds += 1e9;
	    }
	  }
	  return [seconds,nanoseconds]
	}

	var startTime = new Date();
	function uptime() {
	  var currentTime = new Date();
	  var dif = currentTime - startTime;
	  return dif / 1000;
	}

	var browser$1$1 = {
	  nextTick: nextTick,
	  title: title,
	  browser: browser$1,
	  env: env,
	  argv: argv,
	  version: version,
	  versions: versions,
	  on: on,
	  addListener: addListener,
	  once: once,
	  off: off,
	  removeListener: removeListener,
	  removeAllListeners: removeAllListeners,
	  emit: emit,
	  binding: binding,
	  cwd: cwd,
	  chdir: chdir,
	  umask: umask,
	  hrtime: hrtime,
	  platform: platform,
	  release: release,
	  config: config,
	  uptime: uptime
	};

	var src = {exports: {}};

	var browser = {exports: {}};

	/**
	 * Helpers.
	 */

	var ms;
	var hasRequiredMs;

	function requireMs () {
		if (hasRequiredMs) return ms;
		hasRequiredMs = 1;
		var s = 1000;
		var m = s * 60;
		var h = m * 60;
		var d = h * 24;
		var w = d * 7;
		var y = d * 365.25;

		/**
		 * Parse or format the given `val`.
		 *
		 * Options:
		 *
		 *  - `long` verbose formatting [false]
		 *
		 * @param {String|Number} val
		 * @param {Object} [options]
		 * @throws {Error} throw an error if val is not a non-empty string or a number
		 * @return {String|Number}
		 * @api public
		 */

		ms = function(val, options) {
		  options = options || {};
		  var type = typeof val;
		  if (type === 'string' && val.length > 0) {
		    return parse(val);
		  } else if (type === 'number' && isFinite(val)) {
		    return options.long ? fmtLong(val) : fmtShort(val);
		  }
		  throw new Error(
		    'val is not a non-empty string or a valid number. val=' +
		      JSON.stringify(val)
		  );
		};

		/**
		 * Parse the given `str` and return milliseconds.
		 *
		 * @param {String} str
		 * @return {Number}
		 * @api private
		 */

		function parse(str) {
		  str = String(str);
		  if (str.length > 100) {
		    return;
		  }
		  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
		    str
		  );
		  if (!match) {
		    return;
		  }
		  var n = parseFloat(match[1]);
		  var type = (match[2] || 'ms').toLowerCase();
		  switch (type) {
		    case 'years':
		    case 'year':
		    case 'yrs':
		    case 'yr':
		    case 'y':
		      return n * y;
		    case 'weeks':
		    case 'week':
		    case 'w':
		      return n * w;
		    case 'days':
		    case 'day':
		    case 'd':
		      return n * d;
		    case 'hours':
		    case 'hour':
		    case 'hrs':
		    case 'hr':
		    case 'h':
		      return n * h;
		    case 'minutes':
		    case 'minute':
		    case 'mins':
		    case 'min':
		    case 'm':
		      return n * m;
		    case 'seconds':
		    case 'second':
		    case 'secs':
		    case 'sec':
		    case 's':
		      return n * s;
		    case 'milliseconds':
		    case 'millisecond':
		    case 'msecs':
		    case 'msec':
		    case 'ms':
		      return n;
		    default:
		      return undefined;
		  }
		}

		/**
		 * Short format for `ms`.
		 *
		 * @param {Number} ms
		 * @return {String}
		 * @api private
		 */

		function fmtShort(ms) {
		  var msAbs = Math.abs(ms);
		  if (msAbs >= d) {
		    return Math.round(ms / d) + 'd';
		  }
		  if (msAbs >= h) {
		    return Math.round(ms / h) + 'h';
		  }
		  if (msAbs >= m) {
		    return Math.round(ms / m) + 'm';
		  }
		  if (msAbs >= s) {
		    return Math.round(ms / s) + 's';
		  }
		  return ms + 'ms';
		}

		/**
		 * Long format for `ms`.
		 *
		 * @param {Number} ms
		 * @return {String}
		 * @api private
		 */

		function fmtLong(ms) {
		  var msAbs = Math.abs(ms);
		  if (msAbs >= d) {
		    return plural(ms, msAbs, d, 'day');
		  }
		  if (msAbs >= h) {
		    return plural(ms, msAbs, h, 'hour');
		  }
		  if (msAbs >= m) {
		    return plural(ms, msAbs, m, 'minute');
		  }
		  if (msAbs >= s) {
		    return plural(ms, msAbs, s, 'second');
		  }
		  return ms + ' ms';
		}

		/**
		 * Pluralization helper.
		 */

		function plural(ms, msAbs, n, name) {
		  var isPlural = msAbs >= n * 1.5;
		  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
		}
		return ms;
	}

	var common;
	var hasRequiredCommon;

	function requireCommon () {
		if (hasRequiredCommon) return common;
		hasRequiredCommon = 1;
		/**
		 * This is the common logic for both the Node.js and web browser
		 * implementations of `debug()`.
		 */

		function setup(env) {
			createDebug.debug = createDebug;
			createDebug.default = createDebug;
			createDebug.coerce = coerce;
			createDebug.disable = disable;
			createDebug.enable = enable;
			createDebug.enabled = enabled;
			createDebug.humanize = requireMs();
			createDebug.destroy = destroy;

			Object.keys(env).forEach(key => {
				createDebug[key] = env[key];
			});

			/**
			* The currently active debug mode names, and names to skip.
			*/

			createDebug.names = [];
			createDebug.skips = [];

			/**
			* Map of special "%n" handling functions, for the debug "format" argument.
			*
			* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
			*/
			createDebug.formatters = {};

			/**
			* Selects a color for a debug namespace
			* @param {String} namespace The namespace string for the debug instance to be colored
			* @return {Number|String} An ANSI color code for the given namespace
			* @api private
			*/
			function selectColor(namespace) {
				let hash = 0;

				for (let i = 0; i < namespace.length; i++) {
					hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
					hash |= 0; // Convert to 32bit integer
				}

				return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
			}
			createDebug.selectColor = selectColor;

			/**
			* Create a debugger with the given `namespace`.
			*
			* @param {String} namespace
			* @return {Function}
			* @api public
			*/
			function createDebug(namespace) {
				let prevTime;
				let enableOverride = null;
				let namespacesCache;
				let enabledCache;

				function debug(...args) {
					// Disabled?
					if (!debug.enabled) {
						return;
					}

					const self = debug;

					// Set `diff` timestamp
					const curr = Number(new Date());
					const ms = curr - (prevTime || curr);
					self.diff = ms;
					self.prev = prevTime;
					self.curr = curr;
					prevTime = curr;

					args[0] = createDebug.coerce(args[0]);

					if (typeof args[0] !== 'string') {
						// Anything else let's inspect with %O
						args.unshift('%O');
					}

					// Apply any `formatters` transformations
					let index = 0;
					args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
						// If we encounter an escaped % then don't increase the array index
						if (match === '%%') {
							return '%';
						}
						index++;
						const formatter = createDebug.formatters[format];
						if (typeof formatter === 'function') {
							const val = args[index];
							match = formatter.call(self, val);

							// Now we need to remove `args[index]` since it's inlined in the `format`
							args.splice(index, 1);
							index--;
						}
						return match;
					});

					// Apply env-specific formatting (colors, etc.)
					createDebug.formatArgs.call(self, args);

					const logFn = self.log || createDebug.log;
					logFn.apply(self, args);
				}

				debug.namespace = namespace;
				debug.useColors = createDebug.useColors();
				debug.color = createDebug.selectColor(namespace);
				debug.extend = extend;
				debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

				Object.defineProperty(debug, 'enabled', {
					enumerable: true,
					configurable: false,
					get: () => {
						if (enableOverride !== null) {
							return enableOverride;
						}
						if (namespacesCache !== createDebug.namespaces) {
							namespacesCache = createDebug.namespaces;
							enabledCache = createDebug.enabled(namespace);
						}

						return enabledCache;
					},
					set: v => {
						enableOverride = v;
					}
				});

				// Env-specific initialization logic for debug instances
				if (typeof createDebug.init === 'function') {
					createDebug.init(debug);
				}

				return debug;
			}

			function extend(namespace, delimiter) {
				const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
				newDebug.log = this.log;
				return newDebug;
			}

			/**
			* Enables a debug mode by namespaces. This can include modes
			* separated by a colon and wildcards.
			*
			* @param {String} namespaces
			* @api public
			*/
			function enable(namespaces) {
				createDebug.save(namespaces);
				createDebug.namespaces = namespaces;

				createDebug.names = [];
				createDebug.skips = [];

				let i;
				const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
				const len = split.length;

				for (i = 0; i < len; i++) {
					if (!split[i]) {
						// ignore empty strings
						continue;
					}

					namespaces = split[i].replace(/\*/g, '.*?');

					if (namespaces[0] === '-') {
						createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
					} else {
						createDebug.names.push(new RegExp('^' + namespaces + '$'));
					}
				}
			}

			/**
			* Disable debug output.
			*
			* @return {String} namespaces
			* @api public
			*/
			function disable() {
				const namespaces = [
					...createDebug.names.map(toNamespace),
					...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
				].join(',');
				createDebug.enable('');
				return namespaces;
			}

			/**
			* Returns true if the given mode name is enabled, false otherwise.
			*
			* @param {String} name
			* @return {Boolean}
			* @api public
			*/
			function enabled(name) {
				if (name[name.length - 1] === '*') {
					return true;
				}

				let i;
				let len;

				for (i = 0, len = createDebug.skips.length; i < len; i++) {
					if (createDebug.skips[i].test(name)) {
						return false;
					}
				}

				for (i = 0, len = createDebug.names.length; i < len; i++) {
					if (createDebug.names[i].test(name)) {
						return true;
					}
				}

				return false;
			}

			/**
			* Convert regexp to namespace
			*
			* @param {RegExp} regxep
			* @return {String} namespace
			* @api private
			*/
			function toNamespace(regexp) {
				return regexp.toString()
					.substring(2, regexp.toString().length - 2)
					.replace(/\.\*\?$/, '*');
			}

			/**
			* Coerce `val`.
			*
			* @param {Mixed} val
			* @return {Mixed}
			* @api private
			*/
			function coerce(val) {
				if (val instanceof Error) {
					return val.stack || val.message;
				}
				return val;
			}

			/**
			* XXX DO NOT USE. This is a temporary stub function.
			* XXX It WILL be removed in the next major release.
			*/
			function destroy() {
				console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
			}

			createDebug.enable(createDebug.load());

			return createDebug;
		}

		common = setup;
		return common;
	}

	var hasRequiredBrowser;

	function requireBrowser () {
		if (hasRequiredBrowser) return browser.exports;
		hasRequiredBrowser = 1;
		(function (module, exports) {
			/**
			 * This is the web browser implementation of `debug()`.
			 */

			exports.formatArgs = formatArgs;
			exports.save = save;
			exports.load = load;
			exports.useColors = useColors;
			exports.storage = localstorage();
			exports.destroy = (() => {
				let warned = false;

				return () => {
					if (!warned) {
						warned = true;
						console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
					}
				};
			})();

			/**
			 * Colors.
			 */

			exports.colors = [
				'#0000CC',
				'#0000FF',
				'#0033CC',
				'#0033FF',
				'#0066CC',
				'#0066FF',
				'#0099CC',
				'#0099FF',
				'#00CC00',
				'#00CC33',
				'#00CC66',
				'#00CC99',
				'#00CCCC',
				'#00CCFF',
				'#3300CC',
				'#3300FF',
				'#3333CC',
				'#3333FF',
				'#3366CC',
				'#3366FF',
				'#3399CC',
				'#3399FF',
				'#33CC00',
				'#33CC33',
				'#33CC66',
				'#33CC99',
				'#33CCCC',
				'#33CCFF',
				'#6600CC',
				'#6600FF',
				'#6633CC',
				'#6633FF',
				'#66CC00',
				'#66CC33',
				'#9900CC',
				'#9900FF',
				'#9933CC',
				'#9933FF',
				'#99CC00',
				'#99CC33',
				'#CC0000',
				'#CC0033',
				'#CC0066',
				'#CC0099',
				'#CC00CC',
				'#CC00FF',
				'#CC3300',
				'#CC3333',
				'#CC3366',
				'#CC3399',
				'#CC33CC',
				'#CC33FF',
				'#CC6600',
				'#CC6633',
				'#CC9900',
				'#CC9933',
				'#CCCC00',
				'#CCCC33',
				'#FF0000',
				'#FF0033',
				'#FF0066',
				'#FF0099',
				'#FF00CC',
				'#FF00FF',
				'#FF3300',
				'#FF3333',
				'#FF3366',
				'#FF3399',
				'#FF33CC',
				'#FF33FF',
				'#FF6600',
				'#FF6633',
				'#FF9900',
				'#FF9933',
				'#FFCC00',
				'#FFCC33'
			];

			/**
			 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
			 * and the Firebug extension (any Firefox version) are known
			 * to support "%c" CSS customizations.
			 *
			 * TODO: add a `localStorage` variable to explicitly enable/disable colors
			 */

			// eslint-disable-next-line complexity
			function useColors() {
				// NB: In an Electron preload script, document will be defined but not fully
				// initialized. Since we know we're in Chrome, we'll just detect this case
				// explicitly
				if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
					return true;
				}

				// Internet Explorer and Edge do not support colors.
				if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
					return false;
				}

				// Is webkit? http://stackoverflow.com/a/16459606/376773
				// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
				return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
					// Is firebug? http://stackoverflow.com/a/398120/376773
					(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
					// Is firefox >= v31?
					// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
					(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
					// Double check webkit in userAgent just in case we are in a worker
					(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
			}

			/**
			 * Colorize log arguments if enabled.
			 *
			 * @api public
			 */

			function formatArgs(args) {
				args[0] = (this.useColors ? '%c' : '') +
					this.namespace +
					(this.useColors ? ' %c' : ' ') +
					args[0] +
					(this.useColors ? '%c ' : ' ') +
					'+' + module.exports.humanize(this.diff);

				if (!this.useColors) {
					return;
				}

				const c = 'color: ' + this.color;
				args.splice(1, 0, c, 'color: inherit');

				// The final "%c" is somewhat tricky, because there could be other
				// arguments passed either before or after the %c, so we need to
				// figure out the correct index to insert the CSS into
				let index = 0;
				let lastC = 0;
				args[0].replace(/%[a-zA-Z%]/g, match => {
					if (match === '%%') {
						return;
					}
					index++;
					if (match === '%c') {
						// We only are interested in the *last* %c
						// (the user may have provided their own)
						lastC = index;
					}
				});

				args.splice(lastC, 0, c);
			}

			/**
			 * Invokes `console.debug()` when available.
			 * No-op when `console.debug` is not a "function".
			 * If `console.debug` is not available, falls back
			 * to `console.log`.
			 *
			 * @api public
			 */
			exports.log = console.debug || console.log || (() => {});

			/**
			 * Save `namespaces`.
			 *
			 * @param {String} namespaces
			 * @api private
			 */
			function save(namespaces) {
				try {
					if (namespaces) {
						exports.storage.setItem('debug', namespaces);
					} else {
						exports.storage.removeItem('debug');
					}
				} catch (error) {
					// Swallow
					// XXX (@Qix-) should we be logging these?
				}
			}

			/**
			 * Load `namespaces`.
			 *
			 * @return {String} returns the previously persisted debug modes
			 * @api private
			 */
			function load() {
				let r;
				try {
					r = exports.storage.getItem('debug');
				} catch (error) {
					// Swallow
					// XXX (@Qix-) should we be logging these?
				}

				// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
				if (!r && typeof browser$1$1 !== 'undefined' && 'env' in browser$1$1) {
					r = browser$1$1.env.DEBUG;
				}

				return r;
			}

			/**
			 * Localstorage attempts to return the localstorage.
			 *
			 * This is necessary because safari throws
			 * when a user disables cookies/localstorage
			 * and you attempt to access it.
			 *
			 * @return {LocalStorage}
			 * @api private
			 */

			function localstorage() {
				try {
					// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
					// The Browser also has localStorage in the global context.
					return localStorage;
				} catch (error) {
					// Swallow
					// XXX (@Qix-) should we be logging these?
				}
			}

			module.exports = requireCommon()(exports);

			const {formatters} = module.exports;

			/**
			 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
			 */

			formatters.j = function (v) {
				try {
					return JSON.stringify(v);
				} catch (error) {
					return '[UnexpectedJSONParseError]: ' + error.message;
				}
			};
	} (browser, browser.exports));
		return browser.exports;
	}

	var node = {exports: {}};

	var hasFlag;
	var hasRequiredHasFlag;

	function requireHasFlag () {
		if (hasRequiredHasFlag) return hasFlag;
		hasRequiredHasFlag = 1;

		hasFlag = (flag, argv = browser$1$1.argv) => {
			const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
			const position = argv.indexOf(prefix + flag);
			const terminatorPosition = argv.indexOf('--');
			return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
		};
		return hasFlag;
	}

	var supportsColor_1;
	var hasRequiredSupportsColor;

	function requireSupportsColor () {
		if (hasRequiredSupportsColor) return supportsColor_1;
		hasRequiredSupportsColor = 1;
		const os = require$$0__default["default"];
		const tty = require$$1__default["default"];
		const hasFlag = requireHasFlag();

		const {env} = browser$1$1;

		let forceColor;
		if (hasFlag('no-color') ||
			hasFlag('no-colors') ||
			hasFlag('color=false') ||
			hasFlag('color=never')) {
			forceColor = 0;
		} else if (hasFlag('color') ||
			hasFlag('colors') ||
			hasFlag('color=true') ||
			hasFlag('color=always')) {
			forceColor = 1;
		}

		if ('FORCE_COLOR' in env) {
			if (env.FORCE_COLOR === 'true') {
				forceColor = 1;
			} else if (env.FORCE_COLOR === 'false') {
				forceColor = 0;
			} else {
				forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
			}
		}

		function translateLevel(level) {
			if (level === 0) {
				return false;
			}

			return {
				level,
				hasBasic: true,
				has256: level >= 2,
				has16m: level >= 3
			};
		}

		function supportsColor(haveStream, streamIsTTY) {
			if (forceColor === 0) {
				return 0;
			}

			if (hasFlag('color=16m') ||
				hasFlag('color=full') ||
				hasFlag('color=truecolor')) {
				return 3;
			}

			if (hasFlag('color=256')) {
				return 2;
			}

			if (haveStream && !streamIsTTY && forceColor === undefined) {
				return 0;
			}

			const min = forceColor || 0;

			if (env.TERM === 'dumb') {
				return min;
			}

			if (browser$1$1.platform === 'win32') {
				// Windows 10 build 10586 is the first Windows release that supports 256 colors.
				// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
				const osRelease = os.release().split('.');
				if (
					Number(osRelease[0]) >= 10 &&
					Number(osRelease[2]) >= 10586
				) {
					return Number(osRelease[2]) >= 14931 ? 3 : 2;
				}

				return 1;
			}

			if ('CI' in env) {
				if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
					return 1;
				}

				return min;
			}

			if ('TEAMCITY_VERSION' in env) {
				return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
			}

			if (env.COLORTERM === 'truecolor') {
				return 3;
			}

			if ('TERM_PROGRAM' in env) {
				const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

				switch (env.TERM_PROGRAM) {
					case 'iTerm.app':
						return version >= 3 ? 3 : 2;
					case 'Apple_Terminal':
						return 2;
					// No default
				}
			}

			if (/-256(color)?$/i.test(env.TERM)) {
				return 2;
			}

			if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
				return 1;
			}

			if ('COLORTERM' in env) {
				return 1;
			}

			return min;
		}

		function getSupportLevel(stream) {
			const level = supportsColor(stream, stream && stream.isTTY);
			return translateLevel(level);
		}

		supportsColor_1 = {
			supportsColor: getSupportLevel,
			stdout: translateLevel(supportsColor(true, tty.isatty(1))),
			stderr: translateLevel(supportsColor(true, tty.isatty(2)))
		};
		return supportsColor_1;
	}

	var hasRequiredNode;

	function requireNode () {
		if (hasRequiredNode) return node.exports;
		hasRequiredNode = 1;
		(function (module, exports) {
			const tty = require$$1__default["default"];
			const util = require$$1__default$1["default"];

			/**
			 * This is the Node.js implementation of `debug()`.
			 */

			exports.init = init;
			exports.log = log;
			exports.formatArgs = formatArgs;
			exports.save = save;
			exports.load = load;
			exports.useColors = useColors;
			exports.destroy = util.deprecate(
				() => {},
				'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
			);

			/**
			 * Colors.
			 */

			exports.colors = [6, 2, 3, 4, 5, 1];

			try {
				// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
				// eslint-disable-next-line import/no-extraneous-dependencies
				const supportsColor = requireSupportsColor();

				if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
					exports.colors = [
						20,
						21,
						26,
						27,
						32,
						33,
						38,
						39,
						40,
						41,
						42,
						43,
						44,
						45,
						56,
						57,
						62,
						63,
						68,
						69,
						74,
						75,
						76,
						77,
						78,
						79,
						80,
						81,
						92,
						93,
						98,
						99,
						112,
						113,
						128,
						129,
						134,
						135,
						148,
						149,
						160,
						161,
						162,
						163,
						164,
						165,
						166,
						167,
						168,
						169,
						170,
						171,
						172,
						173,
						178,
						179,
						184,
						185,
						196,
						197,
						198,
						199,
						200,
						201,
						202,
						203,
						204,
						205,
						206,
						207,
						208,
						209,
						214,
						215,
						220,
						221
					];
				}
			} catch (error) {
				// Swallow - we only care if `supports-color` is available; it doesn't have to be.
			}

			/**
			 * Build up the default `inspectOpts` object from the environment variables.
			 *
			 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
			 */

			exports.inspectOpts = Object.keys(browser$1$1.env).filter(key => {
				return /^debug_/i.test(key);
			}).reduce((obj, key) => {
				// Camel-case
				const prop = key
					.substring(6)
					.toLowerCase()
					.replace(/_([a-z])/g, (_, k) => {
						return k.toUpperCase();
					});

				// Coerce string value into JS value
				let val = browser$1$1.env[key];
				if (/^(yes|on|true|enabled)$/i.test(val)) {
					val = true;
				} else if (/^(no|off|false|disabled)$/i.test(val)) {
					val = false;
				} else if (val === 'null') {
					val = null;
				} else {
					val = Number(val);
				}

				obj[prop] = val;
				return obj;
			}, {});

			/**
			 * Is stdout a TTY? Colored output is enabled when `true`.
			 */

			function useColors() {
				return 'colors' in exports.inspectOpts ?
					Boolean(exports.inspectOpts.colors) :
					tty.isatty(browser$1$1.stderr.fd);
			}

			/**
			 * Adds ANSI color escape codes if enabled.
			 *
			 * @api public
			 */

			function formatArgs(args) {
				const {namespace: name, useColors} = this;

				if (useColors) {
					const c = this.color;
					const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
					const prefix = `  ${colorCode};1m${name} \u001B[0m`;

					args[0] = prefix + args[0].split('\n').join('\n' + prefix);
					args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
				} else {
					args[0] = getDate() + name + ' ' + args[0];
				}
			}

			function getDate() {
				if (exports.inspectOpts.hideDate) {
					return '';
				}
				return new Date().toISOString() + ' ';
			}

			/**
			 * Invokes `util.format()` with the specified arguments and writes to stderr.
			 */

			function log(...args) {
				return browser$1$1.stderr.write(util.format(...args) + '\n');
			}

			/**
			 * Save `namespaces`.
			 *
			 * @param {String} namespaces
			 * @api private
			 */
			function save(namespaces) {
				if (namespaces) {
					browser$1$1.env.DEBUG = namespaces;
				} else {
					// If you set a process.env field to null or undefined, it gets cast to the
					// string 'null' or 'undefined'. Just delete instead.
					delete browser$1$1.env.DEBUG;
				}
			}

			/**
			 * Load `namespaces`.
			 *
			 * @return {String} returns the previously persisted debug modes
			 * @api private
			 */

			function load() {
				return browser$1$1.env.DEBUG;
			}

			/**
			 * Init logic for `debug` instances.
			 *
			 * Create a new `inspectOpts` object in case `useColors` is set
			 * differently for a particular `debug` instance.
			 */

			function init(debug) {
				debug.inspectOpts = {};

				const keys = Object.keys(exports.inspectOpts);
				for (let i = 0; i < keys.length; i++) {
					debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
				}
			}

			module.exports = requireCommon()(exports);

			const {formatters} = module.exports;

			/**
			 * Map %o to `util.inspect()`, all on a single line.
			 */

			formatters.o = function (v) {
				this.inspectOpts.colors = this.useColors;
				return util.inspect(v, this.inspectOpts)
					.split('\n')
					.map(str => str.trim())
					.join(' ');
			};

			/**
			 * Map %O to `util.inspect()`, allowing multiple lines if needed.
			 */

			formatters.O = function (v) {
				this.inspectOpts.colors = this.useColors;
				return util.inspect(v, this.inspectOpts);
			};
	} (node, node.exports));
		return node.exports;
	}

	(function (module) {
		if (typeof browser$1$1 === 'undefined' || browser$1$1.type === 'renderer' || browser$1$1.browser === true || browser$1$1.__nwjs) {
			module.exports = requireBrowser();
		} else {
			module.exports = requireNode();
		}
	} (src));

	var debugFn = /*@__PURE__*/getDefaultExportFromCjs(src.exports);

	const debug$1 = debugFn('jsonql:validator-core:common');
	/** check plugin argument against keywords list */
	function checkPluginArg(params) {
	    return !(params.filter(param => KEYWORDS.includes(param)).length > 0);
	}
	/** now simply it with just one prop check main */
	function pluginHasFunc(rule) {
	    return rule[PLUGIN_FN_KEY] && isFunction_2(rule[PLUGIN_FN_KEY]);
	}
	/** Just take the keys without the value */
	function getArgsKey(rule) {
	    const params = extractFnArgs(rule.main.toString());
	    params.pop();
	    return params;
	}
	/** instead of just checking the user params, we go one step further to extract it for them */
	function searchParamsKey(rule) {
	    const params = getArgsKey(rule);
	    const l = params.length;
	    if (l === 0) {
	        return rule; // nothing to do
	    }
	    // now we check if the params has reserved word
	    if (!checkPluginArg(params)) {
	        throw new _default$1(RESERVED_WORD_ERR);
	    }
	    rule[PARAMS_KEY] = params;
	    return rule;
	}
	/** check if the params they provide is matching their main method */
	function paramMatches(rule) {
	    const params = getArgsKey(rule);
	    const l = params.length;
	    if (l === 0 && !rule[PARAMS_KEY]) {
	        return true; // nothing to check
	    }
	    const _params = rule.params !== undefined && Array.isArray(rule.params)
	        ? rule.params : false;
	    if (_params === false) {
	        return false;
	    }
	    if (l > 0 && l === _params.length) {
	        if (!params.filter((param, i) => param !== _params[i]).length) {
	            return true;
	        }
	    }
	    return false;
	}
	/** take a function string and return its argument names */
	function extractFnArgs(fnStr) {
	    return fnStr.split('(')[1]
	        .split(')')[0]
	        .split(',')
	        .map(t => t.trim())
	        .filter(t => t !== '');
	}
	/**
	this will get re-use in the class to create method for the queue execution
	 */
	function constructRuleCb(argName, ruleFn, ruleName) {
	    return (value, lastResult, pos) => __awaiter(this, void 0, void 0, function* () {
	        // @NOTE keep getting problem with ruleFn is not a async funtion pass here
	        // so we need to first execute it then check if is thenable
	        return Reflect.apply(ruleFn, null, [value])
	            .then(successThen(argName, value, lastResult, pos))
	            .catch((error) => {
	            debug$1('failed', argName, value, error, pos);
	            // the name should be the validator name - not the property name
	            // because the pos already indicator the property
	            return Promise.reject(new _default(ruleName, pos));
	        });
	    });
	}
	/** This is taken out from the above then call for re-use when we want to fall through a rule */
	function successThen(argName, value, lastResult, pos // for internal debug use only
	) {
	    return (result) => {
	        const idx = pos[0];
	        debug$1('passed', argName, value, result, pos);
	        debug$1('lastResult', lastResult);
	        const newResult = { [IDX_KEY]: idx, [VALUE_KEY]: value };
	        if (lastResult === undefined) { // init
	            return { [argName]: newResult };
	        }
	        // here is the problem with spread result - they have the same name
	        if (argName in lastResult) { // we need to check if the key exist this is import NOT VALUE check
	            const lr = lastResult[argName];
	            if (isResultPackage(lr)) {
	                if (!lr.includes(newResult)) {
	                    lastResult[argName].push(newResult);
	                }
	            }
	            else if (lr[IDX_KEY] !== idx) {
	                lastResult[argName] = toArray_1(lastResult[argName]).concat([newResult]);
	            }
	            // if it's the same then do nothing
	            return lastResult;
	        }
	        // return the argument name with the value
	        return object.assign(lastResult, { [argName]: newResult });
	    };
	}
	/** check to see if the lastResult contain our lastResult package format or just their value */
	function isResultPackage(lastResult, key = IDX_KEY) {
	    try {
	        if (Array.isArray(lastResult)) {
	            return !!lastResult.filter((res) => key in res).length;
	        }
	    }
	    catch (e) {
	        debug$1('isResultPackage', e);
	    }
	    return false;
	}
	/** If the plugin provide a pattern and we construct a function out of it */
	function patternPluginFanctory(pattern) {
	    const regex = getRegex_1(pattern);
	    return (value) => __awaiter(this, void 0, void 0, function* () { return regex.test(value) ? Promise.resolve(true) : Promise.reject(false); });
	}

	const debug = debugFn('jsonql:validator-core:validator-plugin');
	// main
	class ValidatorPlugins {
	    /** with a idx to id this instance */
	    constructor($version) {
	        this.$version = $version;
	        this._plugins = new Map();
	        this._internalPluginNames = [];
	        // register internal plugins
	        plugins.forEach((plugin) => {
	            // we don't do the convert here anymore, and wait until the look up
	            // then we store it back JIT
	            const name = plugin[NAME_KEY];
	            this._internalPluginNames.push(name);
	            this._registerPlugin(name, plugin, true);
	        });
	    }
	    /**
	    find the plugin internal or external
	    argName is the argument name
	    */
	    lookupPlugin(input, argName) {
	        const pluginName = input[PLUGIN_KEY];
	        if (pluginName && this._plugins.has(pluginName)) {
	            const pluginConfig = this._plugins.get(pluginName);
	            // unconverted
	            if (pluginConfig[PLUGIN_FN_KEY] && !pluginConfig[PARAMS_KEY]) {
	                // let it fall to the next
	                pluginConfig[VALIDATE_ASYNC_KEY] = promisify(pluginConfig[PLUGIN_FN_KEY]);
	            }
	            // already converted
	            if (pluginConfig && pluginConfig[VALIDATE_ASYNC_KEY] && !pluginConfig[PARAMS_KEY]) {
	                return constructRuleCb(argName, pluginConfig[VALIDATE_ASYNC_KEY], pluginName);
	            }
	            // needs to curry
	            if (pluginConfig && pluginConfig[PARAMS_KEY]) {
	                debug('pluginConfig --->', pluginConfig);
	                debug('input----------->', input);
	                const _input = input;
	                return constructRuleCb(argName, promisify(curryPlugin(_input, pluginConfig)), pluginName);
	            }
	        }
	        debug('lookupPlugin', 'unable to find', pluginName);
	        throw new _default$1(`Unable to find plugin: ${pluginName}`);
	    }
	    /** The public api to register a plugin */
	    registerPlugin(name, pluginConfig) {
	        this._registerPlugin(name, pluginConfig);
	    }
	    /** call this when loading external plugin, not allow to use directly */
	    _registerExternalPlugin(name, pluginConfig) {
	        this._registerPlugin(name, pluginConfig, false, true);
	    }
	    /** this is no longer in use and we change the usage to export list of names that can be add to contract */
	    export(external = true) {
	        const plugins = [];
	        this._plugins.forEach((p, n) => {
	            if (!this.isBuiltIn(n) && p.external === external) {
	                plugins.push(p);
	            }
	        });
	        return plugins;
	    }
	    /** just check if this plugin is built-in */
	    isBuiltIn(pluginName) {
	        return this._internalPluginNames.includes(pluginName);
	    }
	    // ------------------------- PRIVATE --------------------------//
	    /** register plugins */
	    _registerPlugin(name, pluginConfig, skipCheck = false, // when register internal plugin then skip it
	    external = false // new in 0.9.11
	    ) {
	        if (!skipCheck) {
	            if (this._plugins.has(name)) {
	                throw new _default$1(`plugin ${name} already existed!`);
	            }
	            if (!pluginHasFunc(pluginConfig)) {
	                debug('registerPlugin', MAIN_NOT_FOUND_ERR);
	                throw new _default$1(MAIN_NOT_FOUND_ERR);
	            }
	            // Here we could extract the params instead of just checking
	            if (pluginConfig[PARAMS_KEY] === undefined) {
	                pluginConfig = searchParamsKey(pluginConfig);
	                debug('auto generate params for plugin', pluginConfig);
	            }
	            else if (pluginConfig[PARAMS_KEY] !== undefined) { // if they provide the keys then we check
	                if (!checkPluginArg(pluginConfig[PARAMS_KEY])) {
	                    debug('registerPlugin', RESERVED_WORD_ERR);
	                    throw new _default$1(RESERVED_WORD_ERR);
	                }
	                if (!paramMatches(pluginConfig)) {
	                    debug('registerPlugin', ARG_NOT_MATCH_ERR);
	                    throw new _default$1(ARG_NOT_MATCH_ERR);
	                }
	            }
	        }
	        pluginConfig.name = name;
	        pluginConfig.external = external;
	        /**
	        At this point it should only contain a main (or plus params) so we
	        do nothing and just store it, we convert it only when they call it
	        */
	        this._plugins.set(name, pluginConfig);
	    }
	}

	exports.ARRAY_TS_TYPE_LFT = ARRAY_TS_TYPE_LFT;
	exports.ARRAY_TYPE = ARRAY_TYPE;
	exports.ARRAY_TYPE_LFT = ARRAY_TYPE_LFT;
	exports.ARRAY_TYPE_RGT = ARRAY_TYPE_RGT;
	exports.BOOLEAN_TYPE = BOOLEAN_TYPE;
	exports.IDX_KEY = IDX_KEY;
	exports.KEYWORDS = KEYWORDS;
	exports.NAME_KEY = NAME_KEY;
	exports.NUMBER_TYPE = NUMBER_TYPE;
	exports.OBJECT_TYPE = OBJECT_TYPE;
	exports.OR_SEPERATOR = OR_SEPERATOR;
	exports.PARAMS_KEY = PARAMS_KEY;
	exports.PATTERN_KEY = PATTERN_KEY;
	exports.PLUGIN_FN_KEY = PLUGIN_FN_KEY;
	exports.PLUGIN_KEY = PLUGIN_KEY;
	exports.RULES_KEY = RULES_KEY;
	exports.STRING_TYPE = STRING_TYPE;
	exports.VALIDATE_ASYNC_KEY = VALIDATE_ASYNC_KEY;
	exports.VALIDATE_KEY = VALIDATE_KEY;
	exports.VALUE_KEY = VALUE_KEY;
	exports.ValidatorPlugins = ValidatorPlugins;
	exports.arrayTypeHandler = arrayTypeHandler;
	exports.checkAny = checkAny;
	exports.checkArray = checkArray;
	exports.checkBoolean = checkBoolean;
	exports.checkFloat = checkFloat;
	exports.checkInteger = checkInteger;
	exports.checkNumber = checkNumber;
	exports.checkObject = checkObject;
	exports.checkPluginArg = checkPluginArg;
	exports.checkString = checkString;
	exports.checkUnion = checkUnion;
	exports.checkUnionSync = checkUnionSync;
	exports.checkUnsigned = checkUnsigned;
	exports.combineCheck = combineCheck;
	exports.constructRuleCb = constructRuleCb;
	exports.curryPlugin = curryPlugin;
	exports.generateReversePromisesFn = generateReversePromisesFn;
	exports.isArrayLike = isArrayLike;
	exports.isEmptyObject = isEmptyObject;
	exports.isResultPackage = isResultPackage;
	exports.objectTypeHandler = objectTypeHandler;
	exports.patternPluginFanctory = patternPluginFanctory;
	exports.pluginHasFunc = pluginHasFunc;
	exports.plugins = plugins;
	exports.promisify = promisify;
	exports.reversePromisifyResult = reversePromisifyResult;
	exports.successThen = successThen;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
