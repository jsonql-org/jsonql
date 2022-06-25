(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tty'), require('util'), require('os')) :
    typeof define === 'function' && define.amd ? define(['exports', 'tty', 'util', 'os'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.JsonqlValidator = {}, global.require$$1, global.require$$1$1, global.require$$0$1));
})(this, (function (exports, require$$1, require$$1$1, require$$0$1) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
    var require$$1__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$1$1);
    var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);

    /*! *****************************************************************************
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

    function __awaiter$1(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function getAugmentedNamespace(n) {
      var f = n.default;
    	if (typeof f == "function") {
    		var a = function () {
    			return f.apply(this, arguments);
    		};
    		a.prototype = f.prototype;
      } else a = {};
      Object.defineProperty(a, '__esModule', {value: true});
    	Object.keys(n).forEach(function (k) {
    		var d = Object.getOwnPropertyDescriptor(n, k);
    		Object.defineProperty(a, k, d.get ? d : {
    			enumerable: true,
    			get: function () {
    				return n[k];
    			}
    		});
    	});
    	return a;
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
    var _default$1 = validationError.default = ValidationError;

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
    var _default = generalException.default = GeneralException;

    var empty = {};

    var object = {};

    var common$3 = {};

    var truetypeof = {};

    Object.defineProperty(truetypeof, "__esModule", { value: true });
    truetypeof.trueTypeOf = void 0;
    /*
     * More accurately check the type of a JavaScript object
     * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
     */
    function trueTypeOf(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    }
    truetypeof.trueTypeOf = trueTypeOf;

    Object.defineProperty(common$3, "__esModule", { value: true });
    common$3.formatStr = common$3.showDeep = common$3.nil = common$3.createEvtName = common$3.parseJson = toArray_1 = common$3.toArray = common$3.inArray = void 0;
    const truetypeof_1$1 = truetypeof;
    /**
     * DIY in Array
     */
    const inArray = (arr, value) => arr.includes(value);
    common$3.inArray = inArray;
    // quick and dirty to turn non array to array
    const toArray = (arg) => Array.isArray(arg) ? arg : [arg];
    var toArray_1 = common$3.toArray = toArray;
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
    common$3.parseJson = parseJson;
    /**
     * create an event name
     */
    const createEvtName = (...args) => args.join('_');
    common$3.createEvtName = createEvtName;
    /**
     * generic placeholder function
     */
    const nil = () => false;
    common$3.nil = nil;
    /** handy method to show deep json structure */
    const showDeep = (code) => {
        console.dir(code, { depth: null });
    };
    common$3.showDeep = showDeep;
    /** from https://www.tutorialstonight.com/javascript-string-format.php
      change to a standard function instead of prototype pollution
    */
    function formatStr(str, ...args) {
        return str.replace(/{([0-9]+)}/g, (match, index) => (typeof args[index] === 'undefined' ? match : args[index]));
    }
    common$3.formatStr = formatStr;

    (function (exports) {
    	Object.defineProperty(exports, "__esModule", { value: true });
    	exports.readOnly = exports.objectHasKey = exports.arrToObj = exports.assign = exports.getConfigValue = exports.isClass = exports.isPlainObject = exports.isObject = void 0;
    	const common_1 = common$3;
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
    	exports.isEmpty = exports.notEmpty = exports.isNotEmpty = exports.isEmptyObj = void 0;
    	const object_1 = object;
    	const isEmptyObj = (obj) => (obj && (0, object_1.isPlainObject)(obj) && Object.keys(obj).length === 0);
    	exports.isEmptyObj = isEmptyObj;
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
    	    if ((0, object_1.isPlainObject)(a)) {
    	        return valueCheck ? !(0, exports.isEmptyObj)(a) : false;
    	    }
    	    return (0, exports.isNotEmpty)(a);
    	}
    	exports.notEmpty = notEmpty;
    	/** just not to make my head hurt */
    	const isEmpty = (value, valueCheck) => !notEmpty(value, valueCheck);
    	exports.isEmpty = isEmpty;
    } (empty));

    var isFunction$1 = {};

    Object.defineProperty(isFunction$1, "__esModule", { value: true });
    var isAsyncFunction_1 = isFunction$1.isAsyncFunction = isFunction_2 = isFunction$1.isFunction = void 0;
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
    isAsyncFunction_1 = isFunction$1.isAsyncFunction = isAsyncFunction;

    var chainPromises$1 = {};

    var lodash = {};

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

    Object.defineProperty(chainPromises$1, "__esModule", { value: true });
    var queuePromisesProcess_1 = chainPromises$1.queuePromisesProcess = chainPromises$1.chainProcessPromises = chainPromises$1.chainPromises = void 0;
    // break it out on its own because
    // it's building from the lodash-es from scratch
    // according to this discussion https://github.com/lodash/lodash/issues/3298
    const lodash_1 = lodash;
    const object_1 = object;
    /**
     * previously we already make sure the order of the namespaces
     * and attach the auth client to it
     */
    function chainPromises(promises, asObject = false) {
        return promises.reduce((promiseChain, currentTask) => (promiseChain.then(chainResults => (currentTask.then(currentResult => (asObject === false ?
            [...chainResults, currentResult] :
            (0, lodash_1.merge)(chainResults, currentResult)))))), Promise.resolve(asObject === false ? [] : ((0, object_1.isPlainObject)(asObject) ? asObject : {})));
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
        const q = (0, lodash_1.flatMap)(queue);
        const ex = Reflect.apply(chainProcessPromises, null, q);
        return Reflect.apply(ex, null, initValue);
    }
    queuePromisesProcess_1 = chainPromises$1.queuePromisesProcess = queuePromisesProcess;

    var Vr=Object.create;var We=Object.defineProperty;var Dr=Object.getOwnPropertyDescriptor;var Gr=Object.getOwnPropertyNames;var $r=Object.getPrototypeOf,Br=Object.prototype.hasOwnProperty;var h=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports);var Hr=(e,r,n,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of Gr(r))!Br.call(e,o)&&o!==n&&We(e,o,{get:()=>r[o],enumerable:!(t=Dr(r,o))||t.enumerable});return e};var f=(e,r,n)=>(n=e!=null?Vr($r(e)):{},Hr(r||!e||!e.__esModule?We(n,"default",{value:e,enumerable:!0}):n,e));var E=(e,r,n)=>new Promise((t,o)=>{var i=P=>{try{b(n.next(P));}catch(V){o(V);}},u=P=>{try{b(n.throw(P));}catch(V){o(V);}},b=P=>P.done?t(P.value):Promise.resolve(P.value).then(i,u);b((n=n.apply(e,r)).next());});var F=h(Z=>{Object.defineProperty(Z,"__esModule",{value:!0});Z.trueTypeOf=void 0;function zr(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}Z.trueTypeOf=zr;});var he=h(p=>{Object.defineProperty(p,"__esModule",{value:!0});p.formatStr=p.showDeep=p.nil=p.createEvtName=p.parseJson=p.toArray=p.inArray=void 0;var Wr=F(),Zr=(e,r)=>e.includes(r);p.inArray=Zr;var Xr=e=>Array.isArray(e)?e:[e];p.toArray=Xr;var Qr=(e,r=!0)=>{try{return (0,Wr.trueTypeOf)(e)==="string"?JSON.parse(e):JSON.parse(JSON.stringify(e))}catch(n){if(r)return e;throw n}};p.parseJson=Qr;var en=(...e)=>e.join("_");p.createEvtName=en;var rn=()=>!1;p.nil=rn;var nn=e=>{console.dir(e,{depth:null});};p.showDeep=nn;function tn(e,...r){return e.replace(/{([0-9]+)}/g,(n,t)=>typeof r[t]>"u"?n:r[t])}p.formatStr=tn;});var Y=h(l=>{Object.defineProperty(l,"__esModule",{value:!0});l.readOnly=l.objectHasKey=l.arrToObj=l.assign=l.getConfigValue=l.isClass=l.isPlainObject=l.isObject=void 0;var on=he(),sn=F();function be(e){return (0, sn.trueTypeOf)(e)==="object"}l.isObject=be;function Ae(e){if(be(e)){let n=e.constructor.prototype,t="[Object: null prototype]";return n.toString().substring(0,t.length)===t?!0:be(n)===!1?!1:Reflect.apply(n.hasOwnProperty,n,["isPrototypeOf"])}return !1}l.isPlainObject=Ae;var cn=e=>!Ae(e);l.isClass=cn;var un=(e,r)=>r&&Ae(r)&&e in r?r[e]:void 0;l.getConfigValue=un;var an=(...e)=>Reflect.apply(Object.assign,Object,e);l.assign=an;var ln=(e,r,n={})=>e.map(r).reduce((t,o)=>(0, l.assign)(t,o),n);l.arrToObj=ln;var fn=(e,r)=>{try{let n=Object.keys(e);return (0,on.inArray)(n,r)}catch(n){return !1}};l.objectHasKey=fn;var pn=e=>Object.freeze(e);l.readOnly=pn;});var D=h(g=>{Object.defineProperty(g,"__esModule",{value:!0});g.isString=g.flatMap=g.merge=g.curry=void 0;var mn=F(),Ce=Y(),gn=(e,...r)=>e.length<=r.length?e(...r):(...n)=>(0, g.curry)(e,...r,...n);g.curry=gn;var yn=(e,...r)=>{if(!r.length)return e;let n=r.shift();if((0, Ce.isObject)(e)&&(0, Ce.isObject)(n))for(let t in n)(0, Ce.isObject)(n[t])?(e[t]||Object.assign(e,{[t]:{}}),(0, g.merge)(e[t],n[t])):Object.assign(e,{[t]:n[t]});return (0, g.merge)(e,...r)};g.merge=yn;function dn(e,r){return r||(r=n=>n),e.flatMap(r)}g.flatMap=dn;function hn(e){return (0, mn.trueTypeOf)(e)==="string"}g.isString=hn;});var cr=h(_=>{Object.defineProperty(_,"__esModule",{value:!0});_.queuePromisesProcess=_.chainProcessPromises=_.chainPromises=void 0;var sr=D(),En=Y();function _n(e,r=!1){return e.reduce((n,t)=>n.then(o=>t.then(i=>r===!1?[...o,i]:(0, sr.merge)(o,i))),Promise.resolve(r===!1?[]:(0, En.isPlainObject)(r)?r:{}))}_.chainPromises=_n;function ir(e,...r){return (...n)=>r.reduce((t,o)=>t.then(i=>o(i)),Reflect.apply(e,null,n))}_.chainProcessPromises=ir;function xn(e,...r){let n=(0, sr.flatMap)(e),t=Reflect.apply(ir,null,n);return Reflect.apply(t,null,r)}_.queuePromisesProcess=xn;});var ae=h(Ue=>{Object.defineProperty(Ue,"__esModule",{value:!0});var J=class extends Error{constructor(...r){super(...r),this.message=r[0],this.detail=r[1],this.className=J.name,Error.captureStackTrace&&Error.captureStackTrace(this,J);}};Ue.default=J;});var hr=h(De=>{Object.defineProperty(De,"__esModule",{value:!0});var N=class extends Error{constructor(...r){super(...r),this.message=r[0],this.detail=r[1],this.className=N.name,Error.captureStackTrace&&Error.captureStackTrace(this,N);}};De.default=N;});var Cr=h(v=>{Object.defineProperty(v,"__esModule",{value:!0});v.isAsyncFunction=v.isFunction=void 0;var br=F(),Ar=["asyncfunction","function"],zn=function(e,r=!1){let n=(0, br.trueTypeOf)(e);return Ar.includes(n)?!0:(r&&console.error(`Expect to be Function type! Got ${typeof e}`),!1)};v.isFunction=zn;function Wn(e){return (0, br.trueTypeOf)(e)===Ar[0]}v.isAsyncFunction=Wn;});var Er=h(K=>{Object.defineProperty(K,"__esModule",{value:!0});K.getRegex=K.isRegExp=void 0;var Zn=D();function Pr(e){return e instanceof RegExp}K.isRegExp=Pr;function Xn(e){switch(!0){case Pr(e):return e;case(0, Zn.isString)(e):return new RegExp(e);default:return !1}}K.getRegex=Xn;});var xr=h((ko,_r)=>{var I=1e3,M=I*60,L=M*60,O=L*24,Qn=O*7,et=O*365.25;_r.exports=function(e,r){r=r||{};var n=typeof e;if(n==="string"&&e.length>0)return rt(e);if(n==="number"&&isFinite(e))return r.long?tt(e):nt(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function rt(e){if(e=String(e),!(e.length>100)){var r=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(!!r){var n=parseFloat(r[1]),t=(r[2]||"ms").toLowerCase();switch(t){case"years":case"year":case"yrs":case"yr":case"y":return n*et;case"weeks":case"week":case"w":return n*Qn;case"days":case"day":case"d":return n*O;case"hours":case"hour":case"hrs":case"hr":case"h":return n*L;case"minutes":case"minute":case"mins":case"min":case"m":return n*M;case"seconds":case"second":case"secs":case"sec":case"s":return n*I;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function nt(e){var r=Math.abs(e);return r>=O?Math.round(e/O)+"d":r>=L?Math.round(e/L)+"h":r>=M?Math.round(e/M)+"m":r>=I?Math.round(e/I)+"s":e+"ms"}function tt(e){var r=Math.abs(e);return r>=O?fe(e,r,O,"day"):r>=L?fe(e,r,L,"hour"):r>=M?fe(e,r,M,"minute"):r>=I?fe(e,r,I,"second"):e+" ms"}function fe(e,r,n,t){var o=r>=n*1.5;return Math.round(e/n)+" "+t+(o?"s":"")}});var Fr=h((Yo,Tr)=>{function ot(e){n.debug=n,n.default=n,n.coerce=P,n.disable=i,n.enable=o,n.enabled=u,n.humanize=xr(),n.destroy=V,Object.keys(e).forEach(s=>{n[s]=e[s];}),n.names=[],n.skips=[],n.formatters={};function r(s){let c=0;for(let a=0;a<s.length;a++)c=(c<<5)-c+s.charCodeAt(a),c|=0;return n.colors[Math.abs(c)%n.colors.length]}n.selectColor=r;function n(s){let c,a=null,H,He;function A(...d){if(!A.enabled)return;let T=A,z=Number(new Date),Mr=z-(c||z);T.diff=Mr,T.prev=c,T.curr=z,c=z,d[0]=n.coerce(d[0]),typeof d[0]!="string"&&d.unshift("%O");let W=0;d[0]=d[0].replace(/%([a-zA-Z%])/g,(de,Lr)=>{if(de==="%%")return "%";W++;let ze=n.formatters[Lr];if(typeof ze=="function"){let Ur=d[W];de=ze.call(T,Ur),d.splice(W,1),W--;}return de}),n.formatArgs.call(T,d),(T.log||n.log).apply(T,d);}return A.namespace=s,A.useColors=n.useColors(),A.color=n.selectColor(s),A.extend=t,A.destroy=n.destroy,Object.defineProperty(A,"enabled",{enumerable:!0,configurable:!1,get:()=>a!==null?a:(H!==n.namespaces&&(H=n.namespaces,He=n.enabled(s)),He),set:d=>{a=d;}}),typeof n.init=="function"&&n.init(A),A}function t(s,c){let a=n(this.namespace+(typeof c>"u"?":":c)+s);return a.log=this.log,a}function o(s){n.save(s),n.namespaces=s,n.names=[],n.skips=[];let c,a=(typeof s=="string"?s:"").split(/[\s,]+/),H=a.length;for(c=0;c<H;c++)!a[c]||(s=a[c].replace(/\*/g,".*?"),s[0]==="-"?n.skips.push(new RegExp("^"+s.slice(1)+"$")):n.names.push(new RegExp("^"+s+"$")));}function i(){let s=[...n.names.map(b),...n.skips.map(b).map(c=>"-"+c)].join(",");return n.enable(""),s}function u(s){if(s[s.length-1]==="*")return !0;let c,a;for(c=0,a=n.skips.length;c<a;c++)if(n.skips[c].test(s))return !1;for(c=0,a=n.names.length;c<a;c++)if(n.names[c].test(s))return !0;return !1}function b(s){return s.toString().substring(2,s.toString().length-2).replace(/\.\*\?$/,"*")}function P(s){return s instanceof Error?s.stack||s.message:s}function V(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");}return n.enable(n.load()),n}Tr.exports=ot;});var Ge=h((y,pe)=>{y.formatArgs=it;y.save=ct;y.load=ut;y.useColors=st;y.storage=at();y.destroy=(()=>{let e=!1;return ()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));}})();y.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function st(){return typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs)?!0:typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)?!1:typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function it(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+pe.exports.humanize(this.diff),!this.useColors)return;let r="color: "+this.color;e.splice(1,0,r,"color: inherit");let n=0,t=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(t=n));}),e.splice(t,0,r);}y.log=console.debug||console.log||(()=>{});function ct(e){try{e?y.storage.setItem("debug",e):y.storage.removeItem("debug");}catch{}}function ut(){let e;try{e=y.storage.getItem("debug");}catch{}return !e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function at(){try{return localStorage}catch{}}pe.exports=Fr()(y);var{formatters:lt}=pe.exports;lt.j=function(e){try{return JSON.stringify(e)}catch(r){return "[UnexpectedJSONParseError]: "+r.message}};});var Ze=f(D());function Pe(e){return (e+"").trim()!==""?(0, Ze.isString)(e):!1}var Xe=f(F());function Ee(e){return (0, Xe.trueTypeOf)(e)==="boolean"}var X=f(F()),_e="number";function xe(e){return (0, X.trueTypeOf)(e)!==_e?!1:!isNaN(parseFloat(e+""))}function Re(e,r=!0){return e!==void 0&&e!==""&&(e+"").trim()!==""&&(r===!1||r===!0&&e!==null)}var or=f(Y());var ee="|",we="boolean",Oe="string",ke="number",j="array",q="object",Ye="Array<",je="array.<",re=">",Qe="validate",S="validateAsync",ne="plugin",R="main",rr="rules",qe="name",G="$$idx",Se="$$value";function C(e){switch(e){case ke:return xe;case Oe:return Pe;case we:return Ee;default:return Re}}var nr={ts:Ye,jsdoc:je};function w(e,r){if(Array.isArray(e)){if(!r)return !0;let n;return Array.isArray(r)?n=e.filter(t=>{let o=r.length;for(let i=0;i<o;++i){let u=r[i];if(u===j&&Array.isArray(t)||u===q&&(0, or.isPlainObject)(t)||C(u)(t))return !1}return !0}):n=e.filter(t=>!C(r)(t)),!(n.length>0)}return !1}function tr(e,r="ts"){let n=nr[r];if(!n)throw new Error(`Syntax not supported! ${Object.keys(nr)}`);if(e.indexOf(n)>-1&&e.indexOf(re)>-1){let t=e.replace(n,"").replace(re,"");return t.indexOf(ee)?t.split(ee):[t]}return !1}function Ke(e){return tr(e)?!1:tr(e,"jsdoc")}function Ie(e,r){let{arg:n}=e;return r.length>1?!n.filter(t=>!(r.length>r.filter(o=>!C(o)(t)).length)).length:r.length>r.filter(t=>!w(n,t)).length}var Me=f(Y());function B(e,r){if((0, Me.isPlainObject)(e)){if(!r)return !0;if(typeof r=="string")return r in e;if(w(r))return typeof r[0]=="string"?bn(e,r):An(e,r)}return !1}function bn(e,r){return !r.filter(n=>!(n in e)).length}function An(e,r){return !r.filter(n=>{let t=e[n.name];return !(n.type.length>n.type.filter(o=>{let i;return t!==void 0?(i=Ke(o))!==!1?!Ie({arg:t},i):!C(o)(t):!0}).length)}).length}var ur=f(cr());function Le(e,r){return e||r}function ar(e,r,n){return r.map((t,o)=>{let i=[e];switch(n&&n[o]&&i.push(n[o]),t){case j:return ()=>Le(Reflect.apply(w,null,i),t);case q:return ()=>Le(Reflect.apply(B,null,i),t);default:return ()=>Le(C(t)(e),t)}}).map(t=>()=>E(this,null,function*(){let o=t();return o===!0?Promise.reject(!0):Promise.resolve(o)}))}function Tn(e,r,n){return E(this,null,function*(){let t=ar(e,r,n);return new Promise((o,i)=>{(0, ur.queuePromisesProcess)(t,r[0]).then(u=>{i(u);}).catch(u=>{o(u);});})})}function te(e){return (...r)=>E(this,null,function*(){let n=yield Reflect.apply(e,null,r);return n?Promise.resolve(n):Promise.reject(n)})}f(D());f(ae());var Rr=f(hr());f(ae());var Or=f(he()),kr=f(Y());f(Cr());f(Er());var qr=f(Ge()),me=(0, qr.default)("jsonql:validator-core:common");function ye(e,r,n){return (t,o,i)=>E(this,null,function*(){return Reflect.apply(r,null,[t]).then(vr(e,t,o,i)).catch(u=>(me("failed",e,t,u,i),Promise.reject(new Rr.default(n,i))))})}function vr(e,r,n,t){return o=>{let i=t[0];me("passed",e,r,o,t),me("lastResult",n);let u={[G]:i,[Se]:r};if(n===void 0)return {[e]:u};if(e in n){let b=n[e];return Kr(b)?b.includes(u)||n[e].push(u):b[G]!==i&&(n[e]=(0, Or.toArray)(n[e]).concat([u])),n}return (0, kr.assign)(n,{[e]:u})}}function Kr(e,r=G){try{if(Array.isArray(e))return !!e.filter(n=>r in n).length}catch(n){me("isResultPackage",n);}return !1}f(ae());var Ir=f(Ge());(0, Ir.default)("jsonql:validator-core:validator-plugin");

    const ARGS_NOT_ARRAY_ERR = `Input argument is not an array!`;
    const EXCEPTION_CASE_ERR = `Exception happened don't know how to handle it`;
    // use this to id if the input is spread
    const SPREAD_PREFIX = '$_spread_arg_';
    const IS_SPREAD_VALUES_KEY = '$$is_spread_values';
    const SPREAD_ARG_TYPE = 'RestElement';
    const TS_UNION_TYPE = 'TsUnionType';
    const TS_ARRAY_TYPE = 'TsArrayType';
    const DEFAULT_VALUE = 'defaultvalue';
    // when they type inline along the params
    const TS_TYPE_LIT = 'TsTypeLiteral';
    // when pass a type reference we just treat them as object
    const TS_TYPE_REF = 'TsTypeReference';
    // this is for us to id what that is
    const TS_TYPE_NAME = 'tstype';
    // return result as - default array 
    const RETURN_AS_OBJ = 'object';
    const RETURN_AS_ARR = 'array';
    const RETURN_AS_RAW = 'raw';

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
    var browser$2 = true;
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
      browser: browser$2,
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

    var src$1 = {exports: {}};

    var browser$1 = {exports: {}};

    /**
     * Helpers.
     */

    var ms$1;
    var hasRequiredMs$1;

    function requireMs$1 () {
    	if (hasRequiredMs$1) return ms$1;
    	hasRequiredMs$1 = 1;
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

    	ms$1 = function(val, options) {
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
    	return ms$1;
    }

    var common$2;
    var hasRequiredCommon$2;

    function requireCommon$2 () {
    	if (hasRequiredCommon$2) return common$2;
    	hasRequiredCommon$2 = 1;
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
    		createDebug.humanize = requireMs$1();
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

    	common$2 = setup;
    	return common$2;
    }

    var hasRequiredBrowser$1;

    function requireBrowser$1 () {
    	if (hasRequiredBrowser$1) return browser$1.exports;
    	hasRequiredBrowser$1 = 1;
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

    		module.exports = requireCommon$2()(exports);

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
    } (browser$1, browser$1.exports));
    	return browser$1.exports;
    }

    var node$1 = {exports: {}};

    var hasFlag$1;
    var hasRequiredHasFlag$1;

    function requireHasFlag$1 () {
    	if (hasRequiredHasFlag$1) return hasFlag$1;
    	hasRequiredHasFlag$1 = 1;

    	hasFlag$1 = (flag, argv = browser$1$1.argv) => {
    		const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
    		const position = argv.indexOf(prefix + flag);
    		const terminatorPosition = argv.indexOf('--');
    		return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    	};
    	return hasFlag$1;
    }

    var supportsColor_1$1;
    var hasRequiredSupportsColor$1;

    function requireSupportsColor$1 () {
    	if (hasRequiredSupportsColor$1) return supportsColor_1$1;
    	hasRequiredSupportsColor$1 = 1;
    	const os = require$$0__default["default"];
    	const tty = require$$1__default["default"];
    	const hasFlag = requireHasFlag$1();

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

    	supportsColor_1$1 = {
    		supportsColor: getSupportLevel,
    		stdout: translateLevel(supportsColor(true, tty.isatty(1))),
    		stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    	};
    	return supportsColor_1$1;
    }

    var hasRequiredNode$1;

    function requireNode$1 () {
    	if (hasRequiredNode$1) return node$1.exports;
    	hasRequiredNode$1 = 1;
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
    			const supportsColor = requireSupportsColor$1();

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

    		module.exports = requireCommon$2()(exports);

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
    } (node$1, node$1.exports));
    	return node$1.exports;
    }

    (function (module) {
    	if (typeof browser$1$1 === 'undefined' || browser$1$1.type === 'renderer' || browser$1$1.browser === true || browser$1$1.__nwjs) {
    		module.exports = requireBrowser$1();
    	} else {
    		module.exports = requireNode$1();
    	}
    } (src$1));

    var debugFn = /*@__PURE__*/getDefaultExportFromCjs(src$1.exports);

    const debug$3 = debugFn('jsonql:validator:class:fn');
    /**
    The input is what the dev wrote in the validate
    The input has two styles
    1. object - the key is the parameter name
    2. Array of Array, the index correspond to the argument position (later)
    all of these has moved to the ValidatorFactoryBase
    because the plugins are apply there
    */
    /**
      generate an automatic valdiation rule using the AST map
      this part will always happen first then add the user
      generate valdiation rules
    */
    function createAutomaticRules(astMap) {
        return astMap.map((ast) => {
            const { name } = ast;
            const ruleFn = getValidateRules(ast);
            const ruleName = ast[TS_TYPE_NAME] || ast.type;
            debug$3('createAutomaticRules', name, ruleName);
            ast[rr] = [ye(name, ruleFn, ruleName)];
            return ast;
        });
    }
    /** wrapper method to wrap two steps together to make the class call easier to understand */
    function processValidateResultsAsArr(argNames, validateResult) {
        return __awaiter$1(this, void 0, void 0, function* () {
            return processValidateResults(argNames, validateResult)
                .then(unwrapPreparedValidateResult);
        });
    }
    /** step to process the return result as object */
    function processValidateResultsAsObj(argNames, validateResult) {
        return processValidateResultsAsArrOfObj(argNames, validateResult)
            .reduce((a, b) => object.assign(a, b), {});
    }
    /** need to do this in two steps, first package it again and unwrap it, then next step flatten it */
    function processValidateResults(argNames, validateResult) {
        return __awaiter$1(this, void 0, void 0, function* () {
            return argNames.map((argName) => {
                if (Se in validateResult[argName]) {
                    return validateResult[argName][Se];
                }
                else if (Kr(validateResult[argName])) {
                    // @BUG this is still wrong its an array wrap in an array
                    // we need to wrap this one more time for the next step
                    return {
                        [IS_SPREAD_VALUES_KEY]: validateResult[argName].map((res) => res[Se])
                    };
                }
                debug$3(`Return result when we couldn't find way to destruct: ${argName}`, validateResult[argName]);
                return validateResult[argName];
            });
        });
    }
    /** step to process the return result as object */
    function processValidateResultsAsArrOfObj(argNames, validateResult) {
        return argNames.map((argName) => {
            switch (true) {
                case Se in validateResult[argName]:
                    return { [argName]: validateResult[argName][Se] };
                case Kr(validateResult[argName]):
                    return { [argName]: validateResult[argName].map((res) => res[Se]) };
                default:
                    return { [argName]: validateResult[argName] };
            }
        });
    }
    /** final step to unwarp the pack result for spread arguments */
    // @NOTE there is a potential bug here when the spread type is Array<Array<any>>
    // then when we use in the velocejs we flatMap and all the Array inside get flattern
    // then again using spread with this wild open types is really BAD API design
    function unwrapPreparedValidateResult(result // can not use unknown here
    ) {
        return __awaiter$1(this, void 0, void 0, function* () {
            debug$3('unwrapPreparedValidateResult', result);
            const ctn = result.length;
            if (ctn === 1 && object.objectHasKey(result[0], IS_SPREAD_VALUES_KEY)) {
                return result[0][IS_SPREAD_VALUES_KEY];
            }
            else if (Kr(result, IS_SPREAD_VALUES_KEY)) {
                let tmp = [];
                for (let i = 0; i < ctn; ++i) {
                    if (IS_SPREAD_VALUES_KEY in result[i]) {
                        tmp = tmp.concat(result[i][IS_SPREAD_VALUES_KEY]);
                    }
                    else {
                        tmp.push(result[i]);
                    }
                }
                return tmp;
            }
            return result; // nothing to do should be all correct
        });
    }
    /** only deal with constructing the basic rules validation function */
    function getValidateRules(ast) {
        debug$3('getValidateRules ast', ast);
        switch (ast[TS_TYPE_NAME]) {
            case TS_UNION_TYPE:
                return function unionFn(value) {
                    return __awaiter$1(this, void 0, void 0, function* () {
                        return Tn(value, ast.type);
                    });
                };
            case TS_ARRAY_TYPE :
                // need to apply for the type as well
                // @TODO need to examine the input to see what more sutation could come up
                return function arrayFn(value) {
                    return __awaiter$1(this, void 0, void 0, function* () {
                        return te(w)(value, ast.types);
                    });
                };
            case TS_TYPE_REF :
                // @TODO should this get a special treatment
                return function anyFn(value) {
                    return __awaiter$1(this, void 0, void 0, function* () {
                        return te(Re)(value);
                    });
                };
            case SPREAD_ARG_TYPE: // we need to create rule for this one, its been wrong rule
                return function combineFn(value) {
                    return __awaiter$1(this, void 0, void 0, function* () {
                        return te(C(ast.types))(value);
                    });
                };
            default: // no tstype then should be primitive
                if (Pe(ast.type)) {
                    debug$3('validation type', ast.type);
                    return function combineFn(value) {
                        return __awaiter$1(this, void 0, void 0, function* () {
                            return te(C(ast.type))(value);
                        });
                    };
                }
                // if both are not presented that means this could be a JS code
                // this happen when we use Decorator and toString() to extract the ast
                debug$3(`getValidateRules`, ast);
                return function emptyFn(value) {
                    return __awaiter$1(this, void 0, void 0, function* () {
                        return te(empty.notEmpty)(value, true);
                    });
                };
        }
    }
    /** extract the default value if there is none */
    function getOptionalValue(arg, param) {
        // should be the value undefined then search for defaultvalue
        if (param.tstype !== SPREAD_ARG_TYPE && arg === undefined) { // spread argument can not have default value
            return param[DEFAULT_VALUE] !== undefined
                ? param[DEFAULT_VALUE]
                : undefined;
        }
        return arg;
    }
    /** check if the rule contain duplicate rules that can not be resolve */
    function checkDuplicateRules(rule) {
        return [
            Qe, S, R // @TODO should pattern be standalone?
        ].filter((key) => rule[key] !== undefined);
    }
    /** take the key part from a one level object */
    function getKey(obj) {
        const keys = Object.keys(obj);
        return keys.length ? keys[0] : undefined;
    }

    const debug$2 = debugFn('jsonql:validator:validator-base');
    /**
    The sequence how this should run
    1. init - take the AST map and generate automatic validation rules
    2. register internal plugins
    3. (if any) user can register their own plugins
    4. accept the user define rules, at this point we create the full validation map
    5. Call the validate method with the data input then the validation will run
    */
    class ValidatorBase {
        // main
        constructor(astMap, _validatorPluginsInstance) {
            this._validatorPluginsInstance = _validatorPluginsInstance;
            this._astWithBaseRules = createAutomaticRules(astMap);
            // create the argument name list in order
            this._arguments = this._astWithBaseRules.map(rule => rule[qe]);
        }
        /** the main method then in it's sub class will get override */
        validate(values) {
            const queues = this._normalizeArgValues(values);
            return queuePromisesProcess_1(queues, undefined // the init value will now be undefined to know if its first
            );
        }
        /**
          on the client side even if its not require validation but we still need to prepare
          the argument for transport so we need the _normalizeArgValues without _prepareForExecution
        */
        prepareArgValues(values) {
            return this._normalizeArgValues(values, false);
        }
        /** just return the internal schema for validation for use, see export */
        get schema() {
            return this._schema || this._astWithBaseRules;
        }
        /** overload the addValidationRules method that allow to pass a function or async function */
        addValidationRules(input) {
            debug$2('addValidationRules', input);
            const clearInput = {};
            for (const propName in input) {
                // we convert this to array here now
                clearInput[propName] = toArray_1(input[propName])
                    .map((inp) => {
                    if (isFunction_2(inp)) {
                        return this._updateInput(inp);
                    }
                    return inp;
                });
            }
            // overload the parent method
            this._createSchema(clearInput);
        }
        /** just put the function into the right key */
        _updateInput(input) {
            // we just make it an async funtion
            // @NOTE now we can check if it's async function or not
            return {
                [S]: isAsyncFunction_1(input) ? input : te(input)
            };
        }
        // ----------------- validate ------------------ //
        /**
          when validate happens we check the input value
          correspond to out map, and apply the values
          argument values turn into an executable queue
        */
        _normalizeArgValues(values, execute = true) {
            debug$2('_normalizeArgValues', values);
            // there might not be a dev provided schema
            const params = this.schema;
            const pCtn = params.length;
            if (pCtn === 0) {
                return []; // nothing to do
            }
            if (!w(values)) {
                debug$2(values);
                throw new _default$1(ARGS_NOT_ARRAY_ERR, values);
            }
            const vCtn = values.length;
            switch (true) {
                case vCtn === pCtn:
                    if (execute === false) {
                        return object.arrToObj(values, (value, i) => ({ [params[i].name]: value }));
                    }
                    return values.map((value, i) => (this._prepareForExecution(value, params[i], i)));
                case vCtn < pCtn:
                    debug$2(`Values pass less than params`);
                    if (execute === false) {
                        return object.arrToObj(params, (param, i) => {
                            const _value = getOptionalValue(values[i], param);
                            return { [param.name]: _value };
                        });
                    }
                    return params.map((param, i) => {
                        const _value = getOptionalValue(values[i], param);
                        return this._prepareForExecution(_value, param, i);
                    });
                case vCtn > pCtn: // this is the spread style argument
                    debug$2('spread params', vCtn, pCtn);
                    return this._processSpreadLikeArg(values, params, execute);
                default: // will not fall through here @TODO
                    throw new _default$1(EXCEPTION_CASE_ERR, [vCtn, pCtn]);
            }
        }
        /** The spread or mix with spread argument is too complicated to process in couple lines */
        _processSpreadLikeArg(values, params, execute) {
            // if it's spread only then there should be just one param
            const spreadParam = params.filter(p => p.tstype === SPREAD_ARG_TYPE)[0];
            // if this is just grabbing the values then it should be name: Array<values>
            if (execute === false) {
                // @TODO there is couple more scenario that might break this fix as we go along
                return values.map((value, i) => {
                    if (!params[i]) {
                        return { [spreadParam.name]: [value] };
                    }
                    return params[i].name !== spreadParam.name
                        ? { [params[i].name]: value }
                        : { [spreadParam.name]: [value] };
                }).reduce((a, b) => {
                    const k = getKey(a);
                    if (!k) { // init
                        return b;
                    }
                    const k2 = getKey(b);
                    if (!a[k2]) {
                        return object.assign({}, a, b);
                    }
                    a[k2] = a[k2].concat(b[k2]);
                    return a;
                }, {});
            }
            // now search for the mixedRule - there should only be one, if not this idiot doesn't know what is doing
            // the problem is the type is any after the first param
            return values.map((value, i) => {
                // @NOTE the assign need to create new object otherwise we will polluate the params
                const param = params[i] || object.assign({}, spreadParam, { name: `${SPREAD_PREFIX}${i}` });
                // this getOptionalValue is pointless
                // const _value = getOptionalValue(value, param)
                debug$2('spread param', value, param.name);
                return this._prepareForExecution(value, param, i);
            });
        }
        /**
          at this point we actually put the rules in the queue
          but we dont' run it yet until all rules are in the main queue
          this way, if one fail then the whole queue exited without running further
        */
        _prepareForExecution(value, param, idx) {
            const { rules, required, name } = param;
            if (rules && rules.length) {
                // we only need to return the queue
                return rules.map((rule, i) => {
                    // if this is not required field and no value the we create a fake callback
                    if (value === undefined && !required) {
                        debug$2(`skip the validation`, required);
                        return (lastResult) => __awaiter$1(this, void 0, void 0, function* () {
                            return (vr(name, value, lastResult, [idx, i])(true));
                        });
                    }
                    // when it fail then we return the index number
                    return (lastResult) => __awaiter$1(this, void 0, void 0, function* () {
                        return Reflect.apply(rule, null, [value, lastResult, [idx, i]])
                            .then((result) => {
                            debug$2('Post rule result', result);
                            return result;
                        });
                    });
                });
            }
            // stuff it with a placeholder fuction?
            debug$2('No rules to run');
            return () => __awaiter$1(this, void 0, void 0, function* () { return true; });
        }
        // ---------------------- schema -------------------------- //
        /** put the rule in here and make it into an async method */
        _createSchema(input) {
            let astWithRules = this._astWithBaseRules;
            // all we need to do is check if its empty input
            if (empty.notEmpty(input, true)) {
                astWithRules = this._applyObjectInput(astWithRules, input);
            }
            debug$2(`_createSchema`, astWithRules);
            this._schema = astWithRules;
        }
        /** nomalize the object style rules input */
        _applyObjectInput(astMap, input) {
            return astMap.map((ast) => {
                var _a;
                const propName = ast.name;
                if (input[propName]) {
                    // there might not be a name in there and it's important
                    const _input = input[propName].map((input) => {
                        input.name = propName;
                        return input;
                    });
                    const rules = this._transformInput(_input, propName);
                    // debug('ast[RULES_KEY]', ast[RULES_KEY])
                    if (rules && rules.length) {
                        ast[rr] = (_a = ast[rr]) === null || _a === void 0 ? void 0 : _a.concat(rules);
                    }
                }
                return ast;
            });
        }
        /** this will transform the rules to executable */
        _transformInput(input, propName) {
            debug$2('_transformInput', input);
            return input.map((_input, i) => {
                const ruleKeys = checkDuplicateRules(_input);
                if (ruleKeys.length > 1) {
                    throw new Error(`You can only set one rule at a time! We found ${ruleKeys.join(',')}`);
                }
                // the name is not that important but still need one, if there is none we generate it
                const pluginName = _input.name || `customPluginName${i}`;
                switch (true) {
                    case _input[ne] !== undefined:
                        debug$2(`Should got here ----->`, _input[ne]);
                        return this._lookupPlugin(_input, propName);
                    case _input[Qe] !== undefined:
                        debug$2(`${Qe} ----->`, _input);
                        return ye(propName, te(_input[Qe]), pluginName);
                    case _input[S] !== undefined:
                        debug$2(`${S} ---->`, _input);
                        return ye(propName, _input[S], pluginName);
                    default:
                        throw new _default(`unable to find rule for ${propName},
            we expect ${ne}, ${Qe} or ${S}`);
                }
            });
        }
        /** wrapper methods for ValidatorPlugins */
        _lookupPlugin(input, propName) {
            // @TODO we should allow validator to use standalone without the plugin system
            // so when this plugin instance object is undefined we should skip it
            try {
                if (this._validatorPluginsInstance) {
                    debug$2('_lookupPlugin --->', input, propName);
                    return this._validatorPluginsInstance.lookupPlugin(input, propName);
                }
            }
            catch (e) {
                // @NOTE because the lookupPlugin method actually throw errors but we don't want
                // to crash it
                debug$2('catch _lookupPlugin error', e);
            }
            return ye(propName, () => __awaiter$1(this, void 0, void 0, function* () { return Promise.reject(false); }), 'NO_PLUGIN_DUMMY_FUNCTION');
        }
    }

    var validatorPlugins = {};

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
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var __createBinding = Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function() { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    function __exportStar(m, o) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    }
    var __setModuleDefault = Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }

    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    function __classPrivateFieldIn(state, receiver) {
        if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
    }

    var tslib_es6 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        __extends: __extends,
        get __assign () { return __assign; },
        __rest: __rest,
        __decorate: __decorate,
        __param: __param,
        __metadata: __metadata,
        __awaiter: __awaiter,
        __generator: __generator,
        __createBinding: __createBinding,
        __exportStar: __exportStar,
        __values: __values,
        __read: __read,
        __spread: __spread,
        __spreadArrays: __spreadArrays,
        __spreadArray: __spreadArray,
        __await: __await,
        __asyncGenerator: __asyncGenerator,
        __asyncDelegator: __asyncDelegator,
        __asyncValues: __asyncValues,
        __makeTemplateObject: __makeTemplateObject,
        __importStar: __importStar,
        __importDefault: __importDefault,
        __classPrivateFieldGet: __classPrivateFieldGet,
        __classPrivateFieldSet: __classPrivateFieldSet,
        __classPrivateFieldIn: __classPrivateFieldIn
    });

    var require$$0 = /*@__PURE__*/getAugmentedNamespace(tslib_es6);

    var constants = {};

    var hasRequiredConstants;

    function requireConstants () {
    	if (hasRequiredConstants) return constants;
    	hasRequiredConstants = 1;
    	(function (exports) {
    		// ported from @jsonql/constants
    		Object.defineProperty(exports, "__esModule", { value: true });
    		exports.KEYWORDS = exports.MAIN_NOT_FOUND_ERR = exports.ARG_NOT_MATCH_ERR = exports.RESERVED_WORD_ERR = exports.VALUE_KEY = exports.IDX_KEY = exports.PARAMS_KEY = exports.NAME_KEY = exports.RULES_KEY = exports.PATTERN_KEY = exports.PLUGIN_FN_KEY = exports.PLUGIN_KEY = exports.VALIDATE_ASYNC_KEY = exports.VALIDATE_KEY = exports.ARRAY_TYPE_RGT = exports.ARRAY_TYPE_LFT = exports.ARRAY_TS_TYPE_LFT = exports.OBJECT_TYPE = exports.ARRAY_TYPE = exports.NUMBER_TYPE = exports.STRING_TYPE = exports.BOOLEAN_TYPE = exports.OR_SEPERATOR = void 0;
    		exports.OR_SEPERATOR = '|';
    		exports.BOOLEAN_TYPE = 'boolean';
    		exports.STRING_TYPE = 'string';
    		exports.NUMBER_TYPE = 'number';
    		exports.ARRAY_TYPE = 'array';
    		exports.OBJECT_TYPE = 'object';
    		// Legacy
    		exports.ARRAY_TS_TYPE_LFT = 'Array<';
    		exports.ARRAY_TYPE_LFT = 'array.<';
    		exports.ARRAY_TYPE_RGT = '>';
    		// local
    		exports.VALIDATE_KEY = 'validate';
    		exports.VALIDATE_ASYNC_KEY = 'validateAsync';
    		exports.PLUGIN_KEY = 'plugin';
    		exports.PLUGIN_FN_KEY = 'main';
    		exports.PATTERN_KEY = 'pattern';
    		exports.RULES_KEY = 'rules';
    		exports.NAME_KEY = 'name';
    		exports.PARAMS_KEY = 'params';
    		exports.IDX_KEY = '$$idx';
    		exports.VALUE_KEY = '$$value';
    		exports.RESERVED_WORD_ERR = 'Your plugin config argument contains reserved keywords';
    		exports.ARG_NOT_MATCH_ERR = "Your params doesn't matching your main argument list";
    		exports.MAIN_NOT_FOUND_ERR = "Can not find 'main' method in your plugin config";
    		exports.KEYWORDS = [
    		    exports.PARAMS_KEY,
    		    exports.PATTERN_KEY,
    		    exports.VALIDATE_KEY,
    		    exports.VALIDATE_ASYNC_KEY,
    		    exports.PLUGIN_KEY,
    		    exports.RULES_KEY,
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
    } (constants));
    	return constants;
    }

    function commonjsRequire(path) {
    	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
    }

    var plugins$1 = {};

    var plugins = {};

    var between = {};

    var moreThan = {};

    var len = {};

    var hasRequiredLen;

    function requireLen () {
    	if (hasRequiredLen) return len;
    	hasRequiredLen = 1;
    	Object.defineProperty(len, "__esModule", { value: true });
    	len.len = void 0;
    	// import { isString } from '@jsonql/utils/dist/lodash'
    	// @NOTE can not use the isString method because stupid Typescript complaint it's not string
    	// even you cast it again
    	function len$1(value) {
    	    return typeof value === 'string'
    	        ? value.length
    	        : value;
    	}
    	len.len = len$1;
    	return len;
    }

    var hasRequiredMoreThan;

    function requireMoreThan () {
    	if (hasRequiredMoreThan) return moreThan;
    	hasRequiredMoreThan = 1;
    	Object.defineProperty(moreThan, "__esModule", { value: true });
    	const len_1 = requireLen();
    	const name = 'moreThan';
    	function main(num, value) {
    	    return (0, len_1.len)(value) > num;
    	}
    	moreThan.default = {
    	    name,
    	    main,
    	    params: ['num']
    	};
    	return moreThan;
    }

    var lessThan = {};

    var hasRequiredLessThan;

    function requireLessThan () {
    	if (hasRequiredLessThan) return lessThan;
    	hasRequiredLessThan = 1;
    	Object.defineProperty(lessThan, "__esModule", { value: true });
    	const len_1 = requireLen();
    	const name = "lessThan";
    	function main(num, value) {
    	    return (0, len_1.len)(value) < num;
    	}
    	lessThan.default = {
    	    name,
    	    main,
    	    params: ['num']
    	};
    	return lessThan;
    }

    var hasRequiredBetween;

    function requireBetween () {
    	if (hasRequiredBetween) return between;
    	hasRequiredBetween = 1;
    	Object.defineProperty(between, "__esModule", { value: true });
    	const tslib_1 = require$$0;
    	// between
    	const more_than_1 = tslib_1.__importDefault(requireMoreThan());
    	const less_than_1 = tslib_1.__importDefault(requireLessThan());
    	const name = 'between';
    	function main(max, min, value) {
    	    return less_than_1.default.main(max, value) && more_than_1.default.main(min, value);
    	}
    	// so when we register it, we know what param we should expect
    	between.default = {
    	    main,
    	    name,
    	    params: ['max', 'min']
    	};
    	return between;
    }

    var email = {};

    var hasRequiredEmail;

    function requireEmail () {
    	if (hasRequiredEmail) return email;
    	hasRequiredEmail = 1;
    	// email validator
    	// this is an example how to create a plugin
    	// one default export method accept one parameter value return boolean
    	// then export a named export call name: string and that's it
    	// or just return a string regex pattern: string
    	Object.defineProperty(email, "__esModule", { value: true });
    	const name = 'email';
    	function main(value) {
    	    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	    return pattern.test(value);
    	}
    	email.default = {
    	    main,
    	    name,
    	};
    	return email;
    }

    var float = {};

    var number = {};

    var hasRequiredNumber;

    function requireNumber () {
    	if (hasRequiredNumber) return number;
    	hasRequiredNumber = 1;
    	Object.defineProperty(number, "__esModule", { value: true });
    	number.checkUnsigned = number.checkFloat = number.checkInteger = number.checkNumber = void 0;
    	// validator numbers
    	// import { NUMBER_TYPES } from './constants';
    	const truetypeof_1 = truetypeof;
    	const expected = 'number';
    	/**
    	 * Historical library
    	 * @2015-05-04 found a problem if the value is a number like string
    	 * it will pass, so add a check if it's string before we pass to next
    	 * @2022 completely rewritten from ground up
    	 */
    	function checkNumber(value) {
    	    return (0, truetypeof_1.trueTypeOf)(value) !== expected ? false : !isNaN(parseFloat(value + ''));
    	}
    	number.checkNumber = checkNumber;
    	// Add more number type / value checking
    	function checkInteger(value) {
    	    return (0, truetypeof_1.trueTypeOf)(value) === expected && Number.isInteger(value);
    	}
    	number.checkInteger = checkInteger;
    	function checkFloat(value) {
    	    return (0, truetypeof_1.trueTypeOf)(value) === expected
    	        && !isNaN(value)
    	        && !Number.isInteger(value);
    	}
    	number.checkFloat = checkFloat;
    	function checkUnsigned(value) {
    	    return checkInteger(value) && value >= 0;
    	}
    	number.checkUnsigned = checkUnsigned;
    	return number;
    }

    var hasRequiredFloat;

    function requireFloat () {
    	if (hasRequiredFloat) return float;
    	hasRequiredFloat = 1;
    	(function (exports) {
    		Object.defineProperty(exports, "__esModule", { value: true });
    		exports.name = void 0;
    		// test for float
    		const number_1 = requireNumber();
    		exports.name = 'float';
    		function main(value) {
    		    return (0, number_1.checkFloat)(value);
    		}
    		exports.default = {
    		    name: exports.name,
    		    main,
    		};
    } (float));
    	return float;
    }

    var int = {};

    var hasRequiredInt;

    function requireInt () {
    	if (hasRequiredInt) return int;
    	hasRequiredInt = 1;
    	(function (exports) {
    		Object.defineProperty(exports, "__esModule", { value: true });
    		exports.name = void 0;
    		// test for integer
    		const number_1 = requireNumber();
    		exports.name = 'int';
    		function main(value) {
    		    return (0, number_1.checkInteger)(value);
    		}
    		exports.default = {
    		    name: exports.name,
    		    main,
    		};
    } (int));
    	return int;
    }

    var lessThanEqual = {};

    var hasRequiredLessThanEqual;

    function requireLessThanEqual () {
    	if (hasRequiredLessThanEqual) return lessThanEqual;
    	hasRequiredLessThanEqual = 1;
    	Object.defineProperty(lessThanEqual, "__esModule", { value: true });
    	const len_1 = requireLen();
    	const name = 'lessThanEqual';
    	function main(num, value) {
    	    return (0, len_1.len)(value) <= num;
    	}
    	lessThanEqual.default = {
    	    name,
    	    main,
    	    params: ['num']
    	};
    	return lessThanEqual;
    }

    var moreThanEqual = {};

    var hasRequiredMoreThanEqual;

    function requireMoreThanEqual () {
    	if (hasRequiredMoreThanEqual) return moreThanEqual;
    	hasRequiredMoreThanEqual = 1;
    	Object.defineProperty(moreThanEqual, "__esModule", { value: true });
    	const len_1 = requireLen();
    	const name = 'moreThanEqual';
    	function main(num, value) {
    	    return (0, len_1.len)(value) >= num;
    	}
    	moreThanEqual.default = {
    	    name,
    	    main,
    	    params: ['num']
    	};
    	return moreThanEqual;
    }

    var uint = {};

    var hasRequiredUint;

    function requireUint () {
    	if (hasRequiredUint) return uint;
    	hasRequiredUint = 1;
    	Object.defineProperty(uint, "__esModule", { value: true });
    	const number_1 = requireNumber();
    	const name = "unit";
    	function main(value) {
    	    return (0, number_1.checkUnsigned)(value);
    	}
    	uint.default = {
    	    name,
    	    main,
    	};
    	return uint;
    }

    var within = {};

    var hasRequiredWithin;

    function requireWithin () {
    	if (hasRequiredWithin) return within;
    	hasRequiredWithin = 1;
    	Object.defineProperty(within, "__esModule", { value: true });
    	const tslib_1 = require$$0;
    	const more_than_equal_1 = tslib_1.__importDefault(requireMoreThanEqual());
    	const less_than_equal_1 = tslib_1.__importDefault(requireLessThanEqual());
    	const name = 'main';
    	function main(max, min, value) {
    	    return less_than_equal_1.default.main(max, value) && more_than_equal_1.default.main(min, value);
    	}
    	within.default = {
    	    name,
    	    main,
    	    params: ['max', 'min']
    	};
    	return within;
    }

    var hasRequiredPlugins$1;

    function requirePlugins$1 () {
    	if (hasRequiredPlugins$1) return plugins;
    	hasRequiredPlugins$1 = 1;
    	// This export files also will get build individually for the client side
    	// and same thing could apply for the developer add rules
    	Object.defineProperty(plugins, "__esModule", { value: true });
    	plugins.plugins = void 0;
    	const tslib_1 = require$$0;
    	// Here we only provide a list of files and dynamicly import it
    	const between_1 = tslib_1.__importDefault(requireBetween());
    	const email_1 = tslib_1.__importDefault(requireEmail());
    	const float_1 = tslib_1.__importDefault(requireFloat());
    	const int_1 = tslib_1.__importDefault(requireInt());
    	const less_than_equal_1 = tslib_1.__importDefault(requireLessThanEqual());
    	const less_than_1 = tslib_1.__importDefault(requireLessThan());
    	const more_than_equal_1 = tslib_1.__importDefault(requireMoreThanEqual());
    	const more_than_1 = tslib_1.__importDefault(requireMoreThan());
    	const uint_1 = tslib_1.__importDefault(requireUint());
    	const within_1 = tslib_1.__importDefault(requireWithin());
    	plugins.plugins = [
    	    between_1.default,
    	    email_1.default,
    	    float_1.default,
    	    int_1.default,
    	    less_than_equal_1.default,
    	    less_than_1.default,
    	    more_than_equal_1.default,
    	    more_than_1.default,
    	    uint_1.default,
    	    within_1.default,
    	];
    	return plugins;
    }

    var hasRequiredPlugins;

    function requirePlugins () {
    	if (hasRequiredPlugins) return plugins$1;
    	hasRequiredPlugins = 1;
    	Object.defineProperty(plugins$1, "__esModule", { value: true });
    	plugins$1.getPlugin = plugins$1.curryPlugin = void 0;
    	const tslib_1 = require$$0;
    	const lodash_1 = lodash;
    	const general_exception_1 = tslib_1.__importDefault(generalException);
    	const constants_1 = requireConstants();
    	const index_1 = requirePlugins$1();
    	/**
    	  construct the curry plugin method
    	  @0.5.0 we make this generic
    	*/
    	function curryPlugin(input, pluginConfig) {
    	    const { plugin } = input;
    	    if (plugin) {
    	        const params = pluginConfig[constants_1.PARAMS_KEY]; // if we use pluginExport.params then TS complain!
    	        if (params) {
    	            // @BUG if the input missing the key then it wont throw for example
    	            // we expect `arg` but pass the `min` then it will run but just failed
    	            if (!checkArgKeys(input, params)) {
    	                throw new general_exception_1.default(`Expected params: ${params.join(',')} not found!`);
    	            }
    	            const args = params.map((param) => input[param]);
    	            return Reflect.apply((0, lodash_1.curry)(pluginConfig.main), null, args);
    	        }
    	        else {
    	            throw new general_exception_1.default(`This plugin ${pluginConfig.name} can not be curry`);
    	        }
    	    }
    	    throw new general_exception_1.default(`Unable to find plugin in config`);
    	}
    	plugins$1.curryPlugin = curryPlugin;
    	/** check if the expected key presented in the config */
    	function checkArgKeys(config, params) {
    	    return params.filter(key => config[key]).length === params.length;
    	}
    	/** @TODO it needs to be a js file then it must be after compile */
    	function getPlugin(pluginName) {
    	    let p = index_1.plugins[pluginName];
    	    if (p) {
    	        p = p === '_' ? pluginName : p;
    	        return Promise.resolve().then(() => tslib_1.__importStar(commonjsRequire('./' + [p, 'js'].join('.'))));
    	    }
    	    throw new Error(`${pluginName} is not found`);
    	}
    	plugins$1.getPlugin = getPlugin;
    	return plugins$1;
    }

    var promisify = {};

    var hasRequiredPromisify;

    function requirePromisify () {
    	if (hasRequiredPromisify) return promisify;
    	hasRequiredPromisify = 1;
    	// create our own promisify method here
    	// because there are many situation we want the validating method to be async
    	/// also this define here because the result is in reverse not suitable
    	// for general purpose use
    	Object.defineProperty(promisify, "__esModule", { value: true });
    	promisify.reversePromisifyResult = promisify.promisify = void 0;
    	const tslib_1 = require$$0;
    	/** it's quite annoying Typescript Function type is useless */
    	function promisify$1(fn) {
    	    return (...args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    	        const result = yield Reflect.apply(fn, null, args);
    	        return result ? Promise.resolve(result) : Promise.reject(result);
    	    });
    	}
    	promisify.promisify = promisify$1;
    	/** When the result is true get rejected and vice vesa */
    	function reversePromisifyResult(fn) {
    	    return (...args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    	        const result = yield Reflect.apply(fn, null, args);
    	        return result ? Promise.reject(result) : Promise.resolve(result);
    	    });
    	}
    	promisify.reversePromisifyResult = reversePromisifyResult;
    	return promisify;
    }

    var common$1 = {};

    var regex = {};

    var hasRequiredRegex;

    function requireRegex () {
    	if (hasRequiredRegex) return regex;
    	hasRequiredRegex = 1;
    	Object.defineProperty(regex, "__esModule", { value: true });
    	regex.getRegex = regex.isRegExp = void 0;
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
    	regex.getRegex = getRegex;
    	return regex;
    }

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
    var hasRequiredCommon$1;

    function requireCommon$1 () {
    	if (hasRequiredCommon$1) return common;
    	hasRequiredCommon$1 = 1;
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

    /* eslint-env browser */

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
    			if (!r && typeof process !== 'undefined' && 'env' in process) {
    				r = process.env.DEBUG;
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

    		module.exports = requireCommon$1()(exports);

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

    	hasFlag = (flag, argv = process.argv) => {
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

    	const {env} = process;

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

    		if (process.platform === 'win32') {
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

    /**
     * Module dependencies.
     */

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

    		exports.inspectOpts = Object.keys(process.env).filter(key => {
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
    			let val = process.env[key];
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
    				tty.isatty(process.stderr.fd);
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
    			return process.stderr.write(util.format(...args) + '\n');
    		}

    		/**
    		 * Save `namespaces`.
    		 *
    		 * @param {String} namespaces
    		 * @api private
    		 */
    		function save(namespaces) {
    			if (namespaces) {
    				process.env.DEBUG = namespaces;
    			} else {
    				// If you set a process.env field to null or undefined, it gets cast to the
    				// string 'null' or 'undefined'. Just delete instead.
    				delete process.env.DEBUG;
    			}
    		}

    		/**
    		 * Load `namespaces`.
    		 *
    		 * @return {String} returns the previously persisted debug modes
    		 * @api private
    		 */

    		function load() {
    			return process.env.DEBUG;
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

    		module.exports = requireCommon$1()(exports);

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

    /**
     * Detect Electron renderer / nwjs process, which is node, but we should
     * treat as a browser.
     */

    var hasRequiredSrc;

    function requireSrc () {
    	if (hasRequiredSrc) return src.exports;
    	hasRequiredSrc = 1;
    	(function (module) {
    		if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
    			module.exports = requireBrowser();
    		} else {
    			module.exports = requireNode();
    		}
    } (src));
    	return src.exports;
    }

    var hasRequiredCommon;

    function requireCommon () {
    	if (hasRequiredCommon) return common$1;
    	hasRequiredCommon = 1;
    	Object.defineProperty(common$1, "__esModule", { value: true });
    	common$1.patternPluginFanctory = common$1.isResultPackage = common$1.successThen = common$1.constructRuleCb = common$1.extractFnArgs = common$1.paramMatches = common$1.searchParamsKey = common$1.pluginHasFunc = common$1.checkPluginArg = void 0;
    	const tslib_1 = require$$0;
    	const validation_error_1 = tslib_1.__importDefault(validationError);
    	const general_exception_1 = tslib_1.__importDefault(generalException);
    	const constants_1 = requireConstants();
    	const common_1 = common$3;
    	const object_1 = object;
    	const is_function_1 = isFunction$1;
    	const regex_1 = requireRegex();
    	const debug_1 = tslib_1.__importDefault(requireSrc());
    	const debug = (0, debug_1.default)('jsonql:validator-core:common');
    	/** check plugin argument against keywords list */
    	function checkPluginArg(params) {
    	    return !(params.filter(param => constants_1.KEYWORDS.includes(param)).length > 0);
    	}
    	common$1.checkPluginArg = checkPluginArg;
    	/** now simply it with just one prop check main */
    	function pluginHasFunc(rule) {
    	    return rule[constants_1.PLUGIN_FN_KEY] && (0, is_function_1.isFunction)(rule[constants_1.PLUGIN_FN_KEY]);
    	}
    	common$1.pluginHasFunc = pluginHasFunc;
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
    	        throw new general_exception_1.default(constants_1.RESERVED_WORD_ERR);
    	    }
    	    rule[constants_1.PARAMS_KEY] = params;
    	    return rule;
    	}
    	common$1.searchParamsKey = searchParamsKey;
    	/** check if the params they provide is matching their main method */
    	function paramMatches(rule) {
    	    const params = getArgsKey(rule);
    	    const l = params.length;
    	    if (l === 0 && !rule[constants_1.PARAMS_KEY]) {
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
    	common$1.paramMatches = paramMatches;
    	/** take a function string and return its argument names */
    	function extractFnArgs(fnStr) {
    	    return fnStr.split('(')[1]
    	        .split(')')[0]
    	        .split(',')
    	        .map(t => t.trim())
    	        .filter(t => t !== '');
    	}
    	common$1.extractFnArgs = extractFnArgs;
    	/**
    	this will get re-use in the class to create method for the queue execution
    	 */
    	function constructRuleCb(argName, ruleFn, ruleName) {
    	    return (value, lastResult, pos) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    	        // @NOTE keep getting problem with ruleFn is not a async funtion pass here
    	        // so we need to first execute it then check if is thenable
    	        return Reflect.apply(ruleFn, null, [value])
    	            .then(successThen(argName, value, lastResult, pos))
    	            .catch((error) => {
    	            debug('failed', argName, value, error, pos);
    	            // the name should be the validator name - not the property name
    	            // because the pos already indicator the property
    	            return Promise.reject(new validation_error_1.default(ruleName, pos));
    	        });
    	    });
    	}
    	common$1.constructRuleCb = constructRuleCb;
    	/** This is taken out from the above then call for re-use when we want to fall through a rule */
    	function successThen(argName, value, lastResult, pos // for internal debug use only
    	) {
    	    return (result) => {
    	        const idx = pos[0];
    	        debug('passed', argName, value, result, pos);
    	        debug('lastResult', lastResult);
    	        const newResult = { [constants_1.IDX_KEY]: idx, [constants_1.VALUE_KEY]: value };
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
    	            else if (lr[constants_1.IDX_KEY] !== idx) {
    	                lastResult[argName] = (0, common_1.toArray)(lastResult[argName]).concat([newResult]);
    	            }
    	            // if it's the same then do nothing
    	            return lastResult;
    	        }
    	        // return the argument name with the value
    	        return (0, object_1.assign)(lastResult, { [argName]: newResult });
    	    };
    	}
    	common$1.successThen = successThen;
    	/** check to see if the lastResult contain our lastResult package format or just their value */
    	function isResultPackage(lastResult, key = constants_1.IDX_KEY) {
    	    try {
    	        if (Array.isArray(lastResult)) {
    	            return !!lastResult.filter((res) => key in res).length;
    	        }
    	    }
    	    catch (e) {
    	        debug('isResultPackage', e);
    	    }
    	    return false;
    	}
    	common$1.isResultPackage = isResultPackage;
    	/** If the plugin provide a pattern and we construct a function out of it */
    	function patternPluginFanctory(pattern) {
    	    const regex = (0, regex_1.getRegex)(pattern);
    	    return (value) => tslib_1.__awaiter(this, void 0, void 0, function* () { return regex.test(value) ? Promise.resolve(true) : Promise.reject(false); });
    	}
    	common$1.patternPluginFanctory = patternPluginFanctory;
    	return common$1;
    }

    Object.defineProperty(validatorPlugins, "__esModule", { value: true });
    var ValidatorPlugins_1 = validatorPlugins.ValidatorPlugins = void 0;
    const tslib_1 = require$$0;
    const general_exception_1 = tslib_1.__importDefault(generalException);
    const constants_1 = requireConstants();
    const plugins_1 = requirePlugins();
    const promisify_1 = requirePromisify();
    const common_1 = requireCommon();
    const plugins_2 = requirePlugins$1();
    const debug_1 = tslib_1.__importDefault(requireSrc());
    const debug$1 = (0, debug_1.default)('jsonql:validator-core:validator-plugin');
    // main
    class ValidatorPlugins {
        /** with a idx to id this instance */
        constructor($version) {
            this.$version = $version;
            this._plugins = new Map();
            this._internalPluginNames = [];
            // register internal plugins
            plugins_2.plugins.forEach((plugin) => {
                // we don't do the convert here anymore, and wait until the look up
                // then we store it back JIT
                const name = plugin[constants_1.NAME_KEY];
                this._internalPluginNames.push(name);
                this._registerPlugin(name, plugin, true);
            });
        }
        /**
        find the plugin internal or external
        argName is the argument name
        */
        lookupPlugin(input, argName) {
            const pluginName = input[constants_1.PLUGIN_KEY];
            if (pluginName && this._plugins.has(pluginName)) {
                const pluginConfig = this._plugins.get(pluginName);
                // unconverted
                if (pluginConfig[constants_1.PLUGIN_FN_KEY] && !pluginConfig[constants_1.PARAMS_KEY]) {
                    // let it fall to the next
                    pluginConfig[constants_1.VALIDATE_ASYNC_KEY] = (0, promisify_1.promisify)(pluginConfig[constants_1.PLUGIN_FN_KEY]);
                }
                // already converted
                if (pluginConfig && pluginConfig[constants_1.VALIDATE_ASYNC_KEY] && !pluginConfig[constants_1.PARAMS_KEY]) {
                    return (0, common_1.constructRuleCb)(argName, pluginConfig[constants_1.VALIDATE_ASYNC_KEY], pluginName);
                }
                // needs to curry
                if (pluginConfig && pluginConfig[constants_1.PARAMS_KEY]) {
                    debug$1('pluginConfig --->', pluginConfig);
                    debug$1('input----------->', input);
                    const _input = input;
                    return (0, common_1.constructRuleCb)(argName, (0, promisify_1.promisify)((0, plugins_1.curryPlugin)(_input, pluginConfig)), pluginName);
                }
            }
            debug$1('lookupPlugin', 'unable to find', pluginName);
            throw new general_exception_1.default(`Unable to find plugin: ${pluginName}`);
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
                    throw new general_exception_1.default(`plugin ${name} already existed!`);
                }
                if (!(0, common_1.pluginHasFunc)(pluginConfig)) {
                    debug$1('registerPlugin', constants_1.MAIN_NOT_FOUND_ERR);
                    throw new general_exception_1.default(constants_1.MAIN_NOT_FOUND_ERR);
                }
                // Here we could extract the params instead of just checking
                if (pluginConfig[constants_1.PARAMS_KEY] === undefined) {
                    pluginConfig = (0, common_1.searchParamsKey)(pluginConfig);
                    debug$1('auto generate params for plugin', pluginConfig);
                }
                else if (pluginConfig[constants_1.PARAMS_KEY] !== undefined) { // if they provide the keys then we check
                    if (!(0, common_1.checkPluginArg)(pluginConfig[constants_1.PARAMS_KEY])) {
                        debug$1('registerPlugin', constants_1.RESERVED_WORD_ERR);
                        throw new general_exception_1.default(constants_1.RESERVED_WORD_ERR);
                    }
                    if (!(0, common_1.paramMatches)(pluginConfig)) {
                        debug$1('registerPlugin', constants_1.ARG_NOT_MATCH_ERR);
                        throw new general_exception_1.default(constants_1.ARG_NOT_MATCH_ERR);
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
    ValidatorPlugins_1 = validatorPlugins.ValidatorPlugins = ValidatorPlugins;

    const debug = debugFn('jsonql:validator:class:index');
    // main
    class Validator extends ValidatorBase {
        /**
          this is now change to accept an instance of ValidatorPlugins (share)
          if only call it with the astMap then it init it as a standalone like before
        */
        constructor(astMap, vp) {
            super(astMap, vp && vp instanceof ValidatorPlugins_1 ? vp : new ValidatorPlugins_1(-1));
        }
        /** this is override the parent validate method with addtitional process for result */
        validate(values, returnAs = RETURN_AS_ARR) {
            const _super = Object.create(null, {
                validate: { get: () => super.validate }
            });
            return __awaiter$1(this, void 0, void 0, function* () {
                // call the parent validate method
                return _super.validate.call(this, values)
                    .then((result) => {
                    switch (returnAs) {
                        case RETURN_AS_RAW:
                            return result;
                        case RETURN_AS_ARR:
                            return this._prepareValidateResultForFuncCall(result);
                        case RETURN_AS_OBJ:
                        default:
                            return this._prepareValidateResultAsObject(result);
                    }
                });
            });
        }
        /** wrapper for the plugin instance register plugin method */
        registerPlugin(name, plugin) {
            if (this._validatorPluginsInstance) {
                this._validatorPluginsInstance.registerPlugin(name, plugin);
            }
        }
        /** After the validation the success will get an object with
        argumentName: value object and we make it to an array matching
        the order of the call, then we can pass it directly to method that
        get validated */
        _prepareValidateResultForFuncCall(validateResult) {
            return __awaiter$1(this, void 0, void 0, function* () {
                debug('validateResult return as array', this._arguments, validateResult);
                // @TODO need to fix the spread input type return result
                return processValidateResultsAsArr(this._arguments, validateResult);
            });
        }
        /** prepare the validation result as key value pair */
        _prepareValidateResultAsObject(validateResult) {
            return __awaiter$1(this, void 0, void 0, function* () {
                debug('validateResult return as object', this._arguments, validateResult);
                return processValidateResultsAsObj(this._arguments, validateResult);
            });
        }
    }

    exports.DEFAULT_VALUE = DEFAULT_VALUE;
    exports.RETURN_AS_ARR = RETURN_AS_ARR;
    exports.RETURN_AS_OBJ = RETURN_AS_OBJ;
    exports.RETURN_AS_RAW = RETURN_AS_RAW;
    exports.SPREAD_ARG_TYPE = SPREAD_ARG_TYPE;
    exports.TS_ARRAY_TYPE = TS_ARRAY_TYPE;
    exports.TS_TYPE_LIT = TS_TYPE_LIT;
    exports.TS_TYPE_NAME = TS_TYPE_NAME;
    exports.TS_TYPE_REF = TS_TYPE_REF;
    exports.TS_UNION_TYPE = TS_UNION_TYPE;
    exports.Validator = Validator;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
