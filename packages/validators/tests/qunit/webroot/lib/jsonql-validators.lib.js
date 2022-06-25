(function (global, factory) {
            typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tty'), require('util'), require('os')) :
            typeof define === 'function' && define.amd ? define(['exports', 'tty', 'util', 'os'], factory) :
            (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.JsonqlValidators = {}, global.require$$1, global.require$$1$1, global.require$$0$1));
})(this, (function (exports, require$$1, require$$1$1, require$$0$1) { 'use strict';

            function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

            var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
            var require$$1__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$1$1);
            var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);

            var kn=Object.create;var Ut=Object.defineProperty;var In=Object.getOwnPropertyDescriptor;var Nn=Object.getOwnPropertyNames;var Gt=Object.getPrototypeOf,Dn=Object.prototype.hasOwnProperty;var Vn=Reflect.get;var $t=(e=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(e,{get:(r,t)=>(typeof require!="undefined"?require:r)[t]}):e)(function(e){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')});var g=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports);var Kn=(e,r,t,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let s of Nn(r))!Dn.call(e,s)&&s!==t&&Ut(e,s,{get:()=>r[s],enumerable:!(n=In(r,s))||n.enumerable});return e};var T=(e,r,t)=>(t=e!=null?kn(Gt(e)):{},Kn(r||!e||!e.__esModule?Ut(t,"default",{value:e,enumerable:!0}):t,e));var Bt=(e,r,t)=>Vn(Gt(e),t,r);var P=(e,r,t)=>new Promise((n,s)=>{var o=a=>{try{u(t.next(a));}catch(p){s(p);}},i=a=>{try{u(t.throw(a));}catch(p){s(p);}},u=a=>a.done?n(a.value):Promise.resolve(a.value).then(o,i);u((t=t.apply(e,r)).next());});var st=g(nt=>{Object.defineProperty(nt,"__esModule",{value:!0});var re=class extends Error{constructor(...r){super(...r),this.message=r[0],this.detail=r[1],this.className=re.name,Error.captureStackTrace&&Error.captureStackTrace(this,re);}};nt.default=re;});var Fe=g(ot=>{Object.defineProperty(ot,"__esModule",{value:!0});var ne=class extends Error{constructor(...r){super(...r),this.message=r[0],this.detail=r[1],this.className=ne.name,Error.captureStackTrace&&Error.captureStackTrace(this,ne);}};ot.default=ne;});var se=g(qe=>{Object.defineProperty(qe,"__esModule",{value:!0});qe.trueTypeOf=void 0;function Jn(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}qe.trueTypeOf=Jn;});var Ye=g(R=>{Object.defineProperty(R,"__esModule",{value:!0});R.formatStr=R.showDeep=R.nil=R.createEvtName=R.parseJson=R.toArray=R.inArray=void 0;var Ln=se(),Un=(e,r)=>e.includes(r);R.inArray=Un;var Gn=e=>Array.isArray(e)?e:[e];R.toArray=Gn;var $n=(e,r=!0)=>{try{return (0,Ln.trueTypeOf)(e)==="string"?JSON.parse(e):JSON.parse(JSON.stringify(e))}catch(t){if(r)return e;throw t}};R.parseJson=$n;var Bn=(...e)=>e.join("_");R.createEvtName=Bn;var zn=()=>!1;R.nil=zn;var Wn=e=>{console.dir(e,{depth:null});};R.showDeep=Wn;function Hn(e,...r){return e.replace(/{([0-9]+)}/g,(t,n)=>typeof r[n]=="undefined"?t:r[n])}R.formatStr=Hn;});var z=g(E=>{Object.defineProperty(E,"__esModule",{value:!0});E.readOnly=E.objectHasKey=E.arrToObj=E.assign=E.getConfigValue=E.isClass=E.isPlainObject=E.isObject=void 0;var Xn=Ye(),Zn=se();function it(e){return (0, Zn.trueTypeOf)(e)==="object"}E.isObject=it;function at(e){if(it(e)){let t=e.constructor.prototype,n="[Object: null prototype]";return t.toString().substring(0,n.length)===n?!0:it(t)===!1?!1:Reflect.apply(t.hasOwnProperty,t,["isPrototypeOf"])}return !1}E.isPlainObject=at;var Qn=e=>!at(e);E.isClass=Qn;var es=(e,r)=>r&&at(r)&&e in r?r[e]:void 0;E.getConfigValue=es;var ts=(...e)=>Reflect.apply(Object.assign,Object,e);E.assign=ts;var rs=(e,r,t={})=>e.map(r).reduce((n,s)=>(0, E.assign)(n,s),t);E.arrToObj=rs;var ns=(e,r)=>{try{let t=Object.keys(e);return (0,Xn.inArray)(t,r)}catch{return !1}};E.objectHasKey=ns;var ss=e=>Object.freeze(e);E.readOnly=ss;});var ut=g(x=>{Object.defineProperty(x,"__esModule",{value:!0});x.isEmpty=x.notEmpty=x.isNotEmpty=x.isEmptyObj=void 0;var zt=z(),os=e=>e&&(0, zt.isPlainObject)(e)&&Object.keys(e).length===0;x.isEmptyObj=os;var is=e=>e!=null&&(e+"").trim()!=="";x.isNotEmpty=is;function Wt(e,r=!1){return Array.isArray(e)?r?!!e.length:!1:(0, zt.isPlainObject)(e)?r?!(0, x.isEmptyObj)(e):!1:(0, x.isNotEmpty)(e)}x.notEmpty=Wt;var as=(e,r)=>!Wt(e,r);x.isEmpty=as;});var ct=g(oe=>{Object.defineProperty(oe,"__esModule",{value:!0});oe.isAsyncFunction=oe.isFunction=void 0;var Ht=se(),Xt=["asyncfunction","function"],us=function(e,r=!1){let t=(0, Ht.trueTypeOf)(e);return Xt.includes(t)?!0:(r&&console.error(`Expect to be Function type! Got ${typeof e}`),!1)};oe.isFunction=us;function cs(e){return (0, Ht.trueTypeOf)(e)===Xt[0]}oe.isAsyncFunction=cs;});var xe=g(S=>{Object.defineProperty(S,"__esModule",{value:!0});S.isString=S.flatMap=S.merge=S.curry=void 0;var ls=se(),lt=z(),fs=(e,...r)=>e.length<=r.length?e(...r):(...t)=>(0, S.curry)(e,...r,...t);S.curry=fs;var ps=(e,...r)=>{if(!r.length)return e;let t=r.shift();if((0, lt.isObject)(e)&&(0, lt.isObject)(t))for(let n in t)(0, lt.isObject)(t[n])?(e[n]||Object.assign(e,{[n]:{}}),(0, S.merge)(e[n],t[n])):Object.assign(e,{[n]:t[n]});return (0, S.merge)(e,...r)};S.merge=ps;function ds(e,r){return r||(r=t=>t),e.flatMap(r)}S.flatMap=ds;function ms(e){return (0, ls.trueTypeOf)(e)==="string"}S.isString=ms;});var er=g(L=>{Object.defineProperty(L,"__esModule",{value:!0});L.queuePromisesProcess=L.chainProcessPromises=L.chainPromises=void 0;var Zt=xe(),ys=z();function _s(e,r=!1){return e.reduce((t,n)=>t.then(s=>n.then(o=>r===!1?[...s,o]:(0, Zt.merge)(s,o))),Promise.resolve(r===!1?[]:(0, ys.isPlainObject)(r)?r:{}))}L.chainPromises=_s;function Qt(e,...r){return (...t)=>r.reduce((n,s)=>n.then(o=>s(o)),Reflect.apply(e,null,t))}L.chainProcessPromises=Qt;function hs(e,...r){let t=(0, Zt.flatMap)(e),n=Reflect.apply(Qt,null,t);return Reflect.apply(n,null,r)}L.queuePromisesProcess=hs;});var Er=g((fa,Pr)=>{var ce=1e3,le=ce*60,fe=le*60,Z=fe*24,to=Z*7,ro=Z*365.25;Pr.exports=function(e,r){r=r||{};var t=typeof e;if(t==="string"&&e.length>0)return no(e);if(t==="number"&&isFinite(e))return r.long?oo(e):so(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function no(e){if(e=String(e),!(e.length>100)){var r=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(!!r){var t=parseFloat(r[1]),n=(r[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return t*ro;case"weeks":case"week":case"w":return t*to;case"days":case"day":case"d":return t*Z;case"hours":case"hour":case"hrs":case"hr":case"h":return t*fe;case"minutes":case"minute":case"mins":case"min":case"m":return t*le;case"seconds":case"second":case"secs":case"sec":case"s":return t*ce;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return t;default:return}}}}function so(e){var r=Math.abs(e);return r>=Z?Math.round(e/Z)+"d":r>=fe?Math.round(e/fe)+"h":r>=le?Math.round(e/le)+"m":r>=ce?Math.round(e/ce)+"s":e+"ms"}function oo(e){var r=Math.abs(e);return r>=Z?De(e,r,Z,"day"):r>=fe?De(e,r,fe,"hour"):r>=le?De(e,r,le,"minute"):r>=ce?De(e,r,ce,"second"):e+" ms"}function De(e,r,t,n){var s=r>=t*1.5;return Math.round(e/t)+" "+n+(s?"s":"")}});var Fr=g((pa,Ar)=>{function io(e){t.debug=t,t.default=t,t.coerce=a,t.disable=o,t.enable=s,t.enabled=i,t.humanize=Er(),t.destroy=p,Object.keys(e).forEach(c=>{t[c]=e[c];}),t.names=[],t.skips=[],t.formatters={};function r(c){let f=0;for(let l=0;l<c.length;l++)f=(f<<5)-f+c.charCodeAt(l),f|=0;return t.colors[Math.abs(f)%t.colors.length]}t.selectColor=r;function t(c){let f,l=null,d,y;function m(...h){if(!m.enabled)return;let C=m,b=Number(new Date),O=b-(f||b);C.diff=O,C.prev=f,C.curr=b,f=b,h[0]=t.coerce(h[0]),typeof h[0]!="string"&&h.unshift("%O");let F=0;h[0]=h[0].replace(/%([a-zA-Z%])/g,(D,J)=>{if(D==="%%")return "%";F++;let V=t.formatters[J];if(typeof V=="function"){let Ae=h[F];D=V.call(C,Ae),h.splice(F,1),F--;}return D}),t.formatArgs.call(C,h),(C.log||t.log).apply(C,h);}return m.namespace=c,m.useColors=t.useColors(),m.color=t.selectColor(c),m.extend=n,m.destroy=t.destroy,Object.defineProperty(m,"enabled",{enumerable:!0,configurable:!1,get:()=>l!==null?l:(d!==t.namespaces&&(d=t.namespaces,y=t.enabled(c)),y),set:h=>{l=h;}}),typeof t.init=="function"&&t.init(m),m}function n(c,f){let l=t(this.namespace+(typeof f>"u"?":":f)+c);return l.log=this.log,l}function s(c){t.save(c),t.namespaces=c,t.names=[],t.skips=[];let f,l=(typeof c=="string"?c:"").split(/[\s,]+/),d=l.length;for(f=0;f<d;f++)!l[f]||(c=l[f].replace(/\*/g,".*?"),c[0]==="-"?t.skips.push(new RegExp("^"+c.slice(1)+"$")):t.names.push(new RegExp("^"+c+"$")));}function o(){let c=[...t.names.map(u),...t.skips.map(u).map(f=>"-"+f)].join(",");return t.enable(""),c}function i(c){if(c[c.length-1]==="*")return !0;let f,l;for(f=0,l=t.skips.length;f<l;f++)if(t.skips[f].test(c))return !1;for(f=0,l=t.names.length;f<l;f++)if(t.names[f].test(c))return !0;return !1}function u(c){return c.toString().substring(2,c.toString().length-2).replace(/\.\*\?$/,"*")}function a(c){return c instanceof Error?c.stack||c.message:c}function p(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");}return t.enable(t.load()),t}Ar.exports=io;});var Ke=g((q,Ve)=>{q.formatArgs=uo;q.save=co;q.load=lo;q.useColors=ao;q.storage=fo();q.destroy=(()=>{let e=!1;return ()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));}})();q.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function ao(){return typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs)?!0:typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)?!1:typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function uo(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ve.exports.humanize(this.diff),!this.useColors)return;let r="color: "+this.color;e.splice(1,0,r,"color: inherit");let t=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(t++,s==="%c"&&(n=t));}),e.splice(n,0,r);}q.log=console.debug||console.log||(()=>{});function co(e){try{e?q.storage.setItem("debug",e):q.storage.removeItem("debug");}catch{}}function lo(){let e;try{e=q.storage.getItem("debug");}catch{}return !e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function fo(){try{return localStorage}catch{}}Ve.exports=Fr()(q);var{formatters:po}=Ve.exports;po.j=function(e){try{return JSON.stringify(e)}catch(r){return "[UnexpectedJSONParseError]: "+r.message}};});var B=g((ba,Be)=>{var Ir,Nr,Dr,Vr,Kr,Jr,Lr,Ur,Gr,Ge,Et,$r,Br,zr,me,Wr,Hr,Xr,Zr,Qr,en,tn,rn,nn,$e;(function(e){var r=typeof global=="object"?global:typeof self=="object"?self:typeof this=="object"?this:{};typeof define=="function"&&define.amd?define("tslib",["exports"],function(n){e(t(r,t(n)));}):typeof Be=="object"&&typeof Be.exports=="object"?e(t(r,t(Be.exports))):e(t(r));function t(n,s){return n!==r&&(typeof Object.create=="function"?Object.defineProperty(n,"__esModule",{value:!0}):n.__esModule=!0),function(o,i){return n[o]=s?s(o,i):i}}})(function(e){var r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,s){n.__proto__=s;}||function(n,s){for(var o in s)Object.prototype.hasOwnProperty.call(s,o)&&(n[o]=s[o]);};Ir=function(n,s){if(typeof s!="function"&&s!==null)throw new TypeError("Class extends value "+String(s)+" is not a constructor or null");r(n,s);function o(){this.constructor=n;}n.prototype=s===null?Object.create(s):(o.prototype=s.prototype,new o);},Nr=Object.assign||function(n){for(var s,o=1,i=arguments.length;o<i;o++){s=arguments[o];for(var u in s)Object.prototype.hasOwnProperty.call(s,u)&&(n[u]=s[u]);}return n},Dr=function(n,s){var o={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&s.indexOf(i)<0&&(o[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var u=0,i=Object.getOwnPropertySymbols(n);u<i.length;u++)s.indexOf(i[u])<0&&Object.prototype.propertyIsEnumerable.call(n,i[u])&&(o[i[u]]=n[i[u]]);return o},Vr=function(n,s,o,i){var u=arguments.length,a=u<3?s:i===null?i=Object.getOwnPropertyDescriptor(s,o):i,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(n,s,o,i);else for(var c=n.length-1;c>=0;c--)(p=n[c])&&(a=(u<3?p(a):u>3?p(s,o,a):p(s,o))||a);return u>3&&a&&Object.defineProperty(s,o,a),a},Kr=function(n,s){return function(o,i){s(o,i,n);}},Jr=function(n,s){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(n,s)},Lr=function(n,s,o,i){function u(a){return a instanceof o?a:new o(function(p){p(a);})}return new(o||(o=Promise))(function(a,p){function c(d){try{l(i.next(d));}catch(y){p(y);}}function f(d){try{l(i.throw(d));}catch(y){p(y);}}function l(d){d.done?a(d.value):u(d.value).then(c,f);}l((i=i.apply(n,s||[])).next());})},Ur=function(n,s){var o={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},i,u,a,p;return p={next:c(0),throw:c(1),return:c(2)},typeof Symbol=="function"&&(p[Symbol.iterator]=function(){return this}),p;function c(l){return function(d){return f([l,d])}}function f(l){if(i)throw new TypeError("Generator is already executing.");for(;o;)try{if(i=1,u&&(a=l[0]&2?u.return:l[0]?u.throw||((a=u.return)&&a.call(u),0):u.next)&&!(a=a.call(u,l[1])).done)return a;switch(u=0,a&&(l=[l[0]&2,a.value]),l[0]){case 0:case 1:a=l;break;case 4:return o.label++,{value:l[1],done:!1};case 5:o.label++,u=l[1],l=[0];continue;case 7:l=o.ops.pop(),o.trys.pop();continue;default:if(a=o.trys,!(a=a.length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){o=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){o.label=l[1];break}if(l[0]===6&&o.label<a[1]){o.label=a[1],a=l;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(l);break}a[2]&&o.ops.pop(),o.trys.pop();continue}l=s.call(n,o);}catch(d){l=[6,d],u=0;}finally{i=a=0;}if(l[0]&5)throw l[1];return {value:l[0]?l[1]:void 0,done:!0}}},Gr=function(n,s){for(var o in n)o!=="default"&&!Object.prototype.hasOwnProperty.call(s,o)&&$e(s,n,o);},$e=Object.create?function(n,s,o,i){i===void 0&&(i=o);var u=Object.getOwnPropertyDescriptor(s,o);(!u||("get"in u?!s.__esModule:u.writable||u.configurable))&&(u={enumerable:!0,get:function(){return s[o]}}),Object.defineProperty(n,i,u);}:function(n,s,o,i){i===void 0&&(i=o),n[i]=s[o];},Ge=function(n){var s=typeof Symbol=="function"&&Symbol.iterator,o=s&&n[s],i=0;if(o)return o.call(n);if(n&&typeof n.length=="number")return {next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")},Et=function(n,s){var o=typeof Symbol=="function"&&n[Symbol.iterator];if(!o)return n;var i=o.call(n),u,a=[],p;try{for(;(s===void 0||s-- >0)&&!(u=i.next()).done;)a.push(u.value);}catch(c){p={error:c};}finally{try{u&&!u.done&&(o=i.return)&&o.call(i);}finally{if(p)throw p.error}}return a},$r=function(){for(var n=[],s=0;s<arguments.length;s++)n=n.concat(Et(arguments[s]));return n},Br=function(){for(var n=0,s=0,o=arguments.length;s<o;s++)n+=arguments[s].length;for(var i=Array(n),u=0,s=0;s<o;s++)for(var a=arguments[s],p=0,c=a.length;p<c;p++,u++)i[u]=a[p];return i},zr=function(n,s,o){if(o||arguments.length===2)for(var i=0,u=s.length,a;i<u;i++)(a||!(i in s))&&(a||(a=Array.prototype.slice.call(s,0,i)),a[i]=s[i]);return n.concat(a||Array.prototype.slice.call(s))},me=function(n){return this instanceof me?(this.v=n,this):new me(n)},Wr=function(n,s,o){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=o.apply(n,s||[]),u,a=[];return u={},p("next"),p("throw"),p("return"),u[Symbol.asyncIterator]=function(){return this},u;function p(m){i[m]&&(u[m]=function(h){return new Promise(function(C,b){a.push([m,h,C,b])>1||c(m,h);})});}function c(m,h){try{f(i[m](h));}catch(C){y(a[0][3],C);}}function f(m){m.value instanceof me?Promise.resolve(m.value.v).then(l,d):y(a[0][2],m);}function l(m){c("next",m);}function d(m){c("throw",m);}function y(m,h){m(h),a.shift(),a.length&&c(a[0][0],a[0][1]);}},Hr=function(n){var s,o;return s={},i("next"),i("throw",function(u){throw u}),i("return"),s[Symbol.iterator]=function(){return this},s;function i(u,a){s[u]=n[u]?function(p){return (o=!o)?{value:me(n[u](p)),done:u==="return"}:a?a(p):p}:a;}},Xr=function(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s=n[Symbol.asyncIterator],o;return s?s.call(n):(n=typeof Ge=="function"?Ge(n):n[Symbol.iterator](),o={},i("next"),i("throw"),i("return"),o[Symbol.asyncIterator]=function(){return this},o);function i(a){o[a]=n[a]&&function(p){return new Promise(function(c,f){p=n[a](p),u(c,f,p.done,p.value);})};}function u(a,p,c,f){Promise.resolve(f).then(function(l){a({value:l,done:c});},p);}},Zr=function(n,s){return Object.defineProperty?Object.defineProperty(n,"raw",{value:s}):n.raw=s,n};var t=Object.create?function(n,s){Object.defineProperty(n,"default",{enumerable:!0,value:s});}:function(n,s){n.default=s;};Qr=function(n){if(n&&n.__esModule)return n;var s={};if(n!=null)for(var o in n)o!=="default"&&Object.prototype.hasOwnProperty.call(n,o)&&$e(s,n,o);return t(s,n),s},en=function(n){return n&&n.__esModule?n:{default:n}},tn=function(n,s,o,i){if(o==="a"&&!i)throw new TypeError("Private accessor was defined without a getter");if(typeof s=="function"?n!==s||!i:!s.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return o==="m"?i:o==="a"?i.call(n):i?i.value:s.get(n)},rn=function(n,s,o,i,u){if(i==="m")throw new TypeError("Private method is not writable");if(i==="a"&&!u)throw new TypeError("Private accessor was defined without a setter");if(typeof s=="function"?n!==s||!u:!s.has(n))throw new TypeError("Cannot write private member to an object whose class did not declare it");return i==="a"?u.call(n,o):u?u.value=o:s.set(n,o),o},nn=function(n,s){if(s===null||typeof s!="object"&&typeof s!="function")throw new TypeError("Cannot use 'in' operator on non-object");return typeof n=="function"?s===n:n.has(s)},e("__extends",Ir),e("__assign",Nr),e("__rest",Dr),e("__decorate",Vr),e("__param",Kr),e("__metadata",Jr),e("__awaiter",Lr),e("__generator",Ur),e("__exportStar",Gr),e("__createBinding",$e),e("__values",Ge),e("__read",Et),e("__spread",$r),e("__spreadArrays",Br),e("__spreadArray",zr),e("__await",me),e("__asyncGenerator",Wr),e("__asyncDelegator",Hr),e("__asyncValues",Xr),e("__makeTemplateObject",Zr),e("__importStar",Qr),e("__importDefault",en),e("__classPrivateFieldGet",tn),e("__classPrivateFieldSet",rn),e("__classPrivateFieldIn",nn);});});var ze=g(_=>{Object.defineProperty(_,"__esModule",{value:!0});_.KEYWORDS=_.MAIN_NOT_FOUND_ERR=_.ARG_NOT_MATCH_ERR=_.RESERVED_WORD_ERR=_.VALUE_KEY=_.IDX_KEY=_.PARAMS_KEY=_.NAME_KEY=_.RULES_KEY=_.PATTERN_KEY=_.PLUGIN_FN_KEY=_.PLUGIN_KEY=_.VALIDATE_ASYNC_KEY=_.VALIDATE_KEY=_.ARRAY_TYPE_RGT=_.ARRAY_TYPE_LFT=_.ARRAY_TS_TYPE_LFT=_.OBJECT_TYPE=_.ARRAY_TYPE=_.NUMBER_TYPE=_.STRING_TYPE=_.BOOLEAN_TYPE=_.OR_SEPERATOR=void 0;_.OR_SEPERATOR="|";_.BOOLEAN_TYPE="boolean";_.STRING_TYPE="string";_.NUMBER_TYPE="number";_.ARRAY_TYPE="array";_.OBJECT_TYPE="object";_.ARRAY_TS_TYPE_LFT="Array<";_.ARRAY_TYPE_LFT="array.<";_.ARRAY_TYPE_RGT=">";_.VALIDATE_KEY="validate";_.VALIDATE_ASYNC_KEY="validateAsync";_.PLUGIN_KEY="plugin";_.PLUGIN_FN_KEY="main";_.PATTERN_KEY="pattern";_.RULES_KEY="rules";_.NAME_KEY="name";_.PARAMS_KEY="params";_.IDX_KEY="$$idx";_.VALUE_KEY="$$value";_.RESERVED_WORD_ERR="Your plugin config argument contains reserved keywords";_.ARG_NOT_MATCH_ERR="Your params doesn't matching your main argument list";_.MAIN_NOT_FOUND_ERR="Can not find 'main' method in your plugin config";_.KEYWORDS=[_.PARAMS_KEY,_.PATTERN_KEY,_.VALIDATE_KEY,_.VALIDATE_ASYNC_KEY,_.PLUGIN_KEY,_.RULES_KEY,"name","type","types","server","tstype","value","optional","tmp","pos","lastResult"];});var je=g(We=>{Object.defineProperty(We,"__esModule",{value:!0});We.len=void 0;function go(e){return typeof e=="string"?e.length:e}We.len=go;});var Ft=g(At=>{Object.defineProperty(At,"__esModule",{value:!0});var Co=je(),bo="moreThan";function vo(e,r){return (0, Co.len)(r)>e}At.default={name:bo,main:vo,params:["num"]};});var Ot=g(wt=>{Object.defineProperty(wt,"__esModule",{value:!0});var Po=je(),Eo="lessThan";function Ao(e,r){return (0, Po.len)(r)<e}wt.default={name:Eo,main:Ao,params:["num"]};});var on$1=g(Rt=>{Object.defineProperty(Rt,"__esModule",{value:!0});var sn=B(),Fo=sn.__importDefault(Ft()),wo=sn.__importDefault(Ot()),Oo="between";function Ro(e,r,t){return wo.default.main(e,t)&&Fo.default.main(r,t)}Rt.default={main:Ro,name:Oo,params:["max","min"]};});var an=g(jt=>{Object.defineProperty(jt,"__esModule",{value:!0});var jo="email";function To(e){return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)}jt.default={main:To,name:jo};});var He=g(k=>{Object.defineProperty(k,"__esModule",{value:!0});k.checkUnsigned=k.checkFloat=k.checkInteger=k.checkNumber=void 0;var Tt=se(),St="number";function So(e){return (0, Tt.trueTypeOf)(e)!==St?!1:!isNaN(parseFloat(e+""))}k.checkNumber=So;function un(e){return (0, Tt.trueTypeOf)(e)===St&&Number.isInteger(e)}k.checkInteger=un;function qo(e){return (0, Tt.trueTypeOf)(e)===St&&!isNaN(e)&&!Number.isInteger(e)}k.checkFloat=qo;function Yo(e){return un(e)&&e>=0}k.checkUnsigned=Yo;});var cn=g(ye=>{Object.defineProperty(ye,"__esModule",{value:!0});ye.name=void 0;var xo=He();ye.name="float";function Mo(e){return (0, xo.checkFloat)(e)}ye.default={name:ye.name,main:Mo};});var ln=g(_e=>{Object.defineProperty(_e,"__esModule",{value:!0});_e.name=void 0;var ko=He();_e.name="int";function Io(e){return (0, ko.checkInteger)(e)}_e.default={name:_e.name,main:Io};});var Yt=g(qt=>{Object.defineProperty(qt,"__esModule",{value:!0});var No=je(),Do="lessThanEqual";function Vo(e,r){return (0, No.len)(r)<=e}qt.default={name:Do,main:Vo,params:["num"]};});var Mt=g(xt=>{Object.defineProperty(xt,"__esModule",{value:!0});var Ko=je(),Jo="moreThanEqual";function Lo(e,r){return (0, Ko.len)(r)>=e}xt.default={name:Jo,main:Lo,params:["num"]};});var fn=g(kt=>{Object.defineProperty(kt,"__esModule",{value:!0});var Uo=He(),Go="unit";function $o(e){return (0, Uo.checkUnsigned)(e)}kt.default={name:Go,main:$o};});var dn=g(It=>{Object.defineProperty(It,"__esModule",{value:!0});var pn=B(),Bo=pn.__importDefault(Mt()),zo=pn.__importDefault(Yt()),Wo="main";function Ho(e,r,t){return zo.default.main(e,t)&&Bo.default.main(r,t)}It.default={name:Wo,main:Ho,params:["max","min"]};});var Nt=g(Xe=>{Object.defineProperty(Xe,"__esModule",{value:!0});Xe.plugins=void 0;var I=B(),Xo=I.__importDefault(on$1()),Zo=I.__importDefault(an()),Qo=I.__importDefault(cn()),ei=I.__importDefault(ln()),ti=I.__importDefault(Yt()),ri=I.__importDefault(Ot()),ni=I.__importDefault(Mt()),si=I.__importDefault(Ft()),oi=I.__importDefault(fn()),ii=I.__importDefault(dn());Xe.plugins=[Xo.default,Zo.default,Qo.default,ei.default,ti.default,ri.default,ni.default,si.default,oi.default,ii.default];});var yn=g(he=>{Object.defineProperty(he,"__esModule",{value:!0});he.getPlugin=he.curryPlugin=void 0;var mn=B(),ai=xe(),Dt=mn.__importDefault(Fe()),ui=ze(),ci=Nt();function li(e,r){let{plugin:t}=e;if(t){let n=r[ui.PARAMS_KEY];if(n){if(!fi(e,n))throw new Dt.default(`Expected params: ${n.join(",")} not found!`);let s=n.map(o=>e[o]);return Reflect.apply((0, ai.curry)(r.main),null,s)}else throw new Dt.default(`This plugin ${r.name} can not be curry`)}throw new Dt.default("Unable to find plugin in config")}he.curryPlugin=li;function fi(e,r){return r.filter(t=>e[t]).length===r.length}function pi(e){let r=ci.plugins[e];if(r)return r=r==="_"?e:r,Promise.resolve().then(()=>mn.__importStar($t("./"+[r,"js"].join("."))));throw new Error(`${e} is not found`)}he.getPlugin=pi;});var hn=g(ge=>{Object.defineProperty(ge,"__esModule",{value:!0});ge.reversePromisifyResult=ge.promisify=void 0;var _n=B();function di(e){return (...r)=>_n.__awaiter(this,void 0,void 0,function*(){let t=yield Reflect.apply(e,null,r);return t?Promise.resolve(t):Promise.reject(t)})}ge.promisify=di;function mi(e){return (...r)=>_n.__awaiter(this,void 0,void 0,function*(){let t=yield Reflect.apply(e,null,r);return t?Promise.reject(t):Promise.resolve(t)})}ge.reversePromisifyResult=mi;});var Cn=g(Ce=>{Object.defineProperty(Ce,"__esModule",{value:!0});Ce.getRegex=Ce.isRegExp=void 0;var yi=xe();function gn(e){return e instanceof RegExp}Ce.isRegExp=gn;function _i(e){switch(!0){case gn(e):return e;case(0, yi.isString)(e):return new RegExp(e);default:return !1}}Ce.getRegex=_i;});var vn=g((Na,bn)=>{var be=1e3,ve=be*60,Pe=ve*60,Q=Pe*24,hi=Q*7,gi=Q*365.25;bn.exports=function(e,r){r=r||{};var t=typeof e;if(t==="string"&&e.length>0)return Ci(e);if(t==="number"&&isFinite(e))return r.long?vi(e):bi(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Ci(e){if(e=String(e),!(e.length>100)){var r=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(!!r){var t=parseFloat(r[1]),n=(r[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return t*gi;case"weeks":case"week":case"w":return t*hi;case"days":case"day":case"d":return t*Q;case"hours":case"hour":case"hrs":case"hr":case"h":return t*Pe;case"minutes":case"minute":case"mins":case"min":case"m":return t*ve;case"seconds":case"second":case"secs":case"sec":case"s":return t*be;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return t;default:return}}}}function bi(e){var r=Math.abs(e);return r>=Q?Math.round(e/Q)+"d":r>=Pe?Math.round(e/Pe)+"h":r>=ve?Math.round(e/ve)+"m":r>=be?Math.round(e/be)+"s":e+"ms"}function vi(e){var r=Math.abs(e);return r>=Q?Ze(e,r,Q,"day"):r>=Pe?Ze(e,r,Pe,"hour"):r>=ve?Ze(e,r,ve,"minute"):r>=be?Ze(e,r,be,"second"):e+" ms"}function Ze(e,r,t,n){var s=r>=t*1.5;return Math.round(e/t)+" "+n+(s?"s":"")}});var En=g((Da,Pn)=>{function Pi(e){t.debug=t,t.default=t,t.coerce=a,t.disable=o,t.enable=s,t.enabled=i,t.humanize=vn(),t.destroy=p,Object.keys(e).forEach(c=>{t[c]=e[c];}),t.names=[],t.skips=[],t.formatters={};function r(c){let f=0;for(let l=0;l<c.length;l++)f=(f<<5)-f+c.charCodeAt(l),f|=0;return t.colors[Math.abs(f)%t.colors.length]}t.selectColor=r;function t(c){let f,l=null,d,y;function m(...h){if(!m.enabled)return;let C=m,b=Number(new Date),O=b-(f||b);C.diff=O,C.prev=f,C.curr=b,f=b,h[0]=t.coerce(h[0]),typeof h[0]!="string"&&h.unshift("%O");let F=0;h[0]=h[0].replace(/%([a-zA-Z%])/g,(D,J)=>{if(D==="%%")return "%";F++;let V=t.formatters[J];if(typeof V=="function"){let Ae=h[F];D=V.call(C,Ae),h.splice(F,1),F--;}return D}),t.formatArgs.call(C,h),(C.log||t.log).apply(C,h);}return m.namespace=c,m.useColors=t.useColors(),m.color=t.selectColor(c),m.extend=n,m.destroy=t.destroy,Object.defineProperty(m,"enabled",{enumerable:!0,configurable:!1,get:()=>l!==null?l:(d!==t.namespaces&&(d=t.namespaces,y=t.enabled(c)),y),set:h=>{l=h;}}),typeof t.init=="function"&&t.init(m),m}function n(c,f){let l=t(this.namespace+(typeof f>"u"?":":f)+c);return l.log=this.log,l}function s(c){t.save(c),t.namespaces=c,t.names=[],t.skips=[];let f,l=(typeof c=="string"?c:"").split(/[\s,]+/),d=l.length;for(f=0;f<d;f++)!l[f]||(c=l[f].replace(/\*/g,".*?"),c[0]==="-"?t.skips.push(new RegExp("^"+c.slice(1)+"$")):t.names.push(new RegExp("^"+c+"$")));}function o(){let c=[...t.names.map(u),...t.skips.map(u).map(f=>"-"+f)].join(",");return t.enable(""),c}function i(c){if(c[c.length-1]==="*")return !0;let f,l;for(f=0,l=t.skips.length;f<l;f++)if(t.skips[f].test(c))return !1;for(f=0,l=t.names.length;f<l;f++)if(t.names[f].test(c))return !0;return !1}function u(c){return c.toString().substring(2,c.toString().length-2).replace(/\.\*\?$/,"*")}function a(c){return c instanceof Error?c.stack||c.message:c}function p(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");}return t.enable(t.load()),t}Pn.exports=Pi;});var Vt=g((Y,Qe)=>{Y.formatArgs=Ai;Y.save=Fi;Y.load=wi;Y.useColors=Ei;Y.storage=Oi();Y.destroy=(()=>{let e=!1;return ()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));}})();Y.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Ei(){return typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs)?!0:typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)?!1:typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Ai(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Qe.exports.humanize(this.diff),!this.useColors)return;let r="color: "+this.color;e.splice(1,0,r,"color: inherit");let t=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(t++,s==="%c"&&(n=t));}),e.splice(n,0,r);}Y.log=console.debug||console.log||(()=>{});function Fi(e){try{e?Y.storage.setItem("debug",e):Y.storage.removeItem("debug");}catch{}}function wi(){let e;try{e=Y.storage.getItem("debug");}catch{}return !e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Oi(){try{return localStorage}catch{}}Qe.exports=En()(Y);var{formatters:Ri}=Qe.exports;Ri.j=function(e){try{return JSON.stringify(e)}catch(r){return "[UnexpectedJSONParseError]: "+r.message}};});var jn=g(v=>{Object.defineProperty(v,"__esModule",{value:!0});v.patternPluginFanctory=v.isResultPackage=v.successThen=v.constructRuleCb=v.extractFnArgs=v.paramMatches=v.searchParamsKey=v.pluginHasFunc=v.checkPluginArg=void 0;var Te=B(),ji=Te.__importDefault(st()),Ti=Te.__importDefault(Fe()),N=ze(),Si=Ye(),qi=z(),Yi=ct(),xi=Cn(),Mi=Te.__importDefault(Vt()),et=(0, Mi.default)("jsonql:validator-core:common");function An(e){return !(e.filter(r=>N.KEYWORDS.includes(r)).length>0)}v.checkPluginArg=An;function ki(e){return e[N.PLUGIN_FN_KEY]&&(0, Yi.isFunction)(e[N.PLUGIN_FN_KEY])}v.pluginHasFunc=ki;function Fn(e){let r=wn(e.main.toString());return r.pop(),r}function Ii(e){let r=Fn(e);if(r.length===0)return e;if(!An(r))throw new Ti.default(N.RESERVED_WORD_ERR);return e[N.PARAMS_KEY]=r,e}v.searchParamsKey=Ii;function Ni(e){let r=Fn(e),t=r.length;if(t===0&&!e[N.PARAMS_KEY])return !0;let n=e.params!==void 0&&Array.isArray(e.params)?e.params:!1;return n===!1?!1:t>0&&t===n.length&&!r.filter((s,o)=>s!==n[o]).length}v.paramMatches=Ni;function wn(e){return e.split("(")[1].split(")")[0].split(",").map(r=>r.trim()).filter(r=>r!=="")}v.extractFnArgs=wn;function Di(e,r,t){return (n,s,o)=>Te.__awaiter(this,void 0,void 0,function*(){return Reflect.apply(r,null,[n]).then(On(e,n,s,o)).catch(i=>(et("failed",e,n,i,o),Promise.reject(new ji.default(t,o))))})}v.constructRuleCb=Di;function On(e,r,t,n){return s=>{let o=n[0];et("passed",e,r,s,n),et("lastResult",t);let i={[N.IDX_KEY]:o,[N.VALUE_KEY]:r};if(t===void 0)return {[e]:i};if(e in t){let u=t[e];return Rn(u)?u.includes(i)||t[e].push(i):u[N.IDX_KEY]!==o&&(t[e]=(0, Si.toArray)(t[e]).concat([i])),t}return (0, qi.assign)(t,{[e]:i})}}v.successThen=On;function Rn(e,r=N.IDX_KEY){try{if(Array.isArray(e))return !!e.filter(t=>r in t).length}catch(t){et("isResultPackage",t);}return !1}v.isResultPackage=Rn;function Vi(e){let r=(0, xi.getRegex)(e);return t=>Te.__awaiter(this,void 0,void 0,function*(){return r.test(t)?Promise.resolve(!0):Promise.reject(!1)})}v.patternPluginFanctory=Vi;});var qn=g(tt=>{Object.defineProperty(tt,"__esModule",{value:!0});tt.ValidatorPlugins=void 0;var Sn=B(),Se=Sn.__importDefault(Fe()),A=ze(),Ki=yn(),Tn=hn(),Ee=jn(),Ji=Nt(),Li=Sn.__importDefault(Vt()),ee=(0, Li.default)("jsonql:validator-core:validator-plugin"),Kt=class{constructor(r){this.$version=r,this._plugins=new Map,this._internalPluginNames=[],Ji.plugins.forEach(t=>{let n=t[A.NAME_KEY];this._internalPluginNames.push(n),this._registerPlugin(n,t,!0);});}lookupPlugin(r,t){let n=r[A.PLUGIN_KEY];if(n&&this._plugins.has(n)){let s=this._plugins.get(n);if(s[A.PLUGIN_FN_KEY]&&!s[A.PARAMS_KEY]&&(s[A.VALIDATE_ASYNC_KEY]=(0, Tn.promisify)(s[A.PLUGIN_FN_KEY])),s&&s[A.VALIDATE_ASYNC_KEY]&&!s[A.PARAMS_KEY])return (0, Ee.constructRuleCb)(t,s[A.VALIDATE_ASYNC_KEY],n);if(s&&s[A.PARAMS_KEY]){ee("pluginConfig --->",s),ee("input----------->",r);let o=r;return (0, Ee.constructRuleCb)(t,(0, Tn.promisify)((0, Ki.curryPlugin)(o,s)),n)}}throw ee("lookupPlugin","unable to find",n),new Se.default(`Unable to find plugin: ${n}`)}registerPlugin(r,t){this._registerPlugin(r,t);}_registerExternalPlugin(r,t){this._registerPlugin(r,t,!1,!0);}export(r=!0){let t=[];return this._plugins.forEach((n,s)=>{!this.isBuiltIn(s)&&n.external===r&&t.push(n);}),t}isBuiltIn(r){return this._internalPluginNames.includes(r)}_registerPlugin(r,t,n=!1,s=!1){if(!n){if(this._plugins.has(r))throw new Se.default(`plugin ${r} already existed!`);if(!(0, Ee.pluginHasFunc)(t))throw ee("registerPlugin",A.MAIN_NOT_FOUND_ERR),new Se.default(A.MAIN_NOT_FOUND_ERR);if(t[A.PARAMS_KEY]===void 0)t=(0, Ee.searchParamsKey)(t),ee("auto generate params for plugin",t);else if(t[A.PARAMS_KEY]!==void 0){if(!(0, Ee.checkPluginArg)(t[A.PARAMS_KEY]))throw ee("registerPlugin",A.RESERVED_WORD_ERR),new Se.default(A.RESERVED_WORD_ERR);if(!(0, Ee.paramMatches)(t))throw ee("registerPlugin",A.ARG_NOT_MATCH_ERR),new Se.default(A.ARG_NOT_MATCH_ERR)}}t.name=r,t.external=s,this._plugins.set(r,t);}};tt.ValidatorPlugins=Kt;});var Pt=T(st()),qr=T(Fe()),Yr=T(ut()),xr=T(Ye()),de=T(z()),Ue=T(ct()),Mr=T(er());var gs=Object.create,or=Object.defineProperty,Cs=Object.getOwnPropertyDescriptor,bs=Object.getOwnPropertyNames,vs=Object.getPrototypeOf,Ps=Object.prototype.hasOwnProperty,M=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports),Es=(e,r,t,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let s of bs(r))!Ps.call(e,s)&&s!==t&&or(e,s,{get:()=>r[s],enumerable:!(n=Cs(r,s))||n.enumerable});return e},w=(e,r,t)=>(t=e!=null?gs(vs(e)):{},Es(r||!e||!e.__esModule?or(t,"default",{value:e,enumerable:!0}):t,e)),ke=(e,r,t)=>new Promise((n,s)=>{var o=a=>{try{u(t.next(a));}catch(p){s(p);}},i=a=>{try{u(t.throw(a));}catch(p){s(p);}},u=a=>a.done?n(a.value):Promise.resolve(a.value).then(o,i);u((t=t.apply(e,r)).next());}),ie=M(e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.trueTypeOf=void 0;function r(t){return Object.prototype.toString.call(t).slice(8,-1).toLowerCase()}e.trueTypeOf=r;}),ir=M(e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.formatStr=e.showDeep=e.nil=e.createEvtName=e.parseJson=e.toArray=e.inArray=void 0;var r=ie(),t=(p,c)=>p.includes(c);e.inArray=t;var n=p=>Array.isArray(p)?p:[p];e.toArray=n;var s=(p,c=!0)=>{try{return (0,r.trueTypeOf)(p)==="string"?JSON.parse(p):JSON.parse(JSON.stringify(p))}catch(f){if(c)return p;throw f}};e.parseJson=s;var o=(...p)=>p.join("_");e.createEvtName=o;var i=()=>!1;e.nil=i;var u=p=>{console.dir(p,{depth:null});};e.showDeep=u;function a(p,...c){return p.replace(/{([0-9]+)}/g,(f,l)=>typeof c[l]>"u"?f:c[l])}e.formatStr=a;}),we=M(e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.readOnly=e.objectHasKey=e.arrToObj=e.assign=e.getConfigValue=e.isClass=e.isPlainObject=e.isObject=void 0;var r=ir(),t=ie();function n(f){return (0, t.trueTypeOf)(f)==="object"}e.isObject=n;function s(f){if(n(f)){let l=f.constructor.prototype,d="[Object: null prototype]";return l.toString().substring(0,d.length)===d?!0:n(l)===!1?!1:Reflect.apply(l.hasOwnProperty,l,["isPrototypeOf"])}return !1}e.isPlainObject=s;var o=f=>!s(f);e.isClass=o;var i=(f,l)=>l&&s(l)&&f in l?l[f]:void 0;e.getConfigValue=i;var u=(...f)=>Reflect.apply(Object.assign,Object,f);e.assign=u;var a=(f,l,d={})=>f.map(l).reduce((y,m)=>(0, e.assign)(y,m),d);e.arrToObj=a;var p=(f,l)=>{try{let d=Object.keys(f);return (0,r.inArray)(d,l)}catch{return !1}};e.objectHasKey=p;var c=f=>Object.freeze(f);e.readOnly=c;}),Ie=M(e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.isString=e.flatMap=e.merge=e.curry=void 0;var r=ie(),t=we(),n=(u,...a)=>u.length<=a.length?u(...a):(...p)=>(0, e.curry)(u,...a,...p);e.curry=n;var s=(u,...a)=>{if(!a.length)return u;let p=a.shift();if((0, t.isObject)(u)&&(0, t.isObject)(p))for(let c in p)(0, t.isObject)(p[c])?(u[c]||Object.assign(u,{[c]:{}}),(0, e.merge)(u[c],p[c])):Object.assign(u,{[c]:p[c]});return (0, e.merge)(u,...a)};e.merge=s;function o(u,a){return a||(a=p=>p),u.flatMap(a)}e.flatMap=o;function i(u){return (0, r.trueTypeOf)(u)==="string"}e.isString=i;}),As=M(e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.queuePromisesProcess=e.chainProcessPromises=e.chainPromises=void 0;var r=Ie(),t=we();function n(i,u=!1){return i.reduce((a,p)=>a.then(c=>p.then(f=>u===!1?[...c,f]:(0, r.merge)(c,f))),Promise.resolve(u===!1?[]:(0, t.isPlainObject)(u)?u:{}))}e.chainPromises=n;function s(i,...u){return (...a)=>u.reduce((p,c)=>p.then(f=>c(f)),Reflect.apply(i,null,a))}e.chainProcessPromises=s;function o(i,...u){let a=(0, r.flatMap)(i),p=Reflect.apply(s,null,a);return Reflect.apply(p,null,u)}e.queuePromisesProcess=o;}),dt=M(e=>{Object.defineProperty(e,"__esModule",{value:!0});var r=class extends Error{constructor(...t){super(...t),this.message=t[0],this.detail=t[1],this.className=r.name,Error.captureStackTrace&&Error.captureStackTrace(this,r);}};e.default=r;}),Fs=M(e=>{Object.defineProperty(e,"__esModule",{value:!0});var r=class extends Error{constructor(...t){super(...t),this.message=t[0],this.detail=t[1],this.className=r.name,Error.captureStackTrace&&Error.captureStackTrace(this,r);}};e.default=r;}),ws=M(e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.isAsyncFunction=e.isFunction=void 0;var r=ie(),t=["asyncfunction","function"],n=function(o,i=!1){let u=(0, r.trueTypeOf)(o);return t.includes(u)?!0:(i&&console.error(`Expect to be Function type! Got ${typeof o}`),!1)};e.isFunction=n;function s(o){return (0, r.trueTypeOf)(o)===t[0]}e.isAsyncFunction=s;}),Os=M(e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.getRegex=e.isRegExp=void 0;var r=Ie();function t(s){return s instanceof RegExp}e.isRegExp=t;function n(s){switch(!0){case t(s):return s;case(0, r.isString)(s):return new RegExp(s);default:return !1}}e.getRegex=n;}),Rs=M((e,r)=>{var t=1e3,n=t*60,s=n*60,o=s*24,i=o*7,u=o*365.25;r.exports=function(l,d){d=d||{};var y=typeof l;if(y==="string"&&l.length>0)return a(l);if(y==="number"&&isFinite(l))return d.long?c(l):p(l);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(l))};function a(l){if(l=String(l),!(l.length>100)){var d=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(l);if(d){var y=parseFloat(d[1]),m=(d[2]||"ms").toLowerCase();switch(m){case"years":case"year":case"yrs":case"yr":case"y":return y*u;case"weeks":case"week":case"w":return y*i;case"days":case"day":case"d":return y*o;case"hours":case"hour":case"hrs":case"hr":case"h":return y*s;case"minutes":case"minute":case"mins":case"min":case"m":return y*n;case"seconds":case"second":case"secs":case"sec":case"s":return y*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return y;default:return}}}}function p(l){var d=Math.abs(l);return d>=o?Math.round(l/o)+"d":d>=s?Math.round(l/s)+"h":d>=n?Math.round(l/n)+"m":d>=t?Math.round(l/t)+"s":l+"ms"}function c(l){var d=Math.abs(l);return d>=o?f(l,d,o,"day"):d>=s?f(l,d,s,"hour"):d>=n?f(l,d,n,"minute"):d>=t?f(l,d,t,"second"):l+" ms"}function f(l,d,y,m){var h=d>=y*1.5;return Math.round(l/y)+" "+m+(h?"s":"")}}),js=M((e,r)=>{function t(n){o.debug=o,o.default=o,o.coerce=f,o.disable=a,o.enable=u,o.enabled=p,o.humanize=Rs(),o.destroy=l,Object.keys(n).forEach(d=>{o[d]=n[d];}),o.names=[],o.skips=[],o.formatters={};function s(d){let y=0;for(let m=0;m<d.length;m++)y=(y<<5)-y+d.charCodeAt(m),y|=0;return o.colors[Math.abs(y)%o.colors.length]}o.selectColor=s;function o(d){let y,m=null,h,C;function b(...O){if(!b.enabled)return;let F=b,te=Number(new Date),D=te-(y||te);F.diff=D,F.prev=y,F.curr=te,y=te,O[0]=o.coerce(O[0]),typeof O[0]!="string"&&O.unshift("%O");let J=0;O[0]=O[0].replace(/%([a-zA-Z%])/g,(V,Ae)=>{if(V==="%%")return "%";J++;let Lt=o.formatters[Ae];if(typeof Lt=="function"){let Mn=O[J];V=Lt.call(F,Mn),O.splice(J,1),J--;}return V}),o.formatArgs.call(F,O),(F.log||o.log).apply(F,O);}return b.namespace=d,b.useColors=o.useColors(),b.color=o.selectColor(d),b.extend=i,b.destroy=o.destroy,Object.defineProperty(b,"enabled",{enumerable:!0,configurable:!1,get:()=>m!==null?m:(h!==o.namespaces&&(h=o.namespaces,C=o.enabled(d)),C),set:O=>{m=O;}}),typeof o.init=="function"&&o.init(b),b}function i(d,y){let m=o(this.namespace+(typeof y>"u"?":":y)+d);return m.log=this.log,m}function u(d){o.save(d),o.namespaces=d,o.names=[],o.skips=[];let y,m=(typeof d=="string"?d:"").split(/[\s,]+/),h=m.length;for(y=0;y<h;y++)!m[y]||(d=m[y].replace(/\*/g,".*?"),d[0]==="-"?o.skips.push(new RegExp("^"+d.slice(1)+"$")):o.names.push(new RegExp("^"+d+"$")));}function a(){let d=[...o.names.map(c),...o.skips.map(c).map(y=>"-"+y)].join(",");return o.enable(""),d}function p(d){if(d[d.length-1]==="*")return !0;let y,m;for(y=0,m=o.skips.length;y<m;y++)if(o.skips[y].test(d))return !1;for(y=0,m=o.names.length;y<m;y++)if(o.names[y].test(d))return !0;return !1}function c(d){return d.toString().substring(2,d.toString().length-2).replace(/\.\*\?$/,"*")}function f(d){return d instanceof Error?d.stack||d.message:d}function l(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");}return o.enable(o.load()),o}r.exports=t;}),ar=M((e,r)=>{e.formatArgs=n,e.save=s,e.load=o,e.useColors=t,e.storage=i(),e.destroy=(()=>{let a=!1;return ()=>{a||(a=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));}})(),e.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function t(){return typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs)?!0:typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)?!1:typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function n(a){if(a[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+a[0]+(this.useColors?"%c ":" ")+"+"+r.exports.humanize(this.diff),!this.useColors)return;let p="color: "+this.color;a.splice(1,0,p,"color: inherit");let c=0,f=0;a[0].replace(/%[a-zA-Z%]/g,l=>{l!=="%%"&&(c++,l==="%c"&&(f=c));}),a.splice(f,0,p);}e.log=console.debug||console.log||(()=>{});function s(a){try{a?e.storage.setItem("debug",a):e.storage.removeItem("debug");}catch{}}function o(){let a;try{a=e.storage.getItem("debug");}catch{}return !a&&typeof process<"u"&&"env"in process&&(a=process.env.DEBUG),a}function i(){try{return localStorage}catch{}}r.exports=js()(e);var{formatters:u}=r.exports;u.j=function(a){try{return JSON.stringify(a)}catch(p){return "[UnexpectedJSONParseError]: "+p.message}};}),Ts=w(Ie());function mt(e){return (e+"").trim()!==""?(0, Ts.isString)(e):!1}var Ss=w(ie());function qs(e){return (0, Ss.trueTypeOf)(e)==="boolean"}var Ys=w(ie()),xs="number";function Ms(e){return (0, Ys.trueTypeOf)(e)!==xs?!1:!isNaN(parseFloat(e+""))}function yt(e,r=!0){return e!==void 0&&e!==""&&(e+"").trim()!==""&&(r===!1||r===!0&&e!==null)}var ks=w(we()),tr="|",Is="boolean",Ns="string",Ds="number",ur="array",cr="object",Vs="Array<",Ks="array.<",rr=">",W="validate",G="validateAsync",Ne="plugin",lr="main";var Oe="rules",fr="name";var pt="$$idx",$="$$value";function U(e){switch(e){case Ds:return Ms;case Ns:return mt;case Is:return qs;default:return yt}}var nr={ts:Vs,jsdoc:Ks};function H(e,r){if(Array.isArray(e)){if(!r)return !0;let t;return Array.isArray(r)?t=e.filter(n=>{let s=r.length;for(let o=0;o<s;++o){let i=r[o];if(i===ur&&Array.isArray(n)||i===cr&&(0, ks.isPlainObject)(n)||U(i)(n))return !1}return !0}):t=e.filter(n=>!U(r)(n)),!(t.length>0)}return !1}function sr(e,r="ts"){let t=nr[r];if(!t)throw new Error(`Syntax not supported! ${Object.keys(nr)}`);if(e.indexOf(t)>-1&&e.indexOf(rr)>-1){let n=e.replace(t,"").replace(rr,"");return n.indexOf(tr)?n.split(tr):[n]}return !1}function Js(e){return sr(e)?!1:sr(e,"jsdoc")}function Ls(e,r){let{arg:t}=e;return r.length>1?!t.filter(n=>!(r.length>r.filter(s=>!U(s)(n)).length)).length:r.length>r.filter(n=>!H(t,n)).length}var Us=w(we());function Gs(e,r){if((0, Us.isPlainObject)(e)){if(!r)return !0;if(typeof r=="string")return r in e;if(H(r))return typeof r[0]=="string"?$s(e,r):Bs(e,r)}return !1}function $s(e,r){return !r.filter(t=>!(t in e)).length}function Bs(e,r){return !r.filter(t=>{let n=e[t.name];return !(t.type.length>t.type.filter(s=>{let o;return n!==void 0?(o=Js(s))!==!1?!Ls({arg:n},o):!U(s)(n):!0}).length)}).length}var zs=w(As());function ft(e,r){return e||r}function Ws(e,r,t){return r.map((n,s)=>{let o=[e];switch(t&&t[s]&&o.push(t[s]),n){case ur:return ()=>ft(Reflect.apply(H,null,o),n);case cr:return ()=>ft(Reflect.apply(Gs,null,o),n);default:return ()=>ft(U(n)(e),n)}}).map(n=>()=>ke(this,null,function*(){let s=n();return s===!0?Promise.reject(!0):Promise.resolve(s)}))}function pr(e,r,t){return ke(this,null,function*(){let n=Ws(e,r,t);return new Promise((s,o)=>{(0, zs.queuePromisesProcess)(n,r[0]).then(i=>{o(i);}).catch(i=>{s(i);});})})}function K(e){return (...r)=>ke(this,null,function*(){let t=yield Reflect.apply(e,null,r);return t?Promise.resolve(t):Promise.reject(t)})}w(Ie());w(dt());var Hs=w(Fs());w(dt());var Xs=w(ir()),Zs=w(we());w(ws());w(Os());var Qs=w(ar()),Me=(0, Qs.default)("jsonql:validator-core:common");function ae(e,r,t){return (n,s,o)=>ke(this,null,function*(){return Reflect.apply(r,null,[n]).then(_t(e,n,s,o)).catch(i=>(Me("failed",e,n,i,o),Promise.reject(new Hs.default(t,o))))})}function _t(e,r,t,n){return s=>{let o=n[0];Me("passed",e,r,s,n),Me("lastResult",t);let i={[pt]:o,[$]:r};if(t===void 0)return {[e]:i};if(e in t){let u=t[e];return Re(u)?u.includes(i)||t[e].push(i):u[pt]!==o&&(t[e]=(0, Xs.toArray)(t[e]).concat([i])),t}return (0, Zs.assign)(t,{[e]:i})}}function Re(e,r=pt){try{if(Array.isArray(e))return !!e.filter(t=>r in t).length}catch(t){Me("isResultPackage",t);}return !1}w(dt());var eo=w(ar());(0, eo.default)("jsonql:validator-core:validator-plugin");var dr="Input argument is not an array!";var mr="Exception happened don't know how to handle it",yr="$_spread_arg_",X="$$is_spread_values",ue="RestElement",_r="TsUnionType",hr="TsArrayType",ht="defaultvalue",Cr="TsTypeReference",gt="tstype",br="object",Ct="array",vr="raw";var wr=T(ut()),Je=T(z()),Or=T(Ke()),pe=(0, Or.default)("jsonql:validator:class:fn");function Rr(e){return e.map(r=>{let{name:t}=r,n=ho(r),s=r[gt]||r.type;return pe("createAutomaticRules",t,s),r[Oe]=[ae(t,n,s)],r})}function jr(e,r){return P(this,null,function*(){return mo(e,r).then(_o)})}function Tr(e,r){return yo(e,r).reduce((t,n)=>(0, Je.assign)(t,n),{})}function mo(e,r){return P(this,null,function*(){return e.map(t=>$ in r[t]?r[t][$]:Re(r[t])?{[X]:r[t].map(n=>n[$])}:(pe(`Return result when we couldn't find way to destruct: ${t}`,r[t]),r[t]))})}function yo(e,r){return e.map(t=>{switch(!0){case $ in r[t]:return {[t]:r[t][$]};case Re(r[t]):return {[t]:r[t].map(n=>n[$])};default:return {[t]:r[t]}}})}function _o(e){return P(this,null,function*(){pe("unwrapPreparedValidateResult",e);let r=e.length;if(r===1&&(0, Je.objectHasKey)(e[0],X))return e[0][X];if(Re(e,X)){let t=[];for(let n=0;n<r;++n)X in e[n]?t=t.concat(e[n][X]):t.push(e[n]);return t}return e})}function ho(e){switch(pe("getValidateRules ast",e),e[gt]){case _r:return function(t){return P(this,null,function*(){return pr(t,e.type)})};case(hr):return function(t){return P(this,null,function*(){return K(H)(t,e.types)})};case(Cr):return function(t){return P(this,null,function*(){return K(yt)(t)})};case ue:return function(t){return P(this,null,function*(){return K(U(e.types))(t)})};default:return mt(e.type)?(pe("validation type",e.type),function(t){return P(this,null,function*(){return K(U(e.type))(t)})}):(pe("getValidateRules",e),function(t){return P(this,null,function*(){return K(wr.notEmpty)(t,!0)})})}}function bt(e,r){return r.tstype!==ue&&e===void 0?r[ht]!==void 0?r[ht]:void 0:e}function Sr(e){return [W,G,lr].filter(r=>e[r]!==void 0)}function vt(e){let r=Object.keys(e);return r.length?r[0]:void 0}var kr=T(Ke()),j=(0, kr.default)("jsonql:validator:validator-base"),Le=class{constructor(r,t){this._validatorPluginsInstance=t;this._astWithBaseRules=Rr(r),this._arguments=this._astWithBaseRules.map(n=>n[fr]);}validate(r){let t=this._normalizeArgValues(r);return (0, Mr.queuePromisesProcess)(t,void 0)}prepareArgValues(r){return this._normalizeArgValues(r,!1)}get schema(){return this._schema||this._astWithBaseRules}addValidationRules(r){j("addValidationRules",r);let t={};for(let n in r)t[n]=(0, xr.toArray)(r[n]).map(s=>(0, Ue.isFunction)(s)?this._updateInput(s):s);this._createSchema(t);}_updateInput(r){return {[G]:(0, Ue.isAsyncFunction)(r)?r:K(r)}}_normalizeArgValues(r,t=!0){j("_normalizeArgValues",r);let n=this.schema,s=n.length;if(s===0)return [];if(!H(r))throw j(r),new Pt.default(dr,r);let o=r.length;switch(!0){case o===s:return t===!1?(0, de.arrToObj)(r,(i,u)=>({[n[u].name]:i})):r.map((i,u)=>this._prepareForExecution(i,n[u],u));case o<s:return j("Values pass less than params"),t===!1?(0, de.arrToObj)(n,(i,u)=>{let a=bt(r[u],i);return {[i.name]:a}}):n.map((i,u)=>{let a=bt(r[u],i);return this._prepareForExecution(a,i,u)});case o>s:return j("spread params",o,s),this._processSpreadLikeArg(r,n,t);default:throw new Pt.default(mr,[o,s])}}_processSpreadLikeArg(r,t,n){let s=t.filter(o=>o.tstype===ue)[0];return n===!1?r.map((o,i)=>t[i]?t[i].name!==s.name?{[t[i].name]:o}:{[s.name]:[o]}:{[s.name]:[o]}).reduce((o,i)=>{if(!vt(o))return i;let a=vt(i);return o[a]?(o[a]=o[a].concat(i[a]),o):(0, de.assign)({},o,i)},{}):r.map((o,i)=>{let u=t[i]||(0, de.assign)({},s,{name:`${yr}${i}`});return j("spread param",o,u.name),this._prepareForExecution(o,u,i)})}_prepareForExecution(r,t,n){let{rules:s,required:o,name:i}=t;return s&&s.length?s.map((u,a)=>r===void 0&&!o?(j("skip the validation",o),p=>P(this,null,function*(){return _t(i,r,p,[n,a])(!0)})):p=>P(this,null,function*(){return Reflect.apply(u,null,[r,p,[n,a]]).then(c=>(j("Post rule result",c),c))})):(j("No rules to run"),()=>P(this,null,function*(){return !0}))}_createSchema(r){let t=this._astWithBaseRules;(0, Yr.notEmpty)(r,!0)&&(t=this._applyObjectInput(t,r)),j("_createSchema",t),this._schema=t;}_applyObjectInput(r,t){return r.map(n=>{var o;let s=n.name;if(t[s]){let i=t[s].map(a=>(a.name=s,a)),u=this._transformInput(i,s);u&&u.length&&(n[Oe]=(o=n[Oe])==null?void 0:o.concat(u));}return n})}_transformInput(r,t){return j("_transformInput",r),r.map((n,s)=>{let o=Sr(n);if(o.length>1)throw new Error(`You can only set one rule at a time! We found ${o.join(",")}`);let i=n.name||`customPluginName${s}`;switch(!0){case n[Ne]!==void 0:return j("Should got here ----->",n[Ne]),this._lookupPlugin(n,t);case n[W]!==void 0:return j(`${W} ----->`,n),ae(t,K(n[W]),i);case n[G]!==void 0:return j(`${G} ---->`,n),ae(t,n[G],i);default:throw new qr.default(`unable to find rule for ${t},
            we expect ${Ne}, ${W} or ${G}`)}})}_lookupPlugin(r,t){try{if(this._validatorPluginsInstance)return j("_lookupPlugin --->",r,t),this._validatorPluginsInstance.lookupPlugin(r,t)}catch(n){j("catch _lookupPlugin error",n);}return ae(t,()=>P(this,null,function*(){return Promise.reject(!1)}),"NO_PLUGIN_DUMMY_FUNCTION")}};var Jt=T(qn());var xn=T(Ke()),Yn=(0, xn.default)("jsonql:validator:class:index"),rt=class extends Le{constructor(r,t){super(r,t&&t instanceof Jt.ValidatorPlugins?t:new Jt.ValidatorPlugins(-1));}validate(n){return P(this,arguments,function*(r,t=Ct){return Bt(rt.prototype,this,"validate").call(this,r).then(s=>{switch(t){case vr:return s;case Ct:return this._prepareValidateResultForFuncCall(s);case br:default:return this._prepareValidateResultAsObject(s)}})})}registerPlugin(r,t){this._validatorPluginsInstance&&this._validatorPluginsInstance.registerPlugin(r,t);}_prepareValidateResultForFuncCall(r){return P(this,null,function*(){return Yn("validateResult return as array",this._arguments,r),jr(this._arguments,r)})}_prepareValidateResultAsObject(r){return P(this,null,function*(){return Yn("validateResult return as object",this._arguments,r),Tr(this._arguments,r)})}};

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

            var externalPluginLoader = {};

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

            var generalException = {};

            var hasRequiredGeneralException;

            function requireGeneralException () {
            	if (hasRequiredGeneralException) return generalException;
            	hasRequiredGeneralException = 1;
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
            	generalException.default = GeneralException;
            	return generalException;
            }

            var constants$1 = {};

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
            } (constants$1));

            function commonjsRequire(path) {
            	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
            }

            var plugins$1 = {};

            var lodash = {};

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

            var object = {};

            var common$3 = {};

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

            var hasRequiredObject;

            function requireObject () {
            	if (hasRequiredObject) return object;
            	hasRequiredObject = 1;
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
            	return object;
            }

            var hasRequiredLodash;

            function requireLodash () {
            	if (hasRequiredLodash) return lodash;
            	hasRequiredLodash = 1;
            	(function (exports) {
            		Object.defineProperty(exports, "__esModule", { value: true });
            		exports.isString = exports.flatMap = exports.merge = exports.curry = void 0;
            		const truetypeof_1 = truetypeof;
            		const object_1 = requireObject();
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
            	return lodash;
            }

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
            	const lodash_1 = requireLodash();
            	const general_exception_1 = tslib_1.__importDefault(requireGeneralException());
            	const constants_1 = constants$1;
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

            var common$2 = {};

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

            var isFunction = {};

            var hasRequiredIsFunction;

            function requireIsFunction () {
            	if (hasRequiredIsFunction) return isFunction;
            	hasRequiredIsFunction = 1;
            	Object.defineProperty(isFunction, "__esModule", { value: true });
            	isFunction.isAsyncFunction = isFunction.isFunction = void 0;
            	const truetypeof_1 = truetypeof;
            	const expected = ['asyncfunction', 'function'];
            	/**
            	 * Simple check if the prop is function
            	 * We found situtation where it report as an object but debug output show as [Function]
            	 */
            	const isFunction$1 = function (prop, debug = false) {
            	    const result = (0, truetypeof_1.trueTypeOf)(prop);
            	    if (expected.includes(result)) {
            	        return true;
            	    }
            	    if (debug) {
            	        console.error(`Expect to be Function type! Got ${typeof prop}`);
            	    }
            	    return false;
            	};
            	isFunction.isFunction = isFunction$1;
            	/** finally found a solution to check if something is an async function */
            	function isAsyncFunction(prop) {
            	    return (0, truetypeof_1.trueTypeOf)(prop) === expected[0];
            	}
            	isFunction.isAsyncFunction = isAsyncFunction;
            	return isFunction;
            }

            var regex = {};

            var hasRequiredRegex;

            function requireRegex () {
            	if (hasRequiredRegex) return regex;
            	hasRequiredRegex = 1;
            	Object.defineProperty(regex, "__esModule", { value: true });
            	regex.getRegex = regex.isRegExp = void 0;
            	const lodash_1 = requireLodash();
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

            var src$1 = {exports: {}};

            var browser$2 = {exports: {}};

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

            var common$1;
            var hasRequiredCommon$2;

            function requireCommon$2 () {
            	if (hasRequiredCommon$2) return common$1;
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

            	common$1 = setup;
            	return common$1;
            }

            /* eslint-env browser */

            var hasRequiredBrowser$1;

            function requireBrowser$1 () {
            	if (hasRequiredBrowser$1) return browser$2.exports;
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
            } (browser$2, browser$2.exports));
            	return browser$2.exports;
            }

            var node$1 = {exports: {}};

            var hasFlag$1;
            var hasRequiredHasFlag$1;

            function requireHasFlag$1 () {
            	if (hasRequiredHasFlag$1) return hasFlag$1;
            	hasRequiredHasFlag$1 = 1;

            	hasFlag$1 = (flag, argv = process.argv) => {
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

            	supportsColor_1$1 = {
            		supportsColor: getSupportLevel,
            		stdout: translateLevel(supportsColor(true, tty.isatty(1))),
            		stderr: translateLevel(supportsColor(true, tty.isatty(2)))
            	};
            	return supportsColor_1$1;
            }

            /**
             * Module dependencies.
             */

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

            /**
             * Detect Electron renderer / nwjs process, which is node, but we should
             * treat as a browser.
             */

            var hasRequiredSrc;

            function requireSrc () {
            	if (hasRequiredSrc) return src$1.exports;
            	hasRequiredSrc = 1;
            	(function (module) {
            		if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
            			module.exports = requireBrowser$1();
            		} else {
            			module.exports = requireNode$1();
            		}
            } (src$1));
            	return src$1.exports;
            }

            var hasRequiredCommon$1;

            function requireCommon$1 () {
            	if (hasRequiredCommon$1) return common$2;
            	hasRequiredCommon$1 = 1;
            	Object.defineProperty(common$2, "__esModule", { value: true });
            	common$2.patternPluginFanctory = common$2.isResultPackage = common$2.successThen = common$2.constructRuleCb = common$2.extractFnArgs = common$2.paramMatches = common$2.searchParamsKey = common$2.pluginHasFunc = common$2.checkPluginArg = void 0;
            	const tslib_1 = require$$0;
            	const validation_error_1 = tslib_1.__importDefault(validationError);
            	const general_exception_1 = tslib_1.__importDefault(requireGeneralException());
            	const constants_1 = constants$1;
            	const common_1 = common$3;
            	const object_1 = requireObject();
            	const is_function_1 = requireIsFunction();
            	const regex_1 = requireRegex();
            	const debug_1 = tslib_1.__importDefault(requireSrc());
            	const debug = (0, debug_1.default)('jsonql:validator-core:common');
            	/** check plugin argument against keywords list */
            	function checkPluginArg(params) {
            	    return !(params.filter(param => constants_1.KEYWORDS.includes(param)).length > 0);
            	}
            	common$2.checkPluginArg = checkPluginArg;
            	/** now simply it with just one prop check main */
            	function pluginHasFunc(rule) {
            	    return rule[constants_1.PLUGIN_FN_KEY] && (0, is_function_1.isFunction)(rule[constants_1.PLUGIN_FN_KEY]);
            	}
            	common$2.pluginHasFunc = pluginHasFunc;
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
            	common$2.searchParamsKey = searchParamsKey;
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
            	common$2.paramMatches = paramMatches;
            	/** take a function string and return its argument names */
            	function extractFnArgs(fnStr) {
            	    return fnStr.split('(')[1]
            	        .split(')')[0]
            	        .split(',')
            	        .map(t => t.trim())
            	        .filter(t => t !== '');
            	}
            	common$2.extractFnArgs = extractFnArgs;
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
            	common$2.constructRuleCb = constructRuleCb;
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
            	common$2.successThen = successThen;
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
            	common$2.isResultPackage = isResultPackage;
            	/** If the plugin provide a pattern and we construct a function out of it */
            	function patternPluginFanctory(pattern) {
            	    const regex = (0, regex_1.getRegex)(pattern);
            	    return (value) => tslib_1.__awaiter(this, void 0, void 0, function* () { return regex.test(value) ? Promise.resolve(true) : Promise.reject(false); });
            	}
            	common$2.patternPluginFanctory = patternPluginFanctory;
            	return common$2;
            }

            Object.defineProperty(validatorPlugins, "__esModule", { value: true });
            validatorPlugins.ValidatorPlugins = void 0;
            const tslib_1 = require$$0;
            const general_exception_1 = tslib_1.__importDefault(requireGeneralException());
            const constants_1 = constants$1;
            const plugins_1 = requirePlugins();
            const promisify_1 = requirePromisify();
            const common_1 = requireCommon$1();
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
            validatorPlugins.ValidatorPlugins = ValidatorPlugins;

            Object.defineProperty(externalPluginLoader, "__esModule", { value: true });
            var ExternalPluginLoader_1 = externalPluginLoader.ExternalPluginLoader = void 0;
            // Use this when loading external plugins
            const validator_plugins_1 = validatorPlugins;
            // main
            class ExternalPluginLoader extends validator_plugins_1.ValidatorPlugins {
                /** main method */
                registerExternalPlugin(name, pluginConfig) {
                    this._registerExternalPlugin(name, pluginConfig);
                }
            }
            ExternalPluginLoader_1 = externalPluginLoader.ExternalPluginLoader = ExternalPluginLoader;

            var cloneDeep$1 = {};

            Object.defineProperty(cloneDeep$1, "__esModule", { value: true });
            var cloneDeep_2 = cloneDeep$1.cloneDeep = cloneDeep$1.cloneDeepCheap = void 0;
            const truetypeof_1 = truetypeof;
            // Poorman ...
            const cloneDeepCheap = (obj) => JSON.parse(JSON.stringify(obj));
            cloneDeep$1.cloneDeepCheap = cloneDeepCheap;
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
            cloneDeep_2 = cloneDeep$1.cloneDeep = cloneDeep;

            const SCHEMA_KEY = 'schema';

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

            const debug = debugFn('velocejs:validator:main');
            /**
              Instead of one ast per init
               we now pass the entire ast here
               then get it back via the propertyName
            **/
            class Validators {
                /** main */
                constructor(astMap) {
                    this._validationRules = new Map();
                    this._validators = new Map();
                    this._plugin = new ExternalPluginLoader_1();
                    this._astMap = cloneDeep_2(astMap);
                    for (const propertyName in this._astMap) {
                        this._validators.set(propertyName, new rt(this._astMap[propertyName], this._plugin));
                    }
                }
                /** get the validator */
                getValidator(propertyName) {
                    if (this._validators.has(propertyName)) {
                        const obj = this._validators.get(propertyName);
                        // overload the method here
                        return {
                            addValidationRules: this._addValidationRules(propertyName, obj),
                            validate: obj.validate.bind(obj),
                            // for skipping the validation and just prepare the values
                            prepareArgValues: obj.prepareArgValues.bind(obj)
                        };
                    }
                    throw new _default(`${propertyName} validator is not registered!`);
                }
                /** directly call the addValidationRules with the propertyName */
                addRules(propertyName, rules) {
                    const val = this.getValidator(propertyName);
                    val.addValidationRules(rules);
                    return val; // we return the validator to use
                }
                /** wrapper for ValidatorPlugin registerPlugin method */
                registerPlugin(name, pluginConfig) {
                    // this._appendRules(name, pluginConfig)
                    this._plugin.registerPlugin(name, pluginConfig);
                }
                /** export for contract */
                export() {
                    const schema = {};
                    this._validationRules.forEach((value, propName) => {
                        const obj = this._validators.get(propName);
                        schema[propName] = { [constants$1.RULES_KEY]: value, [SCHEMA_KEY]: obj[SCHEMA_KEY] };
                    });
                    debug('export schema', schema);
                    const plugins = this._plugin.export();
                    debug('plugin configs', plugins);
                    return { schema, plugins };
                }
                /** check if this rule (plugin) can export to the public */
                checkRuleCanExport(plugins) {
                    const externals = plugins.filter((plugin) => plugin.external)
                        .map((plugin) => plugin.name);
                    debug('available externals', externals);
                    // return a method for checking
                    return (rule) => {
                        const { plugin } = rule;
                        if (plugin) {
                            debug('check plugin can export', plugin);
                            return this._plugin.isBuiltIn(plugin) || externals.includes(plugin);
                        }
                        return false;
                    };
                }
                /*
                @TODO
                When to add
                1. when a rule is add we check if this is internal plugin and not mark as `server`
                2. When a rule is insert via loadExtPlugin and the original plugin was not mark as server
              
                IDEA
                we could extract the inline code and store it in file (or just in memeory)
                and insert a new url (e.g. /veloce/plugin) then serve it up to the client
                */
                /** store the rules for later export */
                _appendRules(propertyName, input) {
                    if (this._validationRules.has(propertyName)) {
                        const existingRules = this._validationRules.get(propertyName);
                        for (const propName in existingRules) {
                            if (input[propName]) {
                                // we are going to just store everything and let the contract decided what to pick
                                existingRules[propName] = existingRules[propName].concat(toArray_1(input[propName]));
                            }
                        }
                        this._validationRules.set(propertyName, existingRules);
                    }
                    else {
                        const cleanInput = {};
                        for (const argName in input) {
                            cleanInput[argName] = toArray_1(input[argName]);
                        }
                        debug('adding new rule', input, cleanInput);
                        this._validationRules.set(propertyName, cleanInput);
                    }
                }
                /** overload the Validator addValidationRules */
                _addValidationRules(propertyName, obj) {
                    // @NOTE found a problem here, if we put in the wrong format { name, plugin }
                    // instead of { argName: {plugin}} the editor won't warn this error
                    // and it cause all kinds of problem
                    return (input) => {
                        const _input = this._checkInput(input);
                        this._appendRules(propertyName, _input);
                        return Reflect.apply(obj.addValidationRules, obj, [_input]);
                    };
                }
                /** just to make sure the ValidationRuleRecord is correct */
                _checkInput(input) {
                    const { name } = input;
                    if (name) {
                        const _input = cloneDeep_2(input);
                        delete _input.name;
                        return { [name]: _input };
                    }
                    return input;
                }
            }

            var constants = {};

            Object.defineProperty(constants, "__esModule", { value: true });
            exports.RETURN_AS_RAW = constants.RETURN_AS_RAW = exports.RETURN_AS_ARR = constants.RETURN_AS_ARR = exports.RETURN_AS_OBJ = constants.RETURN_AS_OBJ = constants.TS_TYPE_NAME = constants.TS_TYPE_REF = constants.TS_TYPE_LIT = constants.DEFAULT_VALUE = constants.TS_ARRAY_TYPE = constants.TS_UNION_TYPE = constants.SPREAD_ARG_TYPE = constants.IS_SPREAD_VALUES_KEY = constants.SPREAD_PREFIX = constants.EXCEPTION_CASE_ERR = constants.PARAMS_NOT_ARRAY_ERR = constants.ARGS_NOT_ARRAY_ERR = void 0;
            constants.ARGS_NOT_ARRAY_ERR = `Input argument is not an array!`;
            constants.PARAMS_NOT_ARRAY_ERR = `Parameter is not an array`;
            constants.EXCEPTION_CASE_ERR = `Exception happened don't know how to handle it`;
            // use this to id if the input is spread
            constants.SPREAD_PREFIX = '$_spread_arg_';
            constants.IS_SPREAD_VALUES_KEY = '$$is_spread_values';
            constants.SPREAD_ARG_TYPE = 'RestElement';
            constants.TS_UNION_TYPE = 'TsUnionType';
            constants.TS_ARRAY_TYPE = 'TsArrayType';
            constants.DEFAULT_VALUE = 'defaultvalue';
            // when they type inline along the params
            constants.TS_TYPE_LIT = 'TsTypeLiteral';
            // when pass a type reference we just treat them as object
            constants.TS_TYPE_REF = 'TsTypeReference';
            // this is for us to id what that is
            constants.TS_TYPE_NAME = 'tstype';
            // return result as - default array 
            exports.RETURN_AS_OBJ = constants.RETURN_AS_OBJ = 'object';
            exports.RETURN_AS_ARR = constants.RETURN_AS_ARR = 'array';
            exports.RETURN_AS_RAW = constants.RETURN_AS_RAW = 'raw';

            exports.NAME_KEY = constants$1.NAME_KEY;
            exports.PARAMS_KEY = constants$1.PARAMS_KEY;
            exports.PATTERN_KEY = constants$1.PATTERN_KEY;
            exports.PLUGIN_FN_KEY = constants$1.PLUGIN_FN_KEY;
            exports.PLUGIN_KEY = constants$1.PLUGIN_KEY;
            exports.RULES_KEY = constants$1.RULES_KEY;
            exports.SCHEMA_KEY = SCHEMA_KEY;
            exports.VALIDATE_ASYNC_KEY = constants$1.VALIDATE_ASYNC_KEY;
            exports.VALIDATE_KEY = constants$1.VALIDATE_KEY;
            exports.Validators = Validators;

            Object.defineProperty(exports, '__esModule', { value: true });

}));
