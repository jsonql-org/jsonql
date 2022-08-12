"use strict";var b=(e,n,r)=>new Promise((t,s)=>{var p=o=>{try{l(r.next(o))}catch(i){s(i)}},y=o=>{try{l(r.throw(o))}catch(i){s(i)}},l=o=>o.done?t(o.value):Promise.resolve(o.value).then(p,y);l((r=r.apply(e,n)).next())});function A(e,n=!1){let r=parseFloat(e);if(!isNaN(r))return r;if(n)throw new Error(`${e} is not number like`);return e}function B(e,n=!1){let r=e.toLowerCase();if(r==="false")return!1;if(r==="true")return!0;if(n)throw new Error(`${e} is not boolean like`);return e}function M(e,n){if(n.indexOf(".")>-1){let r=n.split(".").map(p=>A(p)),t=r.length,s=null;for(let p=0;p<t;++p){let y=r[p];s!==null?s=s[y]:s=e[y]}return s}return e[n]}var x=(e,n)=>e.includes(n),T=e=>Array.isArray(e)?e:[e],v=e=>e.filter(Boolean);var P=(e,...n)=>(...r)=>n.reduce((t,s)=>Reflect.apply(s,null,T(t)),Reflect.apply(e,null,r)),U=e=>Reflect.apply(P,null,e);function c(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}function u(e){return c(e)==="object"}function a(e){if(u(e)){let r=e.constructor.prototype,t="[Object: null prototype]";return r.toString().substring(0,t.length)===t?!0:u(r)===!1?!1:Reflect.apply(r.hasOwnProperty,r,["isPrototypeOf"])}return!1}var _=e=>!a(e),L=(e,n)=>n&&a(n)&&e in n?n[e]:void 0,g=(...e)=>Reflect.apply(Object.assign,Object,e),G=g,H=(e,n,r={})=>e.map(n).reduce((t,s)=>g(t,s),r),$=(e,n)=>{try{let r=Object.keys(e);return x(r,n)}catch(r){return!1}},z=e=>Object.freeze(e);var k=(e,...n)=>e.length<=n.length?e(...n):(...r)=>k(e,...n,...r),f=(e,...n)=>{if(!n.length)return e;let r=n.shift();if(u(e)&&u(r))for(let t in r)u(r[t])?(e[t]||Object.assign(e,{[t]:{}}),f(e[t],r[t])):Object.assign(e,{[t]:r[t]});return f(e,...n)};function h(e,n){return n||(n=r=>r),e.flatMap(n)}function O(e){return c(e)==="string"}function W(e,n=!1){return e.reduce((r,t)=>r.then(s=>t.then(p=>n===!1?[...s,p]:f(s,p))),Promise.resolve(n===!1?[]:a(n)?n:{}))}function E(e,...n){return(...r)=>n.reduce((t,s)=>t.then(p=>s(p)),Reflect.apply(e,null,r))}function K(e,...n){let r=h(e),t=Reflect.apply(E,null,r);return Reflect.apply(t,null,n)}var Q=e=>V(e.trim().replace(/([A-Z])/g,"-$1").replace(/[-_\s]+/g,"-").toLowerCase()),V=e=>{let n=e.substring(0,1);return n!=="_"&&n!=="-"?e:e.substring(1)};var I=(e,n=!0)=>{try{return c(e)==="string"?JSON.parse(e):JSON.parse(JSON.stringify(e))}catch(r){if(n)return e;throw r}},Z=(...e)=>e.join("_"),X=()=>!1,Y=e=>{console.dir(e,{depth:null})};function ee(e,...n){return e.replace(/{([0-9]+)}/g,(r,t)=>typeof n[t]=="undefined"?r:n[t])}var j=e=>e&&a(e)&&Object.keys(e).length===0,S=e=>e!=null&&(e+"").trim()!=="";function C(e,n=!1){return Array.isArray(e)?n?!!e.length:!1:a(e)?n?!j(e):!1:S(e)}var ne=(e,n)=>!C(e,n);var re=e=>b(void 0,null,function*(){return new Promise(e)});var J=["asyncfunction","function"],te=function(e,n=!1){let r=c(e);return J.includes(r)?!0:(n&&console.error(`Expect to be Function type! Got ${typeof e}`),!1)};function oe(e){return c(e)===J[0]}var se=e=>JSON.parse(JSON.stringify(e));function m(e){function n(o){for(let i in e)Object.prototype.hasOwnProperty.call(e,i)&&(o[i]=m(e[i]))}function r(){let o={};return n(o),o}function t(){return e.map(function(o){return m(o)})}function s(){let o=new Map;for(let[i,D]of e)o.set(i,m(D));return o}function p(){let o=new Set;for(let i of e)o.add(m(i));return o}function y(){let o=this,i=e.bind(o);return n(i),i}switch(c(e)){case"object":return r();case"array":return t();case"map":return s();case"set":return p();case"function":return y();default:return e}}function pe(...e){try{window&&window.DEBUG&&Reflect.apply(console.log,console,e)}catch(n){return}}var ie=e=>{let n=[e];return(...r)=>{try{window&&window.JSONQL_DEBUG&&Reflect.apply(console.info,console,n.concat(r))}catch(t){return}}};function ce(e,n,r,t=null){return Object.getOwnPropertyDescriptor(e,n)===void 0&&Object.defineProperty(e,n,{set:r,get:t===null?function(){return null}:t}),e}function F(e,n){let r=Object.getOwnPropertyDescriptor(e,n);return r!==void 0&&r.value?r.value:r}function ye(e,n,r,t=!1){let s=F(e,n);return t===!1&&s!==void 0||Object.defineProperty(e,n,{value:r,writable:t}),e}function R(e){return e instanceof RegExp}function ae(e){switch(!0){case R(e):return e;case O(e):return new RegExp(e);default:return!1}}var d=(e=!1)=>{let n=Date.now();return e?Math.floor(n/1e3):n};var q=(e,n)=>{let r=[];for(let t in n)r.push([t,n[t]].join("="));return[e,r.join("&")].join("?")},le=e=>q(e,N()),N=(e="_cb")=>({[e]:d()});function ue(e,n){try{return JSON.stringify(e)===JSON.stringify(n)}catch(r){return!1}}function w(e,n){function r(o){return Object.prototype.toString.call(o).slice(8,-1).toLowerCase()}function t(){if(e.length!==n.length)return!1;for(let o=0;o<e.length;o++)if(!w(e[o],n[o]))return!1;return!0}function s(){if(Object.keys(e).length!==Object.keys(n).length)return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&!w(e[o],n[o]))return!1;return!0}function p(){return e.toString()===n.toString()}function y(){return e===n}let l=r(e);switch(l){case"array":return t();case"object":return s();case"function":return p();default:return l!==r(n)?!1:y()}}function fe(e){let r=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),t=decodeURIComponent(atob(r).split("").map(function(s){return"%"+("00"+s.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(t)}export{M as accessByPath,H as arrToObj,g as assign,N as cacheBurst,le as cacheBurstUrl,U as chainArrayFns,P as chainFns,E as chainProcessPromises,W as chainPromises,m as cloneDeep,se as cloneDeepCheap,v as compact,Z as createEvtName,k as curry,Q as dasherize,G as extend,h as flatMap,ee as formatStr,L as getConfigValue,ie as getLogger,ae as getRegex,x as inArray,ye as injectToFn,oe as isAsyncFunction,_ as isClass,ne as isEmpty,j as isEmptyObj,w as isEqual,ue as isEqualCheap,te as isFunction,S as isNotEmpty,u as isObject,a as isPlainObject,R as isRegExp,O as isString,pe as logger,f as merge,X as nil,C as notEmpty,ce as objDefineProps,F as objHasProp,$ as objectHasKey,fe as parseJWT,I as parseJson,re as promise,K as queuePromisesProcess,z as readOnly,Y as showDeep,B as strToBool,A as strToNum,d as timestamp,T as toArray,c as trueTypeOf,q as urlParams};
//# sourceMappingURL=esm.js.map
