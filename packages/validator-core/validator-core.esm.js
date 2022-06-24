"use strict";var vr=Object.create;var Ue=Object.defineProperty;var Kr=Object.getOwnPropertyDescriptor;var Ir=Object.getOwnPropertyNames;var Mr=Object.getPrototypeOf,Lr=Object.prototype.hasOwnProperty;var h=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports);var Dr=(e,r,n,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of Ir(r))!Lr.call(e,o)&&o!==n&&Ue(e,o,{get:()=>r[o],enumerable:!(t=Kr(r,o))||t.enumerable});return e};var f=(e,r,n)=>(n=e!=null?vr(Mr(e)):{},Dr(r||!e||!e.__esModule?Ue(n,"default",{value:e,enumerable:!0}):n,e));var E=(e,r,n)=>new Promise((t,o)=>{var i=P=>{try{b(n.next(P))}catch(V){o(V)}},u=P=>{try{b(n.throw(P))}catch(V){o(V)}},b=P=>P.done?t(P.value):Promise.resolve(P.value).then(i,u);b((n=n.apply(e,r)).next())});var U=h(Z=>{"use strict";Object.defineProperty(Z,"__esModule",{value:!0});Z.trueTypeOf=void 0;function Vr(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}Z.trueTypeOf=Vr});var ye=h(p=>{"use strict";Object.defineProperty(p,"__esModule",{value:!0});p.formatStr=p.showDeep=p.nil=p.createEvtName=p.parseJson=p.toArray=p.inArray=void 0;var Ur=k(),Gr=(e,r)=>!!e.filter(n=>n===r).length;p.inArray=Gr;var $r=e=>Array.isArray(e)?e:[e];p.toArray=$r;var Br=(e,r=!0)=>{try{return(0,Ur.isString)(e)?JSON.parse(e):JSON.parse(JSON.stringify(e))}catch(n){if(r)return e;throw n}};p.parseJson=Br;var Hr=(...e)=>e.join("_");p.createEvtName=Hr;var zr=()=>!1;p.nil=zr;var Wr=e=>{console.dir(e,{depth:null})};p.showDeep=Wr;function Zr(e,...r){return e.replace(/{([0-9]+)}/g,(n,t)=>typeof r[t]=="undefined"?n:r[t])}p.formatStr=Zr});var Y=h(l=>{"use strict";Object.defineProperty(l,"__esModule",{value:!0});l.readOnly=l.objectHasKey=l.arrToObj=l.assign=l.getConfigValue=l.isPlainObject=l.isObject=void 0;var Xr=ye(),Qr=U();function de(e){return(0,Qr.trueTypeOf)(e)==="object"}l.isObject=de;function Ge(e){if(de(e)){let n=e.constructor.prototype,t="[Object: null prototype]";if(n.toString().substring(0,t.length)===t)return!0;if(de(n)===!1)return!1;try{return Reflect.apply(n.hasOwnProperty,n,["isPrototypeOf"])}catch{return!0}}return!1}l.isPlainObject=Ge;var en=(e,r)=>r&&Ge(r)&&e in r?r[e]:void 0;l.getConfigValue=en;var rn=(...e)=>Reflect.apply(Object.assign,Object,e);l.assign=rn;var nn=(e,r,n={})=>e.map(r).reduce((t,o)=>(0,l.assign)(t,o),n);l.arrToObj=nn;var tn=(e,r)=>{try{let n=Object.keys(e);return(0,Xr.inArray)(n,r)}catch{return!1}};l.objectHasKey=tn;var on=e=>Object.freeze(e);l.readOnly=on});var k=h(g=>{"use strict";Object.defineProperty(g,"__esModule",{value:!0});g.isString=g.flatMap=g.merge=g.curry=void 0;var sn=U(),he=Y(),cn=(e,...r)=>e.length<=r.length?e(...r):(...n)=>(0,g.curry)(e,...r,...n);g.curry=cn;var un=(e,...r)=>{if(!r.length)return e;let n=r.shift();if((0,he.isObject)(e)&&(0,he.isObject)(n))for(let t in n)(0,he.isObject)(n[t])?(e[t]||Object.assign(e,{[t]:{}}),(0,g.merge)(e[t],n[t])):Object.assign(e,{[t]:n[t]});return(0,g.merge)(e,...r)};g.merge=un;function an(e,r){return r||(r=n=>n),e.flatMap(r)}g.flatMap=an;function ln(e){return(0,sn.trueTypeOf)(e)==="string"}g.isString=ln});var nr=h(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.queuePromisesProcess=_.chainProcessPromises=_.chainPromises=void 0;var er=k(),bn=Y();function An(e,r=!1){return e.reduce((n,t)=>n.then(o=>t.then(i=>r===!1?[...o,i]:(0,er.merge)(o,i))),Promise.resolve(r===!1?[]:(0,bn.isPlainObject)(r)?r:{}))}_.chainPromises=An;function rr(e,...r){return(...n)=>r.reduce((t,o)=>t.then(i=>o(i)),Reflect.apply(e,null,n))}_.chainProcessPromises=rr;function Cn(e,...r){let n=(0,er.flatMap)(e),t=Reflect.apply(rr,null,n);return Reflect.apply(t,null,r)}_.queuePromisesProcess=Cn});var ce=h(Ne=>{"use strict";Object.defineProperty(Ne,"__esModule",{value:!0});var J=class extends Error{constructor(...r){super(...r),this.message=r[0],this.detail=r[1],this.className=J.name,Error.captureStackTrace&&Error.captureStackTrace(this,J)}};Ne.default=J});var fr=h(Ke=>{"use strict";Object.defineProperty(Ke,"__esModule",{value:!0});var N=class extends Error{constructor(...r){super(...r),this.message=r[0],this.detail=r[1],this.className=N.name,Error.captureStackTrace&&Error.captureStackTrace(this,N)}};Ke.default=N});var gr=h(v=>{"use strict";Object.defineProperty(v,"__esModule",{value:!0});v.isAsyncFunction=v.isFunction=void 0;var pr=U(),mr=["asyncfunction","function"],Vn=function(e,r=!1){let n=(0,pr.trueTypeOf)(e);return mr.includes(n)?!0:(r&&console.error(`Expect to be Function type! Got ${typeof e}`),!1)};v.isFunction=Vn;function Un(e){return(0,pr.trueTypeOf)(e)===mr[0]}v.isAsyncFunction=Un});var dr=h(K=>{"use strict";Object.defineProperty(K,"__esModule",{value:!0});K.getRegex=K.isRegExp=void 0;var Gn=k();function yr(e){return e instanceof RegExp}K.isRegExp=yr;function $n(e){switch(!0){case yr(e):return e;case(0,Gn.isString)(e):return new RegExp(e);default:return!1}}K.getRegex=$n});var br=h((Ao,hr)=>{var I=1e3,M=I*60,L=M*60,w=L*24,Bn=w*7,Hn=w*365.25;hr.exports=function(e,r){r=r||{};var n=typeof e;if(n==="string"&&e.length>0)return zn(e);if(n==="number"&&isFinite(e))return r.long?Zn(e):Wn(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function zn(e){if(e=String(e),!(e.length>100)){var r=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(!!r){var n=parseFloat(r[1]),t=(r[2]||"ms").toLowerCase();switch(t){case"years":case"year":case"yrs":case"yr":case"y":return n*Hn;case"weeks":case"week":case"w":return n*Bn;case"days":case"day":case"d":return n*w;case"hours":case"hour":case"hrs":case"hr":case"h":return n*L;case"minutes":case"minute":case"mins":case"min":case"m":return n*M;case"seconds":case"second":case"secs":case"sec":case"s":return n*I;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Wn(e){var r=Math.abs(e);return r>=w?Math.round(e/w)+"d":r>=L?Math.round(e/L)+"h":r>=M?Math.round(e/M)+"m":r>=I?Math.round(e/I)+"s":e+"ms"}function Zn(e){var r=Math.abs(e);return r>=w?ae(e,r,w,"day"):r>=L?ae(e,r,L,"hour"):r>=M?ae(e,r,M,"minute"):r>=I?ae(e,r,I,"second"):e+" ms"}function ae(e,r,n,t){var o=r>=n*1.5;return Math.round(e/n)+" "+t+(o?"s":"")}});var Cr=h((Co,Ar)=>{function Xn(e){n.debug=n,n.default=n,n.coerce=P,n.disable=i,n.enable=o,n.enabled=u,n.humanize=br(),n.destroy=V,Object.keys(e).forEach(s=>{n[s]=e[s]}),n.names=[],n.skips=[],n.formatters={};function r(s){let c=0;for(let a=0;a<s.length;a++)c=(c<<5)-c+s.charCodeAt(a),c|=0;return n.colors[Math.abs(c)%n.colors.length]}n.selectColor=r;function n(s){let c,a=null,H,De;function A(...d){if(!A.enabled)return;let T=A,z=Number(new Date),Sr=z-(c||z);T.diff=Sr,T.prev=c,T.curr=z,c=z,d[0]=n.coerce(d[0]),typeof d[0]!="string"&&d.unshift("%O");let W=0;d[0]=d[0].replace(/%([a-zA-Z%])/g,(ge,Jr)=>{if(ge==="%%")return"%";W++;let Ve=n.formatters[Jr];if(typeof Ve=="function"){let Nr=d[W];ge=Ve.call(T,Nr),d.splice(W,1),W--}return ge}),n.formatArgs.call(T,d),(T.log||n.log).apply(T,d)}return A.namespace=s,A.useColors=n.useColors(),A.color=n.selectColor(s),A.extend=t,A.destroy=n.destroy,Object.defineProperty(A,"enabled",{enumerable:!0,configurable:!1,get:()=>a!==null?a:(H!==n.namespaces&&(H=n.namespaces,De=n.enabled(s)),De),set:d=>{a=d}}),typeof n.init=="function"&&n.init(A),A}function t(s,c){let a=n(this.namespace+(typeof c>"u"?":":c)+s);return a.log=this.log,a}function o(s){n.save(s),n.namespaces=s,n.names=[],n.skips=[];let c,a=(typeof s=="string"?s:"").split(/[\s,]+/),H=a.length;for(c=0;c<H;c++)!a[c]||(s=a[c].replace(/\*/g,".*?"),s[0]==="-"?n.skips.push(new RegExp("^"+s.slice(1)+"$")):n.names.push(new RegExp("^"+s+"$")))}function i(){let s=[...n.names.map(b),...n.skips.map(b).map(c=>"-"+c)].join(",");return n.enable(""),s}function u(s){if(s[s.length-1]==="*")return!0;let c,a;for(c=0,a=n.skips.length;c<a;c++)if(n.skips[c].test(s))return!1;for(c=0,a=n.names.length;c<a;c++)if(n.names[c].test(s))return!0;return!1}function b(s){return s.toString().substring(2,s.toString().length-2).replace(/\.\*\?$/,"*")}function P(s){return s instanceof Error?s.stack||s.message:s}function V(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Ar.exports=Xn});var Ie=h((y,le)=>{y.formatArgs=et;y.save=rt;y.load=nt;y.useColors=Qn;y.storage=tt();y.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();y.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Qn(){return typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs)?!0:typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)?!1:typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function et(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+le.exports.humanize(this.diff),!this.useColors)return;let r="color: "+this.color;e.splice(1,0,r,"color: inherit");let n=0,t=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(t=n))}),e.splice(t,0,r)}y.log=console.debug||console.log||(()=>{});function rt(e){try{e?y.storage.setItem("debug",e):y.storage.removeItem("debug")}catch{}}function nt(){let e;try{e=y.storage.getItem("debug")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function tt(){try{return localStorage}catch{}}le.exports=Cr()(y);var{formatters:ot}=le.exports;ot.j=function(e){try{return JSON.stringify(e)}catch(r){return"[UnexpectedJSONParseError]: "+r.message}}});var $e=f(k());function be(e){return(e+"").trim()!==""?(0,$e.isString)(e):!1}function Ae(e){return e!=null&&typeof e=="boolean"}var Be=f(U());function Ce(e){return(0,Be.trueTypeOf)(e)!=="number"?!1:!isNaN(parseFloat(e+""))}function fn(e){console.log("@TODO checkInteger",e)}function pn(e){console.log("@TODO checkFloat",e)}function mn(e){console.log("@TODO check unsigned",e)}function Pe(e,r=!0){return e!==void 0&&e!==""&&(e+"").trim()!==""&&(r===!1||r===!0&&e!==null)}var Qe=f(Y());var X="|",Ee="boolean",_e="string",xe="number",j="array",q="object",Te="Array<",Fe="array.<",Q=">",He="validate",S="validateAsync",ee="plugin",F="main",ze="pattern",We="rules",Re="name",m="params",G="$$idx",we="$$value",$="Your plugin config argument contains reserved keywords",Oe="Your params doesn't matching your main argument list",ke="Can not find 'main' method in your plugin config",Ye=[m,ze,He,S,ee,We,"name","type","types","server","tstype","value","optional","tmp","pos","lastResult"];function C(e){switch(e){case xe:return Ce;case _e:return be;case Ee:return Ae;default:return Pe}}var Ze={ts:Te,jsdoc:Fe};function R(e,r){if(Array.isArray(e)){if(!r)return!0;let n;return Array.isArray(r)?n=e.filter(t=>{let o=r.length;for(let i=0;i<o;++i){let u=r[i];if(u===j&&Array.isArray(t)||u===q&&(0,Qe.isPlainObject)(t)||C(u)(t))return!1}return!0}):n=e.filter(t=>!C(r)(t)),!(n.length>0)}return!1}function Xe(e,r="ts"){let n=Ze[r];if(!n)throw new Error(`Syntax not supported! ${Object.keys(Ze)}`);if(e.indexOf(n)>-1&&e.indexOf(Q)>-1){let t=e.replace(n,"").replace(Q,"");return t.indexOf(X)?t.split(X):[t]}return!1}function je(e){return Xe(e)?!1:Xe(e,"jsdoc")}function qe(e,r){let{arg:n}=e;return r.length>1?!n.filter(t=>!(r.length>r.filter(o=>!C(o)(t)).length)).length:r.length>r.filter(t=>!R(n,t)).length}var Se=f(Y());function B(e,r){if((0,Se.isPlainObject)(e)){if(!r)return!0;if(typeof r=="string")return r in e;if(R(r))return typeof r[0]=="string"?gn(e,r):yn(e,r)}return!1}function gn(e,r){return!r.filter(n=>!(n in e)).length}function yn(e,r){return!r.filter(n=>{let t=e[n.name];return!(n.type.length>n.type.filter(o=>{let i;return t!==void 0?(i=je(o))!==!1?!qe({arg:t},i):!C(o)(t):!0}).length)}).length}var dn=function(e){let{arg:r,param:n}=e,t=[r];return Array.isArray(n.keys)&&n.keys.length&&t.push(n.keys),Reflect.apply(B,null,t)},hn=function(e){return(0,Se.isPlainObject)(e)?!Object.keys(e).length:!1};var tr=f(nr());function Je(e,r){return e||r}function or(e,r,n){return r.map((t,o)=>{let i=[e];switch(n&&n[o]&&i.push(n[o]),t){case j:return()=>Je(Reflect.apply(R,null,i),t);case q:return()=>Je(Reflect.apply(B,null,i),t);default:return()=>Je(C(t)(e),t)}}).map(t=>()=>E(this,null,function*(){let o=t();return o===!0?Promise.reject(!0):Promise.resolve(o)}))}function Pn(e,r,n){return E(this,null,function*(){let t=or(e,r,n);return new Promise((o,i)=>{(0,tr.queuePromisesProcess)(t,r[0]).then(u=>{i(u)}).catch(u=>{o(u)})})})}function En(e,r){let n=r.length;for(let t=0;t<n;++t){let o=r[t];switch(o){case j:if(R(e))return!0;break;case q:if(B(e))return!0;break;default:if(C(o)(e))return!0}}return!1}function re(e){return(...r)=>E(this,null,function*(){let n=yield Reflect.apply(e,null,r);return n?Promise.resolve(n):Promise.reject(n)})}function _n(e){return(...r)=>E(this,null,function*(){let n=yield Reflect.apply(e,null,r);return n?Promise.reject(n):Promise.resolve(n)})}function x(e){return typeof e=="string"?e.length:e}var xn="moreThan";function Tn(e,r){return x(r)>e}var ne={name:xn,main:Tn,params:["num"]};var Fn="lessThan";function Rn(e,r){return x(r)<e}var te={name:Fn,main:Rn,params:["num"]};var wn="between";function On(e,r,n){return te.main(e,n)&&ne.main(r,n)}var sr={main:On,name:wn,params:["max","min"]};var kn="email";function Yn(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)}var ir={main:Yn,name:kn};var jn="int";function qn(e){return Number.isInteger(e)}var cr={name:jn,main:qn};var Sn="lessThanEqual";function Jn(e,r){return x(r)<=e}var oe={name:Sn,main:Jn,params:["num"]};var Nn="moreThanEqual";function vn(e,r){return x(r)>=e}var se={name:Nn,main:vn,params:["num"]};var Kn="unit";function In(e){return Number.isInteger(e)&&e>=0}var ur={name:Kn,main:In};var Mn="main";function Ln(e,r,n){return oe.main(e,n)&&se.main(r,n)}var ar={name:Mn,main:Ln,params:["max","min"]};var ie=[sr,ir,cr,oe,te,se,ne,ur,ar];var lr=f(k()),ue=f(ce());function ve(e,r){let{plugin:n}=e;if(n){let t=r[m];if(t){if(!Dn(e,t))throw new ue.default(`Expected params: ${t.join(",")} not found!`);let o=t.map(i=>e[i]);return Reflect.apply((0,lr.curry)(r.main),null,o)}else throw new ue.default(`This plugin ${r.name} can not be curry`)}throw new ue.default("Unable to find plugin in config")}function Dn(e,r){return r.filter(n=>e[n]).length===r.length}var Pr=f(fr()),Er=f(ce());var _r=f(ye()),xr=f(Y()),Tr=f(gr()),Fr=f(dr()),Rr=f(Ie()),fe=(0,Rr.default)("jsonql:validator-core:common");function pe(e){return!(e.filter(r=>Ye.includes(r)).length>0)}function Me(e){return e[F]&&(0,Tr.isFunction)(e[F])}function wr(e){let r=st(e.main.toString());return r.pop(),r}function Or(e){let r=wr(e);if(r.length===0)return e;if(!pe(r))throw new Er.default($);return e[m]=r,e}function kr(e){let r=wr(e),n=r.length;if(n===0&&!e[m])return!0;let t=e.params!==void 0&&Array.isArray(e.params)?e.params:!1;return t===!1?!1:n>0&&n===t.length&&!r.filter((o,i)=>o!==t[i]).length}function st(e){return e.split("(")[1].split(")")[0].split(",").map(r=>r.trim()).filter(r=>r!=="")}function me(e,r,n){return(t,o,i)=>E(this,null,function*(){return Reflect.apply(r,null,[t]).then(Yr(e,t,o,i)).catch(u=>(fe("failed",e,t,u,i),Promise.reject(new Pr.default(n,i))))})}function Yr(e,r,n,t){return o=>{let i=t[0];fe("passed",e,r,o,t),fe("lastResult",n);let u={[G]:i,[we]:r};if(n===void 0)return{[e]:u};if(e in n){let b=n[e];return jr(b)?b.includes(u)||n[e].push(u):b[G]!==i&&(n[e]=(0,_r.toArray)(n[e]).concat([u])),n}return(0,xr.assign)(n,{[e]:u})}}function jr(e,r=G){try{if(Array.isArray(e))return!!e.filter(n=>r in n).length}catch(n){fe("isResultPackage",n)}return!1}function it(e){let r=(0,Fr.getRegex)(e);return n=>E(this,null,function*(){return r.test(n)?Promise.resolve(!0):Promise.reject(!1)})}var D=f(ce());var qr=f(Ie()),O=(0,qr.default)("jsonql:validator-core:validator-plugin"),Le=class{constructor(r){this.$version=r;this._plugins=new Map;this._internalPluginNames=[];ie.forEach(n=>{let t=n[Re];this._internalPluginNames.push(t),this._registerPlugin(t,n,!0)})}lookupPlugin(r,n){let t=r[ee];if(t&&this._plugins.has(t)){let o=this._plugins.get(t);if(o[F]&&!o[m]&&(o[S]=re(o[F])),o&&o[S]&&!o[m])return me(n,o[S],t);if(o&&o[m])return O("pluginConfig --->",o),O("input----------->",r),me(n,re(ve(r,o)),t)}throw O("lookupPlugin","unable to find",t),new D.default(`Unable to find plugin: ${t}`)}registerPlugin(r,n){this._registerPlugin(r,n)}_registerExternalPlugin(r,n){this._registerPlugin(r,n,!1,!0)}export(r=!0){let n=[];return this._plugins.forEach((t,o)=>{!this.isBuiltIn(o)&&t.external===r&&n.push(t)}),n}isBuiltIn(r){return this._internalPluginNames.includes(r)}_registerPlugin(r,n,t=!1,o=!1){if(!t){if(this._plugins.has(r))throw new D.default(`plugin ${r} already existed!`);if(!Me(n))throw O("registerPlugin",ke),new D.default(ke);if(n[m]===void 0)n=Or(n),O("auto generate params for plugin",n);else if(n[m]!==void 0){if(!pe(n[m]))throw O("registerPlugin",$),new D.default($);if(!kr(n))throw O("registerPlugin",Oe),new D.default(Oe)}}n.name=r,n.external=o,this._plugins.set(r,n)}};export{Te as ARRAY_TS_TYPE_LFT,j as ARRAY_TYPE,Fe as ARRAY_TYPE_LFT,Q as ARRAY_TYPE_RGT,Ee as BOOLEAN_TYPE,G as IDX_KEY,Ye as KEYWORDS,Re as NAME_KEY,xe as NUMBER_TYPE,q as OBJECT_TYPE,X as OR_SEPERATOR,m as PARAMS_KEY,ze as PATTERN_KEY,F as PLUGIN_FN_KEY,ee as PLUGIN_KEY,We as RULES_KEY,_e as STRING_TYPE,S as VALIDATE_ASYNC_KEY,He as VALIDATE_KEY,we as VALUE_KEY,Le as ValidatorPlugins,qe as arrayTypeHandler,Pe as checkAny,R as checkArray,Ae as checkBoolean,pn as checkFloat,fn as checkInteger,Ce as checkNumber,B as checkObject,pe as checkPluginArg,be as checkString,Pn as checkUnion,En as checkUnionSync,mn as checkUnsigned,C as combineCheck,me as constructRuleCb,ve as curryPlugin,or as generateReversePromisesFn,je as isArrayLike,hn as isEmptyObject,jr as isResultPackage,dn as objectTypeHandler,it as patternPluginFanctory,Me as pluginHasFunc,ie as plugins,re as promisify,_n as reversePromisifyResult,Yr as successThen};
/*!
 * More accurately check the type of a JavaScript object
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 */
//# sourceMappingURL=validator-core.esm.js.map
