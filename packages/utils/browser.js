(()=>{var ni=typeof global=="object"&&global&&global.Object===Object&&global,Vt=ni;var ai=typeof self=="object"&&self&&self.Object===Object&&self,ii=Vt||ai||Function("return this")(),_=ii;var si=_.Symbol,S=si;var ie=Object.prototype,pi=ie.hasOwnProperty,fi=ie.toString,Ft=S?S.toStringTag:void 0;function ci(t){var r=pi.call(t,Ft),e=t[Ft];try{t[Ft]=void 0;var o=!0}catch{}var n=fi.call(t);return o&&(r?t[Ft]=e:delete t[Ft]),n}var se=ci;var mi=Object.prototype,ui=mi.toString;function li(t){return ui.call(t)}var pe=li;var _i="[object Null]",di="[object Undefined]",fe=S?S.toStringTag:void 0;function Ei(t){return t==null?t===void 0?di:_i:fe&&fe in Object(t)?se(t):pe(t)}var P=Ei;function xi(t){return t!=null&&typeof t=="object"}var y=xi;var Ai="[object Number]";function gi(t){return typeof t=="number"||y(t)&&P(t)==Ai}var ce=gi;function yi(t){return ce(t)&&t!=+t}var me=yi;var hi=Array.isArray,d=hi;var Ti="[object String]";function Pi(t){return typeof t=="string"||!d(t)&&y(t)&&P(t)==Ti}var v=Pi;function Oi(t,r){return function(e){return t(r(e))}}var zt=Oi;var Ri=zt(Object.getPrototypeOf,Object),mt=Ri;var Ni="[object Object]",Si=Function.prototype,bi=Object.prototype,ue=Si.toString,Ii=bi.hasOwnProperty,Ci=ue.call(Object);function vi(t){if(!y(t)||P(t)!=Ni)return!1;var r=mt(t);if(r===null)return!0;var e=Ii.call(r,"constructor")&&r.constructor;return typeof e=="function"&&e instanceof e&&ue.call(e)==Ci}var I=vi;function Li(){this.__data__=[],this.size=0}var le=Li;function Mi(t,r){return t===r||t!==t&&r!==r}var Y=Mi;function wi(t,r){for(var e=t.length;e--;)if(Y(t[e][0],r))return e;return-1}var J=wi;var Di=Array.prototype,Fi=Di.splice;function Yi(t){var r=this.__data__,e=J(r,t);if(e<0)return!1;var o=r.length-1;return e==o?r.pop():Fi.call(r,e,1),--this.size,!0}var _e=Yi;function Ki(t){var r=this.__data__,e=J(r,t);return e<0?void 0:r[e][1]}var de=Ki;function Ui(t){return J(this.__data__,t)>-1}var Ee=Ui;function Gi(t,r){var e=this.__data__,o=J(e,t);return o<0?(++this.size,e.push([t,r])):e[o][1]=r,this}var xe=Gi;function ut(t){var r=-1,e=t==null?0:t.length;for(this.clear();++r<e;){var o=t[r];this.set(o[0],o[1])}}ut.prototype.clear=le;ut.prototype.delete=_e;ut.prototype.get=de;ut.prototype.has=Ee;ut.prototype.set=xe;var q=ut;function Bi(){this.__data__=new q,this.size=0}var Ae=Bi;function Hi(t){var r=this.__data__,e=r.delete(t);return this.size=r.size,e}var ge=Hi;function ji(t){return this.__data__.get(t)}var ye=ji;function Wi(t){return this.__data__.has(t)}var he=Wi;function Ji(t){var r=typeof t;return t!=null&&(r=="object"||r=="function")}var A=Ji;var qi="[object AsyncFunction]",Vi="[object Function]",zi="[object GeneratorFunction]",Qi="[object Proxy]";function Xi(t){if(!A(t))return!1;var r=P(t);return r==Vi||r==zi||r==qi||r==Qi}var lt=Xi;var $i=_["__core-js_shared__"],Qt=$i;var Te=function(){var t=/[^.]+$/.exec(Qt&&Qt.keys&&Qt.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function ki(t){return!!Te&&Te in t}var Pe=ki;var Zi=Function.prototype,ts=Zi.toString;function rs(t){if(t!=null){try{return ts.call(t)}catch{}try{return t+""}catch{}}return""}var B=rs;var es=/[\\^$.*+?()[\]{}|]/g,os=/^\[object .+?Constructor\]$/,ns=Function.prototype,as=Object.prototype,is=ns.toString,ss=as.hasOwnProperty,ps=RegExp("^"+is.call(ss).replace(es,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function fs(t){if(!A(t)||Pe(t))return!1;var r=lt(t)?ps:os;return r.test(B(t))}var Oe=fs;function cs(t,r){return t?.[r]}var Re=cs;function ms(t,r){var e=Re(t,r);return Oe(e)?e:void 0}var C=ms;var us=C(_,"Map"),V=us;var ls=C(Object,"create"),H=ls;function _s(){this.__data__=H?H(null):{},this.size=0}var Ne=_s;function ds(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r}var Se=ds;var Es="__lodash_hash_undefined__",xs=Object.prototype,As=xs.hasOwnProperty;function gs(t){var r=this.__data__;if(H){var e=r[t];return e===Es?void 0:e}return As.call(r,t)?r[t]:void 0}var be=gs;var ys=Object.prototype,hs=ys.hasOwnProperty;function Ts(t){var r=this.__data__;return H?r[t]!==void 0:hs.call(r,t)}var Ie=Ts;var Ps="__lodash_hash_undefined__";function Os(t,r){var e=this.__data__;return this.size+=this.has(t)?0:1,e[t]=H&&r===void 0?Ps:r,this}var Ce=Os;function _t(t){var r=-1,e=t==null?0:t.length;for(this.clear();++r<e;){var o=t[r];this.set(o[0],o[1])}}_t.prototype.clear=Ne;_t.prototype.delete=Se;_t.prototype.get=be;_t.prototype.has=Ie;_t.prototype.set=Ce;var Dr=_t;function Rs(){this.size=0,this.__data__={hash:new Dr,map:new(V||q),string:new Dr}}var ve=Rs;function Ns(t){var r=typeof t;return r=="string"||r=="number"||r=="symbol"||r=="boolean"?t!=="__proto__":t===null}var Le=Ns;function Ss(t,r){var e=t.__data__;return Le(r)?e[typeof r=="string"?"string":"hash"]:e.map}var z=Ss;function bs(t){var r=z(this,t).delete(t);return this.size-=r?1:0,r}var Me=bs;function Is(t){return z(this,t).get(t)}var we=Is;function Cs(t){return z(this,t).has(t)}var De=Cs;function vs(t,r){var e=z(this,t),o=e.size;return e.set(t,r),this.size+=e.size==o?0:1,this}var Fe=vs;function dt(t){var r=-1,e=t==null?0:t.length;for(this.clear();++r<e;){var o=t[r];this.set(o[0],o[1])}}dt.prototype.clear=ve;dt.prototype.delete=Me;dt.prototype.get=we;dt.prototype.has=De;dt.prototype.set=Fe;var ot=dt;var Ls=200;function Ms(t,r){var e=this.__data__;if(e instanceof q){var o=e.__data__;if(!V||o.length<Ls-1)return o.push([t,r]),this.size=++e.size,this;e=this.__data__=new ot(o)}return e.set(t,r),this.size=e.size,this}var Ye=Ms;function Et(t){var r=this.__data__=new q(t);this.size=r.size}Et.prototype.clear=Ae;Et.prototype.delete=ge;Et.prototype.get=ye;Et.prototype.has=he;Et.prototype.set=Ye;var Q=Et;var ws=function(){try{var t=C(Object,"defineProperty");return t({},"",{}),t}catch{}}(),xt=ws;function Ds(t,r,e){r=="__proto__"&&xt?xt(t,r,{configurable:!0,enumerable:!0,value:e,writable:!0}):t[r]=e}var K=Ds;function Fs(t,r,e){(e!==void 0&&!Y(t[r],e)||e===void 0&&!(r in t))&&K(t,r,e)}var Yt=Fs;function Ys(t){return function(r,e,o){for(var n=-1,a=Object(r),s=o(r),i=s.length;i--;){var p=s[t?i:++n];if(e(a[p],p,a)===!1)break}return r}}var Ke=Ys;var Ks=Ke(),Xt=Ks;var He=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Ue=He&&typeof module=="object"&&module&&!module.nodeType&&module,Us=Ue&&Ue.exports===He,Ge=Us?_.Buffer:void 0,Be=Ge?Ge.allocUnsafe:void 0;function Gs(t,r){if(r)return t.slice();var e=t.length,o=Be?Be(e):new t.constructor(e);return t.copy(o),o}var je=Gs;var Bs=_.Uint8Array,At=Bs;function Hs(t){var r=new t.constructor(t.byteLength);return new At(r).set(new At(t)),r}var We=Hs;function js(t,r){var e=r?We(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.length)}var Je=js;function Ws(t,r){var e=-1,o=t.length;for(r||(r=Array(o));++e<o;)r[e]=t[e];return r}var gt=Ws;var qe=Object.create,Js=function(){function t(){}return function(r){if(!A(r))return{};if(qe)return qe(r);t.prototype=r;var e=new t;return t.prototype=void 0,e}}(),X=Js;var qs=Object.prototype;function Vs(t){var r=t&&t.constructor,e=typeof r=="function"&&r.prototype||qs;return t===e}var yt=Vs;function zs(t){return typeof t.constructor=="function"&&!yt(t)?X(mt(t)):{}}var Ve=zs;var Qs="[object Arguments]";function Xs(t){return y(t)&&P(t)==Qs}var Fr=Xs;var ze=Object.prototype,$s=ze.hasOwnProperty,ks=ze.propertyIsEnumerable,Zs=Fr(function(){return arguments}())?Fr:function(t){return y(t)&&$s.call(t,"callee")&&!ks.call(t,"callee")},j=Zs;var tp=9007199254740991;function rp(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=tp}var ht=rp;function ep(t){return t!=null&&ht(t.length)&&!lt(t)}var M=ep;function op(t){return y(t)&&M(t)}var Qe=op;function np(){return!1}var Xe=np;var Ze=typeof exports=="object"&&exports&&!exports.nodeType&&exports,$e=Ze&&typeof module=="object"&&module&&!module.nodeType&&module,ap=$e&&$e.exports===Ze,ke=ap?_.Buffer:void 0,ip=ke?ke.isBuffer:void 0,sp=ip||Xe,nt=sp;var pp="[object Arguments]",fp="[object Array]",cp="[object Boolean]",mp="[object Date]",up="[object Error]",lp="[object Function]",_p="[object Map]",dp="[object Number]",Ep="[object Object]",xp="[object RegExp]",Ap="[object Set]",gp="[object String]",yp="[object WeakMap]",hp="[object ArrayBuffer]",Tp="[object DataView]",Pp="[object Float32Array]",Op="[object Float64Array]",Rp="[object Int8Array]",Np="[object Int16Array]",Sp="[object Int32Array]",bp="[object Uint8Array]",Ip="[object Uint8ClampedArray]",Cp="[object Uint16Array]",vp="[object Uint32Array]",E={};E[Pp]=E[Op]=E[Rp]=E[Np]=E[Sp]=E[bp]=E[Ip]=E[Cp]=E[vp]=!0;E[pp]=E[fp]=E[hp]=E[cp]=E[Tp]=E[mp]=E[up]=E[lp]=E[_p]=E[dp]=E[Ep]=E[xp]=E[Ap]=E[gp]=E[yp]=!1;function Lp(t){return y(t)&&ht(t.length)&&!!E[P(t)]}var to=Lp;function Mp(t){return function(r){return t(r)}}var ro=Mp;var eo=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Kt=eo&&typeof module=="object"&&module&&!module.nodeType&&module,wp=Kt&&Kt.exports===eo,Yr=wp&&Vt.process,Dp=function(){try{var t=Kt&&Kt.require&&Kt.require("util").types;return t||Yr&&Yr.binding&&Yr.binding("util")}catch{}}(),Kr=Dp;var oo=Kr&&Kr.isTypedArray,Fp=oo?ro(oo):to,Tt=Fp;function Yp(t,r){if(!(r==="constructor"&&typeof t[r]=="function")&&r!="__proto__")return t[r]}var Ut=Yp;var Kp=Object.prototype,Up=Kp.hasOwnProperty;function Gp(t,r,e){var o=t[r];(!(Up.call(t,r)&&Y(o,e))||e===void 0&&!(r in t))&&K(t,r,e)}var $t=Gp;function Bp(t,r,e,o){var n=!e;e||(e={});for(var a=-1,s=r.length;++a<s;){var i=r[a],p=o?o(e[i],t[i],i,e,t):void 0;p===void 0&&(p=t[i]),n?K(e,i,p):$t(e,i,p)}return e}var no=Bp;function Hp(t,r){for(var e=-1,o=Array(t);++e<t;)o[e]=r(e);return o}var ao=Hp;var jp=9007199254740991,Wp=/^(?:0|[1-9]\d*)$/;function Jp(t,r){var e=typeof t;return r=r??jp,!!r&&(e=="number"||e!="symbol"&&Wp.test(t))&&t>-1&&t%1==0&&t<r}var U=Jp;var qp=Object.prototype,Vp=qp.hasOwnProperty;function zp(t,r){var e=d(t),o=!e&&j(t),n=!e&&!o&&nt(t),a=!e&&!o&&!n&&Tt(t),s=e||o||n||a,i=s?ao(t.length,String):[],p=i.length;for(var f in t)(r||Vp.call(t,f))&&!(s&&(f=="length"||n&&(f=="offset"||f=="parent")||a&&(f=="buffer"||f=="byteLength"||f=="byteOffset")||U(f,p)))&&i.push(f);return i}var kt=zp;function Qp(t){var r=[];if(t!=null)for(var e in Object(t))r.push(e);return r}var io=Qp;var Xp=Object.prototype,$p=Xp.hasOwnProperty;function kp(t){if(!A(t))return io(t);var r=yt(t),e=[];for(var o in t)o=="constructor"&&(r||!$p.call(t,o))||e.push(o);return e}var so=kp;function Zp(t){return M(t)?kt(t,!0):so(t)}var Pt=Zp;function tf(t){return no(t,Pt(t))}var po=tf;function rf(t,r,e,o,n,a,s){var i=Ut(t,e),p=Ut(r,e),f=s.get(p);if(f){Yt(t,e,f);return}var c=a?a(i,p,e+"",t,r,s):void 0,m=c===void 0;if(m){var u=d(p),l=!u&&nt(p),x=!u&&!l&&Tt(p);c=p,u||l||x?d(i)?c=i:Qe(i)?c=gt(i):l?(m=!1,c=je(p,!0)):x?(m=!1,c=Je(p,!0)):c=[]:I(p)||j(p)?(c=i,j(i)?c=po(i):(!A(i)||lt(i))&&(c=Ve(p))):m=!1}m&&(s.set(p,c),n(c,p,o,a,s),s.delete(p)),Yt(t,e,c)}var fo=rf;function co(t,r,e,o,n){t!==r&&Xt(r,function(a,s){if(n||(n=new Q),A(a))fo(t,r,s,e,co,o,n);else{var i=o?o(Ut(t,s),a,s+"",t,r,n):void 0;i===void 0&&(i=a),Yt(t,s,i)}},Pt)}var mo=co;function ef(t){return t}var $=ef;function of(t,r,e){switch(e.length){case 0:return t.call(r);case 1:return t.call(r,e[0]);case 2:return t.call(r,e[0],e[1]);case 3:return t.call(r,e[0],e[1],e[2])}return t.apply(r,e)}var Ot=of;var uo=Math.max;function nf(t,r,e){return r=uo(r===void 0?t.length-1:r,0),function(){for(var o=arguments,n=-1,a=uo(o.length-r,0),s=Array(a);++n<a;)s[n]=o[r+n];n=-1;for(var i=Array(r+1);++n<r;)i[n]=o[n];return i[r]=e(s),Ot(t,this,i)}}var lo=nf;function af(t){return function(){return t}}var _o=af;var sf=xt?function(t,r){return xt(t,"toString",{configurable:!0,enumerable:!1,value:_o(r),writable:!0})}:$,Eo=sf;var pf=800,ff=16,cf=Date.now;function mf(t){var r=0,e=0;return function(){var o=cf(),n=ff-(o-e);if(e=o,n>0){if(++r>=pf)return arguments[0]}else r=0;return t.apply(void 0,arguments)}}var Zt=mf;var uf=Zt(Eo),tr=uf;function lf(t,r){return tr(lo(t,r,$),t+"")}var xo=lf;function _f(t,r,e){if(!A(e))return!1;var o=typeof r;return(o=="number"?M(e)&&U(r,e.length):o=="string"&&r in e)?Y(e[r],t):!1}var Ao=_f;function df(t){return xo(function(r,e){var o=-1,n=e.length,a=n>1?e[n-1]:void 0,s=n>2?e[2]:void 0;for(a=t.length>3&&typeof a=="function"?(n--,a):void 0,s&&Ao(e[0],e[1],s)&&(a=n<3?void 0:a,n=1),r=Object(r);++o<n;){var i=e[o];i&&t(r,i,o,a)}return r})}var go=df;var Ef=go(function(t,r,e){mo(t,r,e)}),Rt=Ef;var xf=zt(Object.keys,Object),yo=xf;var Af=Object.prototype,gf=Af.hasOwnProperty;function yf(t){if(!yt(t))return yo(t);var r=[];for(var e in Object(t))gf.call(t,e)&&e!="constructor"&&r.push(e);return r}var ho=yf;function hf(t){return M(t)?kt(t):ho(t)}var Nt=hf;function Tf(t,r){return t&&Xt(t,r,Nt)}var k=Tf;var Pf="__lodash_hash_undefined__";function Of(t){return this.__data__.set(t,Pf),this}var To=Of;function Rf(t){return this.__data__.has(t)}var Po=Rf;function rr(t){var r=-1,e=t==null?0:t.length;for(this.__data__=new ot;++r<e;)this.add(t[r])}rr.prototype.add=rr.prototype.push=To;rr.prototype.has=Po;var Oo=rr;function Nf(t,r){for(var e=-1,o=t==null?0:t.length;++e<o;)if(r(t[e],e,t))return!0;return!1}var Ro=Nf;function Sf(t,r){return t.has(r)}var No=Sf;var bf=1,If=2;function Cf(t,r,e,o,n,a){var s=e&bf,i=t.length,p=r.length;if(i!=p&&!(s&&p>i))return!1;var f=a.get(t),c=a.get(r);if(f&&c)return f==r&&c==t;var m=-1,u=!0,l=e&If?new Oo:void 0;for(a.set(t,r),a.set(r,t);++m<i;){var x=t[m],h=r[m];if(o)var T=s?o(h,x,m,r,t,a):o(x,h,m,t,r,a);if(T!==void 0){if(T)continue;u=!1;break}if(l){if(!Ro(r,function(R,g){if(!No(l,g)&&(x===R||n(x,R,e,o,a)))return l.push(g)})){u=!1;break}}else if(!(x===h||n(x,h,e,o,a))){u=!1;break}}return a.delete(t),a.delete(r),u}var er=Cf;function vf(t){var r=-1,e=Array(t.size);return t.forEach(function(o,n){e[++r]=[n,o]}),e}var So=vf;function Lf(t){var r=-1,e=Array(t.size);return t.forEach(function(o){e[++r]=o}),e}var bo=Lf;var Mf=1,wf=2,Df="[object Boolean]",Ff="[object Date]",Yf="[object Error]",Kf="[object Map]",Uf="[object Number]",Gf="[object RegExp]",Bf="[object Set]",Hf="[object String]",jf="[object Symbol]",Wf="[object ArrayBuffer]",Jf="[object DataView]",Io=S?S.prototype:void 0,Ur=Io?Io.valueOf:void 0;function qf(t,r,e,o,n,a,s){switch(e){case Jf:if(t.byteLength!=r.byteLength||t.byteOffset!=r.byteOffset)return!1;t=t.buffer,r=r.buffer;case Wf:return!(t.byteLength!=r.byteLength||!a(new At(t),new At(r)));case Df:case Ff:case Uf:return Y(+t,+r);case Yf:return t.name==r.name&&t.message==r.message;case Gf:case Hf:return t==r+"";case Kf:var i=So;case Bf:var p=o&Mf;if(i||(i=bo),t.size!=r.size&&!p)return!1;var f=s.get(t);if(f)return f==r;o|=wf,s.set(t,r);var c=er(i(t),i(r),o,n,a,s);return s.delete(t),c;case jf:if(Ur)return Ur.call(t)==Ur.call(r)}return!1}var Co=qf;function Vf(t,r){for(var e=-1,o=r.length,n=t.length;++e<o;)t[n+e]=r[e];return t}var St=Vf;function zf(t,r,e){var o=r(t);return d(t)?o:St(o,e(t))}var or=zf;function Qf(t,r){for(var e=-1,o=t==null?0:t.length,n=0,a=[];++e<o;){var s=t[e];r(s,e,t)&&(a[n++]=s)}return a}var vo=Qf;function Xf(){return[]}var nr=Xf;var $f=Object.prototype,kf=$f.propertyIsEnumerable,Lo=Object.getOwnPropertySymbols,Zf=Lo?function(t){return t==null?[]:(t=Object(t),vo(Lo(t),function(r){return kf.call(t,r)}))}:nr,ar=Zf;function tc(t){return or(t,Nt,ar)}var Gr=tc;var rc=1,ec=Object.prototype,oc=ec.hasOwnProperty;function nc(t,r,e,o,n,a){var s=e&rc,i=Gr(t),p=i.length,f=Gr(r),c=f.length;if(p!=c&&!s)return!1;for(var m=p;m--;){var u=i[m];if(!(s?u in r:oc.call(r,u)))return!1}var l=a.get(t),x=a.get(r);if(l&&x)return l==r&&x==t;var h=!0;a.set(t,r),a.set(r,t);for(var T=s;++m<p;){u=i[m];var R=t[u],g=r[u];if(o)var ft=s?o(g,R,u,r,t,a):o(R,g,u,t,r,a);if(!(ft===void 0?R===g||n(R,g,e,o,a):ft)){h=!1;break}T||(T=u=="constructor")}if(h&&!T){var et=t.constructor,ct=r.constructor;et!=ct&&"constructor"in t&&"constructor"in r&&!(typeof et=="function"&&et instanceof et&&typeof ct=="function"&&ct instanceof ct)&&(h=!1)}return a.delete(t),a.delete(r),h}var Mo=nc;var ac=C(_,"DataView"),ir=ac;var ic=C(_,"Promise"),sr=ic;var sc=C(_,"Set"),pr=sc;var pc=C(_,"WeakMap"),at=pc;var wo="[object Map]",fc="[object Object]",Do="[object Promise]",Fo="[object Set]",Yo="[object WeakMap]",Ko="[object DataView]",cc=B(ir),mc=B(V),uc=B(sr),lc=B(pr),_c=B(at),it=P;(ir&&it(new ir(new ArrayBuffer(1)))!=Ko||V&&it(new V)!=wo||sr&&it(sr.resolve())!=Do||pr&&it(new pr)!=Fo||at&&it(new at)!=Yo)&&(it=function(t){var r=P(t),e=r==fc?t.constructor:void 0,o=e?B(e):"";if(o)switch(o){case cc:return Ko;case mc:return wo;case uc:return Do;case lc:return Fo;case _c:return Yo}return r});var Br=it;var dc=1,Uo="[object Arguments]",Go="[object Array]",fr="[object Object]",Ec=Object.prototype,Bo=Ec.hasOwnProperty;function xc(t,r,e,o,n,a){var s=d(t),i=d(r),p=s?Go:Br(t),f=i?Go:Br(r);p=p==Uo?fr:p,f=f==Uo?fr:f;var c=p==fr,m=f==fr,u=p==f;if(u&&nt(t)){if(!nt(r))return!1;s=!0,c=!1}if(u&&!c)return a||(a=new Q),s||Tt(t)?er(t,r,e,o,n,a):Co(t,r,p,e,o,n,a);if(!(e&dc)){var l=c&&Bo.call(t,"__wrapped__"),x=m&&Bo.call(r,"__wrapped__");if(l||x){var h=l?t.value():t,T=x?r.value():r;return a||(a=new Q),n(h,T,e,o,a)}}return u?(a||(a=new Q),Mo(t,r,e,o,n,a)):!1}var Ho=xc;function jo(t,r,e,o,n){return t===r?!0:t==null||r==null||!y(t)&&!y(r)?t!==t&&r!==r:Ho(t,r,e,o,jo,n)}var cr=jo;var Ac=1,gc=2;function yc(t,r,e,o){var n=e.length,a=n,s=!o;if(t==null)return!a;for(t=Object(t);n--;){var i=e[n];if(s&&i[2]?i[1]!==t[i[0]]:!(i[0]in t))return!1}for(;++n<a;){i=e[n];var p=i[0],f=t[p],c=i[1];if(s&&i[2]){if(f===void 0&&!(p in t))return!1}else{var m=new Q;if(o)var u=o(f,c,p,t,r,m);if(!(u===void 0?cr(c,f,Ac|gc,o,m):u))return!1}}return!0}var Wo=yc;function hc(t){return t===t&&!A(t)}var mr=hc;function Tc(t){for(var r=Nt(t),e=r.length;e--;){var o=r[e],n=t[o];r[e]=[o,n,mr(n)]}return r}var Jo=Tc;function Pc(t,r){return function(e){return e==null?!1:e[t]===r&&(r!==void 0||t in Object(e))}}var ur=Pc;function Oc(t){var r=Jo(t);return r.length==1&&r[0][2]?ur(r[0][0],r[0][1]):function(e){return e===t||Wo(e,t,r)}}var qo=Oc;var Rc="[object Symbol]";function Nc(t){return typeof t=="symbol"||y(t)&&P(t)==Rc}var Z=Nc;var Sc=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,bc=/^\w*$/;function Ic(t,r){if(d(t))return!1;var e=typeof t;return e=="number"||e=="symbol"||e=="boolean"||t==null||Z(t)?!0:bc.test(t)||!Sc.test(t)||r!=null&&t in Object(r)}var bt=Ic;var Cc="Expected a function";function Hr(t,r){if(typeof t!="function"||r!=null&&typeof r!="function")throw new TypeError(Cc);var e=function(){var o=arguments,n=r?r.apply(this,o):o[0],a=e.cache;if(a.has(n))return a.get(n);var s=t.apply(this,o);return e.cache=a.set(n,s)||a,s};return e.cache=new(Hr.Cache||ot),e}Hr.Cache=ot;var Vo=Hr;var vc=500;function Lc(t){var r=Vo(t,function(o){return e.size===vc&&e.clear(),o}),e=r.cache;return r}var zo=Lc;var Mc=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,wc=/\\(\\)?/g,Dc=zo(function(t){var r=[];return t.charCodeAt(0)===46&&r.push(""),t.replace(Mc,function(e,o,n,a){r.push(n?a.replace(wc,"$1"):o||e)}),r}),Qo=Dc;function Fc(t,r){for(var e=-1,o=t==null?0:t.length,n=Array(o);++e<o;)n[e]=r(t[e],e,t);return n}var It=Fc;var Yc=1/0,Xo=S?S.prototype:void 0,$o=Xo?Xo.toString:void 0;function ko(t){if(typeof t=="string")return t;if(d(t))return It(t,ko)+"";if(Z(t))return $o?$o.call(t):"";var r=t+"";return r=="0"&&1/t==-Yc?"-0":r}var Zo=ko;function Kc(t){return t==null?"":Zo(t)}var tn=Kc;function Uc(t,r){return d(t)?t:bt(t,r)?[t]:Qo(tn(t))}var tt=Uc;var Gc=1/0;function Bc(t){if(typeof t=="string"||Z(t))return t;var r=t+"";return r=="0"&&1/t==-Gc?"-0":r}var G=Bc;function Hc(t,r){r=tt(r,t);for(var e=0,o=r.length;t!=null&&e<o;)t=t[G(r[e++])];return e&&e==o?t:void 0}var Ct=Hc;function jc(t,r,e){var o=t==null?void 0:Ct(t,r);return o===void 0?e:o}var rn=jc;function Wc(t,r){return t!=null&&r in Object(t)}var en=Wc;function Jc(t,r,e){r=tt(r,t);for(var o=-1,n=r.length,a=!1;++o<n;){var s=G(r[o]);if(!(a=t!=null&&e(t,s)))break;t=t[s]}return a||++o!=n?a:(n=t==null?0:t.length,!!n&&ht(n)&&U(s,n)&&(d(t)||j(t)))}var on=Jc;function qc(t,r){return t!=null&&on(t,r,en)}var nn=qc;var Vc=1,zc=2;function Qc(t,r){return bt(t)&&mr(r)?ur(G(t),r):function(e){var o=rn(e,t);return o===void 0&&o===r?nn(e,t):cr(r,o,Vc|zc)}}var an=Qc;function Xc(t){return function(r){return r?.[t]}}var sn=Xc;function $c(t){return function(r){return Ct(r,t)}}var pn=$c;function kc(t){return bt(t)?sn(G(t)):pn(t)}var fn=kc;function Zc(t){return typeof t=="function"?t:t==null?$:typeof t=="object"?d(t)?an(t[0],t[1]):qo(t):fn(t)}var w=Zc;function tm(t,r){var e={};return r=w(r,3),k(t,function(o,n,a){K(e,n,r(o,n,a))}),e}var cn=tm;function rm(t,r){var e={};return r=w(r,3),k(t,function(o,n,a){K(e,r(o,n,a),o)}),e}var mn=rm;var em="Expected a function";function om(t){if(typeof t!="function")throw new TypeError(em);return function(){var r=arguments;switch(r.length){case 0:return!t.call(this);case 1:return!t.call(this,r[0]);case 2:return!t.call(this,r[0],r[1]);case 3:return!t.call(this,r[0],r[1],r[2])}return!t.apply(this,r)}}var un=om;function nm(t,r,e,o){if(!A(t))return t;r=tt(r,t);for(var n=-1,a=r.length,s=a-1,i=t;i!=null&&++n<a;){var p=G(r[n]),f=e;if(p==="__proto__"||p==="constructor"||p==="prototype")return t;if(n!=s){var c=i[p];f=o?o(c,p,i):void 0,f===void 0&&(f=A(c)?c:U(r[n+1])?[]:{})}$t(i,p,f),i=i[p]}return t}var ln=nm;function am(t,r,e){for(var o=-1,n=r.length,a={};++o<n;){var s=r[o],i=Ct(t,s);e(i,s)&&ln(a,tt(s,t),i)}return a}var _n=am;var im=Object.getOwnPropertySymbols,sm=im?function(t){for(var r=[];t;)St(r,ar(t)),t=mt(t);return r}:nr,dn=sm;function pm(t){return or(t,Pt,dn)}var En=pm;function fm(t,r){if(t==null)return{};var e=It(En(t),function(o){return[o]});return r=w(r),_n(t,e,function(o,n){return r(o,n[0])})}var xn=fm;function cm(t,r){return xn(t,un(w(r)))}var An=cm;function mm(t,r,e){var o;return e(t,function(n,a,s){if(r(n,a,s))return o=a,!1}),o}var gn=mm;function um(t,r){return gn(t,w(r,3),k)}var yn=um;var lm=at&&new at,vt=lm;var _m=vt?function(t,r){return vt.set(t,r),t}:$,lr=_m;function dm(t){return function(){var r=arguments;switch(r.length){case 0:return new t;case 1:return new t(r[0]);case 2:return new t(r[0],r[1]);case 3:return new t(r[0],r[1],r[2]);case 4:return new t(r[0],r[1],r[2],r[3]);case 5:return new t(r[0],r[1],r[2],r[3],r[4]);case 6:return new t(r[0],r[1],r[2],r[3],r[4],r[5]);case 7:return new t(r[0],r[1],r[2],r[3],r[4],r[5],r[6])}var e=X(t.prototype),o=t.apply(e,r);return A(o)?o:e}}var W=dm;var Em=1;function xm(t,r,e){var o=r&Em,n=W(t);function a(){var s=this&&this!==_&&this instanceof a?n:t;return s.apply(o?e:this,arguments)}return a}var hn=xm;var Am=Math.max;function gm(t,r,e,o){for(var n=-1,a=t.length,s=e.length,i=-1,p=r.length,f=Am(a-s,0),c=Array(p+f),m=!o;++i<p;)c[i]=r[i];for(;++n<s;)(m||n<a)&&(c[e[n]]=t[n]);for(;f--;)c[i++]=t[n++];return c}var _r=gm;var ym=Math.max;function hm(t,r,e,o){for(var n=-1,a=t.length,s=-1,i=e.length,p=-1,f=r.length,c=ym(a-i,0),m=Array(c+f),u=!o;++n<c;)m[n]=t[n];for(var l=n;++p<f;)m[l+p]=r[p];for(;++s<i;)(u||n<a)&&(m[l+e[s]]=t[n++]);return m}var dr=hm;function Tm(t,r){for(var e=t.length,o=0;e--;)t[e]===r&&++o;return o}var Tn=Tm;function Pm(){}var Lt=Pm;var Om=4294967295;function Er(t){this.__wrapped__=t,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=Om,this.__views__=[]}Er.prototype=X(Lt.prototype);Er.prototype.constructor=Er;var Mt=Er;function Rm(){}var Pn=Rm;var Nm=vt?function(t){return vt.get(t)}:Pn,xr=Nm;var Sm={},jr=Sm;var bm=Object.prototype,Im=bm.hasOwnProperty;function Cm(t){for(var r=t.name+"",e=jr[r],o=Im.call(jr,r)?e.length:0;o--;){var n=e[o],a=n.func;if(a==null||a==t)return n.name}return r}var On=Cm;function Ar(t,r){this.__wrapped__=t,this.__actions__=[],this.__chain__=!!r,this.__index__=0,this.__values__=void 0}Ar.prototype=X(Lt.prototype);Ar.prototype.constructor=Ar;var Gt=Ar;function vm(t){if(t instanceof Mt)return t.clone();var r=new Gt(t.__wrapped__,t.__chain__);return r.__actions__=gt(t.__actions__),r.__index__=t.__index__,r.__values__=t.__values__,r}var Rn=vm;var Lm=Object.prototype,Mm=Lm.hasOwnProperty;function gr(t){if(y(t)&&!d(t)&&!(t instanceof Mt)){if(t instanceof Gt)return t;if(Mm.call(t,"__wrapped__"))return Rn(t)}return new Gt(t)}gr.prototype=Lt.prototype;gr.prototype.constructor=gr;var Nn=gr;function wm(t){var r=On(t),e=Nn[r];if(typeof e!="function"||!(r in Mt.prototype))return!1;if(t===e)return!0;var o=xr(e);return!!o&&t===o[0]}var Sn=wm;var Dm=Zt(lr),yr=Dm;var Fm=/\{\n\/\* \[wrapped with (.+)\] \*/,Ym=/,? & /;function Km(t){var r=t.match(Fm);return r?r[1].split(Ym):[]}var bn=Km;var Um=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;function Gm(t,r){var e=r.length;if(!e)return t;var o=e-1;return r[o]=(e>1?"& ":"")+r[o],r=r.join(e>2?", ":" "),t.replace(Um,`{
/* [wrapped with `+r+`] */
`)}var In=Gm;function Bm(t,r){for(var e=-1,o=t==null?0:t.length;++e<o&&r(t[e],e,t)!==!1;);return t}var Cn=Bm;function Hm(t,r,e,o){for(var n=t.length,a=e+(o?1:-1);o?a--:++a<n;)if(r(t[a],a,t))return a;return-1}var vn=Hm;function jm(t){return t!==t}var Ln=jm;function Wm(t,r,e){for(var o=e-1,n=t.length;++o<n;)if(t[o]===r)return o;return-1}var Mn=Wm;function Jm(t,r,e){return r===r?Mn(t,r,e):vn(t,Ln,e)}var wn=Jm;function qm(t,r){var e=t==null?0:t.length;return!!e&&wn(t,r,0)>-1}var Dn=qm;var Vm=1,zm=2,Qm=8,Xm=16,$m=32,km=64,Zm=128,tu=256,ru=512,eu=[["ary",Zm],["bind",Vm],["bindKey",zm],["curry",Qm],["curryRight",Xm],["flip",ru],["partial",$m],["partialRight",km],["rearg",tu]];function ou(t,r){return Cn(eu,function(e){var o="_."+e[0];r&e[1]&&!Dn(t,o)&&t.push(o)}),t.sort()}var Fn=ou;function nu(t,r,e){var o=r+"";return tr(t,In(o,Fn(bn(o),e)))}var hr=nu;var au=1,iu=2,su=4,pu=8,Yn=32,Kn=64;function fu(t,r,e,o,n,a,s,i,p,f){var c=r&pu,m=c?s:void 0,u=c?void 0:s,l=c?a:void 0,x=c?void 0:a;r|=c?Yn:Kn,r&=~(c?Kn:Yn),r&su||(r&=~(au|iu));var h=[t,r,n,l,m,x,u,i,p,f],T=e.apply(void 0,h);return Sn(t)&&yr(T,h),T.placeholder=o,hr(T,t,r)}var Tr=fu;function cu(t){var r=t;return r.placeholder}var Pr=cu;var mu=Math.min;function uu(t,r){for(var e=t.length,o=mu(r.length,e),n=gt(t);o--;){var a=r[o];t[o]=U(a,e)?n[a]:void 0}return t}var Un=uu;var Gn="__lodash_placeholder__";function lu(t,r){for(var e=-1,o=t.length,n=0,a=[];++e<o;){var s=t[e];(s===r||s===Gn)&&(t[e]=Gn,a[n++]=e)}return a}var st=lu;var _u=1,du=2,Eu=8,xu=16,Au=128,gu=512;function Bn(t,r,e,o,n,a,s,i,p,f){var c=r&Au,m=r&_u,u=r&du,l=r&(Eu|xu),x=r&gu,h=u?void 0:W(t);function T(){for(var R=arguments.length,g=Array(R),ft=R;ft--;)g[ft]=arguments[ft];if(l)var et=Pr(T),ct=Tn(g,et);if(o&&(g=_r(g,o,n,l)),a&&(g=dr(g,a,s,l)),R-=ct,l&&R<f){var oi=st(g,et);return Tr(t,r,Bn,T.placeholder,e,g,oi,i,p,f-R)}var ae=m?e:this,wr=u?ae[t]:t;return R=g.length,i?g=Un(g,i):x&&R>1&&g.reverse(),c&&p<R&&(g.length=p),this&&this!==_&&this instanceof T&&(wr=h||W(wr)),wr.apply(ae,g)}return T}var Or=Bn;function yu(t,r,e){var o=W(t);function n(){for(var a=arguments.length,s=Array(a),i=a,p=Pr(n);i--;)s[i]=arguments[i];var f=a<3&&s[0]!==p&&s[a-1]!==p?[]:st(s,p);if(a-=f.length,a<e)return Tr(t,r,Or,n.placeholder,void 0,s,f,void 0,void 0,e-a);var c=this&&this!==_&&this instanceof n?o:t;return Ot(c,this,s)}return n}var Hn=yu;var hu=1;function Tu(t,r,e,o){var n=r&hu,a=W(t);function s(){for(var i=-1,p=arguments.length,f=-1,c=o.length,m=Array(c+p),u=this&&this!==_&&this instanceof s?a:t;++f<c;)m[f]=o[f];for(;p--;)m[f++]=arguments[++i];return Ot(u,n?e:this,m)}return s}var jn=Tu;var Wn="__lodash_placeholder__",Wr=1,Pu=2,Ou=4,Jn=8,Bt=128,qn=256,Ru=Math.min;function Nu(t,r){var e=t[1],o=r[1],n=e|o,a=n<(Wr|Pu|Bt),s=o==Bt&&e==Jn||o==Bt&&e==qn&&t[7].length<=r[8]||o==(Bt|qn)&&r[7].length<=r[8]&&e==Jn;if(!(a||s))return t;o&Wr&&(t[2]=r[2],n|=e&Wr?0:Ou);var i=r[3];if(i){var p=t[3];t[3]=p?_r(p,i,r[4]):i,t[4]=p?st(t[3],Wn):r[4]}return i=r[5],i&&(p=t[5],t[5]=p?dr(p,i,r[6]):i,t[6]=p?st(t[5],Wn):r[6]),i=r[7],i&&(t[7]=i),o&Bt&&(t[8]=t[8]==null?r[8]:Ru(t[8],r[8])),t[9]==null&&(t[9]=r[9]),t[0]=r[0],t[1]=n,t}var Vn=Nu;var Su=/\s/;function bu(t){for(var r=t.length;r--&&Su.test(t.charAt(r)););return r}var zn=bu;var Iu=/^\s+/;function Cu(t){return t&&t.slice(0,zn(t)+1).replace(Iu,"")}var Qn=Cu;var Xn=0/0,vu=/^[-+]0x[0-9a-f]+$/i,Lu=/^0b[01]+$/i,Mu=/^0o[0-7]+$/i,wu=parseInt;function Du(t){if(typeof t=="number")return t;if(Z(t))return Xn;if(A(t)){var r=typeof t.valueOf=="function"?t.valueOf():t;t=A(r)?r+"":r}if(typeof t!="string")return t===0?t:+t;t=Qn(t);var e=Lu.test(t);return e||Mu.test(t)?wu(t.slice(2),e?2:8):vu.test(t)?Xn:+t}var $n=Du;var kn=1/0,Fu=17976931348623157e292;function Yu(t){if(!t)return t===0?t:0;if(t=$n(t),t===kn||t===-kn){var r=t<0?-1:1;return r*Fu}return t===t?t:0}var Zn=Yu;function Ku(t){var r=Zn(t),e=r%1;return r===r?e?r-e:r:0}var Jr=Ku;var Uu="Expected a function",ta=1,Gu=2,qr=8,Vr=16,zr=32,ra=64,ea=Math.max;function Bu(t,r,e,o,n,a,s,i){var p=r&Gu;if(!p&&typeof t!="function")throw new TypeError(Uu);var f=o?o.length:0;if(f||(r&=~(zr|ra),o=n=void 0),s=s===void 0?s:ea(Jr(s),0),i=i===void 0?i:Jr(i),f-=n?n.length:0,r&ra){var c=o,m=n;o=n=void 0}var u=p?void 0:xr(t),l=[t,r,e,o,n,c,m,a,s,i];if(u&&Vn(l,u),t=l[0],r=l[1],e=l[2],o=l[3],n=l[4],i=l[9]=l[9]===void 0?p?0:t.length:ea(l[9]-f,0),!i&&r&(qr|Vr)&&(r&=~(qr|Vr)),!r||r==ta)var x=hn(t,r,e);else r==qr||r==Vr?x=Hn(t,r,i):(r==zr||r==(ta|zr))&&!n.length?x=jn(t,r,e,o):x=Or.apply(void 0,l);var h=u?lr:yr;return hr(h(x,l),t,r)}var oa=Bu;var Hu=8;function Qr(t,r,e){r=e?void 0:r;var o=oa(t,Hu,void 0,void 0,void 0,void 0,void 0,r);return o.placeholder=Qr.placeholder,o}Qr.placeholder={};var na=Qr;var aa=S?S.isConcatSpreadable:void 0;function ju(t){return d(t)||j(t)||!!(aa&&t&&t[aa])}var ia=ju;function sa(t,r,e,o,n){var a=-1,s=t.length;for(e||(e=ia),n||(n=[]);++a<s;){var i=t[a];r>0&&e(i)?r>1?sa(i,r-1,e,o,n):St(n,i):o||(n[n.length]=i)}return n}var pa=sa;function Wu(t,r){return function(e,o){if(e==null)return e;if(!M(e))return t(e,o);for(var n=e.length,a=r?n:-1,s=Object(e);(r?a--:++a<n)&&o(s[a],a,s)!==!1;);return e}}var fa=Wu;var Ju=fa(k),ca=Ju;function qu(t,r){var e=-1,o=M(t)?Array(t.length):[];return ca(t,function(n,a,s){o[++e]=r(n,a,s)}),o}var ma=qu;function Vu(t,r){var e=d(t)?It:ma;return e(t,w(r,3))}var ua=Vu;function zu(t,r){return pa(ua(t,r),1)}var Xr=zu;var la=(t,r)=>!!t.filter(e=>e===r).length,$r=t=>Array.isArray(t)?t:[t],_a=t=>t&&Object.keys(t).length===0&&t.constructor===Object,rt=(t,r=!0)=>{try{return v(t)?JSON.parse(t):JSON.parse(JSON.stringify(t))}catch(e){if(r)return t;throw e}},L=(t,r)=>{try{let e=Object.keys(t);return la(e,r)}catch(e){return!1}},Qu=(...t)=>t.join("_"),Xu=(t,r)=>r&&I(r)&&t in r?r[t]:void 0,da=t=>t!=null&&(t+"").trim()!=="";function Ea(t,r=!1){return Array.isArray(t)?r?!!t.length:!1:I(t)?r?!_a(t):!1:da(t)}var $u=(t,r)=>!Ea(t,r),ku=t=>typeof t=="function"?!0:(console.error(`Expect to be Function type! Got ${typeof t}`),!1),Zu=(...t)=>Reflect.apply(Object.assign,Object,t),kr=()=>!1,tl=t=>Object.freeze(t),rl=t=>{console.dir(t,{depth:null})};function el(t,...r){return t.replace(/{([0-9]+)}/g,(e,o)=>typeof r[o]=="undefined"?e:r[o])}var ol=(t,...r)=>(...e)=>r.reduce((o,n)=>Reflect.apply(n,null,$r(o)),Reflect.apply(t,null,e));function nl(t,r=!1){return t.reduce((e,o)=>e.then(n=>o.then(a=>r===!1?[...n,a]:Rt(n,a))),Promise.resolve(r===!1?[]:I(r)?r:{}))}function xa(t,...r){return(...e)=>r.reduce((o,n)=>o.then(a=>n(a)),Reflect.apply(t,null,e))}function al(t,...r){let e=Xr(t),o=Reflect.apply(xa,null,e);return Reflect.apply(o,null,r)}var Rr="data",Ht="error";var ga="jsonql",Aa="application/vnd.api+json",il="charset=utf-8",yR={Accept:Aa,"Content-Type":[Aa,il].join("")};var jt="query",Wt="mutation",Nr="socket";var wt="payload",Dt="condition",Zr="resolverName",pt="args",O="TS";var ya=["POST","PUT"];var ha="public";var te=-1;var Sr=404;var br="__reply__",Ir="__event__",Cr="__data__";var Ta="emit_reply",Pa="emit_send",Oa="emit_acknowledge";var Jt="nspGroup",vr="publicNamespace";var Ra="base64";var Na="pem",sl="publicKey",pl="privateKey",PR=[sl,Na].join("."),OR=[pl,Na].join(".");var D=class extends Error{constructor(...e){super(...e);this.message=e[0],this.detail=e[1],this.className=D.name,Error.captureStackTrace&&Error.captureStackTrace(this,D)}static get statusCode(){return Sr}};var N=class extends Error{constructor(...e){super(...e);this.message=e[0],this.detail=e[1],this.className=N.name,Error.captureStackTrace&&Error.captureStackTrace(this,N)}};var b=class extends Error{constructor(...e){super(...e);this.message=e[0],this.detail=e[1],this.className=b.name,Error.captureStackTrace&&Error.captureStackTrace(this,b)}static get statusCode(){return te}};function Ua(t){return I(t)&&(L(t,jt)||L(t,Wt)||L(t,Nr))}function ul(t){return Ua(t)?t:!1}function ee(t){return L(t,Nr)?t[Nr]:!1}function ll(t,r){switch(r){case jt:return t[pt];case Wt:return[t[wt],t[Dt]];default:throw new b(`Unknown ${r} to extract argument from!`)}}function _l(t,r,e){try{let o=t[r][e];if(!o)throw new D(e,r);return o}catch(o){throw new D(e,o)}}var dl=t=>El(t.trim().replace(/([A-Z])/g,"-$1").replace(/[-_\s]+/g,"-").toLowerCase()),El=t=>{let r=t.substring(0,1);return r!=="_"&&r!=="-"?t:t.substring(1)};function xl(t,r=Ra){return Buffer.isBuffer(t)?t:Buffer.from(t,r)}var Al=t=>window.btoa(unescape(encodeURIComponent(t))),gl=t=>decodeURIComponent(escape(window.atob(t)));function yl(...t){try{window&&window.DEBUG&&Reflect.apply(console.log,console,t)}catch(r){}}var hl=t=>{let r=[t];return(...e)=>{try{window&&window.JSONQL_DEBUG&&Reflect.apply(console.info,console,r.concat(e))}catch(o){}}};var Tl="socket not found in contract!",Ga="size";function Pl(t,r){let e={};for(let o in t){let n=t[o];e[o]=n}return{size:1,nspGroup:{[r]:e},publicNamespace:r}}function Ba(t){let r=ee(t);if(r===!1)throw new b("groupByNamespace",Tl);let e={[Jt]:{},[vr]:null,[Ga]:0};for(let o in r){let n=r[o],{namespace:a}=n;a&&(e[Jt][a]||(++e[Ga],e[Jt][a]={}),e[Jt][a][o]=n,!e[vr]&&n[ha]&&(e[vr]=a))}return e}function Ol(t,r){let e=[];for(let o in t)o===r?e[1]=o:e[0]=o;return e}function Ha(t){let r=ga;return t.enableAuth?[[r,t.privateNamespace].join("/"),[r,t.publicNamespace].join("/")]:[r]}function Rl(t){return t.length>1?t[0]:!1}function Nl(t){let{contract:r,enableAuth:e}=t,o=Ha(t),n=e?Ba(r):Pl(r.socket,o[0]);return Object.assign(n,{namespaces:o})}function Sl(t,r,e,o=null){return Object.getOwnPropertyDescriptor(t,r)===void 0&&Object.defineProperty(t,r,{set:e,get:o===null?function(){return null}:o}),t}function ja(t,r){let e=Object.getOwnPropertyDescriptor(t,r);return e!==void 0&&e.value?e.value:e}function bl(t,r,e,o=!1){let n=ja(t,r);return o===!1&&n!==void 0||Object.defineProperty(t,r,{value:e,writable:o}),t}var F=(t=!1)=>{let r=Date.now();return t?Math.floor(r/1e3):r};var oe=t=>{let r=t[O];return Array.isArray(r)||(r=[r]),r.push(F()),r},Wa=t=>v(t)?rt(t):t,Mr=t=>({[pt]:t});function Ja(t){return Object.keys(t).filter(e=>e!==O)[0]}function qt(t,r,e={}){return Object.assign({[t]:r,[O]:[F()]},e)}function qa(t,r=[],e=!1){if(v(t)&&Array.isArray(r)){let o=Mr(r);return e===!0?o:qt(t,o)}throw new N("utils:params-api:createQuery",{message:"expect resolverName to be string and args to be array!",resolverName:t,args:r})}function Il(t,r=[],e=!1){return JSON.stringify(qa(t,r,e))}function Va(t,r,e={},o=!1){let n={[wt]:r,[Dt]:e};if(o===!0)return n;if(v(t))return qt(t,n);throw new N("[createMutation] expect resolverName to be string!",{resolverName:t,payload:r,condition:e})}function Cl(t,r,e={},o=!1){return JSON.stringify(Va(t,r,e,o))}function za(t,r){if(t&&I(r)){let e=r[t];if(e[pt])return{[Zr]:t,[pt]:e[pt],[O]:oe(r)}}return!1}function Qa(t,r){let e=Wa(t),o=Ja(e);return Reflect.apply(r,null,[o,e])}function vl(t){let r=Qa(t,za);if(r!==!1)return r;throw new N("[getQueryArgs] Payload is malformed!",t)}function Xa(t,r){if(t&&I(r)){let e=r[t];if(e)return{[Zr]:t,[wt]:e[wt],[Dt]:e[Dt],[O]:oe(r)}}return!1}function Ll(t){let r=Qa(t,Xa);if(r!==!1)return r;throw new N("[getMutationArgs] Payload is malformed!",t)}function $a(t){return t instanceof RegExp}function Ml(t){switch(!0){case $a(t)===!0:return t;case v(t)===!0:return new RegExp(t);default:return!1}}var wl=t=>{let[r,e]=ya;switch(!0){case t===r:return jt;case t===e:return Wt;default:return!1}},Dl=function(t,r=!1){let e={[Rr]:t};return r&&Array.isArray(r)&&(r.push(F()),e[O]=r),JSON.stringify(e)},ka=t=>["detail","className"].filter(o=>L(t,o)).length?["className","message","statusCode"].filter(o=>L(t,o)).map(o=>({[o]:typeof t[o]=="object"?t[o].toString():t[o]})).reduce(Rt,{detail:t.toString()}):!1,Fl=function(t,r="JsonqlError",e=0,o=""){let n={detail:t,className:r,statusCode:e,message:o};return JSON.stringify({[Ht]:ka(t)||n,[O]:[F()]})},Yl=t=>L(t,Rr)&&!L(t,Ht)?t[Rr]:t;var Kl="payload can not decoded",Za=[br,Ir,Cr],Ul=(t,r,e=!1)=>{if(v(t)&&Array.isArray(r)){let o=Mr(r),n=qt(t,o,{type:Pa});return e?JSON.stringify(n):n}throw new N("utils:socket:createSendMsg",{resolverName:t,args:r,message:"expect resolverName to be string and args to be array!"})},Gl=t=>{let r={data:{}};if(r[O]=[],t[O]){let e=t[O];r[O]=Array.isArray(e)?e:[e],delete t[O]}return r.data=t,r},ne=(t,r,e,o=[])=>{let n=Gl(rt(e));return o=o.concat(n[O]),o.length||o.push(F()),JSON.stringify({data:{[br]:t,[Ir]:r,[Cr]:n.data},[O]:o})},Bl=(t,r,e=[])=>ne(Ta,t,r,e),Hl=(t,r,e=[])=>ne(Oa,t,r,e),ti=t=>{let r=v(t)?rt(t):t,{data:e}=r;return e&&Za.filter(n=>L(e,n)).length===Za.length?e:!1},jl=(t,r=kr)=>{try{let e=rt(t),o;if((o=ti(e))!==!1)return Reflect.apply(r,null,["_data",o]),{data:rt(o[Cr]),resolverName:o[Ir],type:o[br]};throw new b(Kl,t)}catch(e){return Reflect.apply(r,null,[Ht,e])}};var ri=(t,r)=>{let e=[];for(let o in r)e.push([o,r[o]].join("="));return[t,e.join("&")].join("?")},Wl=t=>ri(t,ei()),ei=()=>({_cb:F()});})();
//# sourceMappingURL=browser.js.map
