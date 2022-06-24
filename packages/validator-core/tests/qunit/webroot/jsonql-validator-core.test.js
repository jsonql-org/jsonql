"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // ../utils/dist/truetypeof.js
  var require_truetypeof = __commonJS({
    "../utils/dist/truetypeof.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.trueTypeOf = void 0;
      function trueTypeOf2(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
      }
      exports.trueTypeOf = trueTypeOf2;
    }
  });

  // ../utils/dist/common.js
  var require_common = __commonJS({
    "../utils/dist/common.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.formatStr = exports.showDeep = exports.nil = exports.createEvtName = exports.parseJson = exports.toArray = exports.inArray = void 0;
      var lodash_1 = require_lodash();
      var inArray = (arr, value) => arr.includes(value);
      exports.inArray = inArray;
      var toArray2 = (arg) => Array.isArray(arg) ? arg : [arg];
      exports.toArray = toArray2;
      var parseJson = (n, t = true) => {
        try {
          return (0, lodash_1.isString)(n) ? JSON.parse(n) : JSON.parse(JSON.stringify(n));
        } catch (e) {
          if (t) {
            return n;
          }
          throw e;
        }
      };
      exports.parseJson = parseJson;
      var createEvtName = (...args) => args.join("_");
      exports.createEvtName = createEvtName;
      var nil = () => false;
      exports.nil = nil;
      var showDeep = (code) => {
        console.dir(code, { depth: null });
      };
      exports.showDeep = showDeep;
      function formatStr(str, ...args) {
        return str.replace(/{([0-9]+)}/g, (match, index) => typeof args[index] === "undefined" ? match : args[index]);
      }
      exports.formatStr = formatStr;
    }
  });

  // ../utils/dist/object.js
  var require_object = __commonJS({
    "../utils/dist/object.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.readOnly = exports.objectHasKey = exports.arrToObj = exports.assign = exports.getConfigValue = exports.isClass = exports.isPlainObject = exports.isObject = void 0;
      var common_1 = require_common();
      var truetypeof_1 = require_truetypeof();
      function isObject(o) {
        return (0, truetypeof_1.trueTypeOf)(o) === "object";
      }
      exports.isObject = isObject;
      function isPlainObject3(o) {
        if (isObject(o)) {
          const constr = o.constructor;
          const prot = constr.prototype;
          const nullType = "[Object: null prototype]";
          if (prot.toString().substring(0, nullType.length) === nullType) {
            return true;
          }
          if (isObject(prot) === false) {
            return false;
          }
          return Reflect.apply(prot["hasOwnProperty"], prot, ["isPrototypeOf"]);
        }
        return false;
      }
      exports.isPlainObject = isPlainObject3;
      var isClass = (o) => !isPlainObject3(o);
      exports.isClass = isClass;
      var getConfigValue = (name10, obj) => obj && isPlainObject3(obj) ? name10 in obj ? obj[name10] : void 0 : void 0;
      exports.getConfigValue = getConfigValue;
      var assign2 = (...args) => Reflect.apply(Object.assign, Object, args);
      exports.assign = assign2;
      var arrToObj = (args, processor, initValue = {}) => args.map(processor).reduce((a, b) => (0, exports.assign)(a, b), initValue);
      exports.arrToObj = arrToObj;
      var objectHasKey = (obj, key) => {
        try {
          const keys = Object.keys(obj);
          return (0, common_1.inArray)(keys, key);
        } catch (e) {
          return false;
        }
      };
      exports.objectHasKey = objectHasKey;
      var readOnly = (config) => Object.freeze(config);
      exports.readOnly = readOnly;
    }
  });

  // ../utils/dist/lodash.js
  var require_lodash = __commonJS({
    "../utils/dist/lodash.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isString = exports.flatMap = exports.merge = exports.curry = void 0;
      var truetypeof_1 = require_truetypeof();
      var object_1 = require_object();
      var curry2 = (fn, ...args) => fn.length <= args.length ? fn(...args) : (...more) => (0, exports.curry)(fn, ...args, ...more);
      exports.curry = curry2;
      var merge = (target, ...sources) => {
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
            } else {
              Object.assign(target, {
                [key]: source[key]
              });
            }
          }
        }
        return (0, exports.merge)(target, ...sources);
      };
      exports.merge = merge;
      function flatMap(arr, callback) {
        if (!callback) {
          callback = (n) => n;
        }
        return arr.flatMap(callback);
      }
      exports.flatMap = flatMap;
      function isString2(value) {
        return (0, truetypeof_1.trueTypeOf)(value) === "string";
      }
      exports.isString = isString2;
    }
  });

  // ../utils/dist/chain-promises.js
  var require_chain_promises = __commonJS({
    "../utils/dist/chain-promises.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.queuePromisesProcess = exports.chainProcessPromises = exports.chainPromises = void 0;
      var lodash_1 = require_lodash();
      var object_1 = require_object();
      function chainPromises(promises, asObject = false) {
        return promises.reduce((promiseChain, currentTask) => promiseChain.then((chainResults) => currentTask.then((currentResult) => asObject === false ? [...chainResults, currentResult] : (0, lodash_1.merge)(chainResults, currentResult))), Promise.resolve(asObject === false ? [] : (0, object_1.isPlainObject)(asObject) ? asObject : {}));
      }
      exports.chainPromises = chainPromises;
      function chainProcessPromises(initPromise, ...promises) {
        return (...args) => promises.reduce((promiseChain, currentTask) => promiseChain.then((chainResult) => currentTask(chainResult)), Reflect.apply(initPromise, null, args));
      }
      exports.chainProcessPromises = chainProcessPromises;
      function queuePromisesProcess2(queue, ...initValue) {
        const q = (0, lodash_1.flatMap)(queue);
        const ex = Reflect.apply(chainProcessPromises, null, q);
        return Reflect.apply(ex, null, initValue);
      }
      exports.queuePromisesProcess = queuePromisesProcess2;
    }
  });

  // ../errors/dist/general-exception.js
  var require_general_exception = __commonJS({
    "../errors/dist/general-exception.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var GeneralException4 = class extends Error {
        constructor(...args) {
          super(...args);
          this.message = args[0];
          this.detail = args[1];
          this.className = GeneralException4.name;
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, GeneralException4);
          }
        }
      };
      exports.default = GeneralException4;
    }
  });

  // ../errors/dist/validation-error.js
  var require_validation_error = __commonJS({
    "../errors/dist/validation-error.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var ValidationError2 = class extends Error {
        constructor(...args) {
          super(...args);
          this.message = args[0];
          this.detail = args[1];
          this.className = ValidationError2.name;
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValidationError2);
          }
        }
      };
      exports.default = ValidationError2;
    }
  });

  // ../utils/dist/is-function.js
  var require_is_function = __commonJS({
    "../utils/dist/is-function.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isAsyncFunction = exports.isFunction = void 0;
      var truetypeof_1 = require_truetypeof();
      var expected = ["asyncfunction", "function"];
      var isFunction2 = function(prop, debug3 = false) {
        const result = (0, truetypeof_1.trueTypeOf)(prop);
        if (expected.includes(result)) {
          return true;
        }
        if (debug3) {
          console.error(`Expect to be Function type! Got ${typeof prop}`);
        }
        return false;
      };
      exports.isFunction = isFunction2;
      function isAsyncFunction(prop) {
        return (0, truetypeof_1.trueTypeOf)(prop) === expected[0];
      }
      exports.isAsyncFunction = isAsyncFunction;
    }
  });

  // ../utils/dist/regex.js
  var require_regex = __commonJS({
    "../utils/dist/regex.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getRegex = exports.isRegExp = void 0;
      var lodash_1 = require_lodash();
      function isRegExp(pat) {
        return pat instanceof RegExp;
      }
      exports.isRegExp = isRegExp;
      function getRegex2(pattern) {
        switch (true) {
          case isRegExp(pattern):
            return pattern;
          case (0, lodash_1.isString)(pattern):
            return new RegExp(pattern);
          default:
            return false;
        }
      }
      exports.getRegex = getRegex2;
    }
  });

  // node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js
  var require_ms = __commonJS({
    "node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js"(exports, module) {
      var s = 1e3;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      module.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
      };
      function parse(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "weeks":
          case "week":
          case "w":
            return n * w;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return Math.round(ms / d) + "d";
        }
        if (msAbs >= h) {
          return Math.round(ms / h) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms / m) + "m";
        }
        if (msAbs >= s) {
          return Math.round(ms / s) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return plural(ms, msAbs, d, "day");
        }
        if (msAbs >= h) {
          return plural(ms, msAbs, h, "hour");
        }
        if (msAbs >= m) {
          return plural(ms, msAbs, m, "minute");
        }
        if (msAbs >= s) {
          return plural(ms, msAbs, s, "second");
        }
        return ms + " ms";
      }
      function plural(ms, msAbs, n, name10) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms / n) + " " + name10 + (isPlural ? "s" : "");
      }
    }
  });

  // node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/common.js
  var require_common2 = __commonJS({
    "node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/common.js"(exports, module) {
      function setup(env) {
        createDebug.debug = createDebug;
        createDebug.default = createDebug;
        createDebug.coerce = coerce;
        createDebug.disable = disable;
        createDebug.enable = enable;
        createDebug.enabled = enabled;
        createDebug.humanize = require_ms();
        createDebug.destroy = destroy;
        Object.keys(env).forEach((key) => {
          createDebug[key] = env[key];
        });
        createDebug.names = [];
        createDebug.skips = [];
        createDebug.formatters = {};
        function selectColor(namespace) {
          let hash = 0;
          for (let i = 0; i < namespace.length; i++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0;
          }
          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }
        createDebug.selectColor = selectColor;
        function createDebug(namespace) {
          let prevTime;
          let enableOverride = null;
          let namespacesCache;
          let enabledCache;
          function debug3(...args) {
            if (!debug3.enabled) {
              return;
            }
            const self = debug3;
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") {
              args.unshift("%O");
            }
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
              if (match === "%%") {
                return "%";
              }
              index++;
              const formatter = createDebug.formatters[format];
              if (typeof formatter === "function") {
                const val = args[index];
                match = formatter.call(self, val);
                args.splice(index, 1);
                index--;
              }
              return match;
            });
            createDebug.formatArgs.call(self, args);
            const logFn = self.log || createDebug.log;
            logFn.apply(self, args);
          }
          debug3.namespace = namespace;
          debug3.useColors = createDebug.useColors();
          debug3.color = createDebug.selectColor(namespace);
          debug3.extend = extend;
          debug3.destroy = createDebug.destroy;
          Object.defineProperty(debug3, "enabled", {
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
            set: (v) => {
              enableOverride = v;
            }
          });
          if (typeof createDebug.init === "function") {
            createDebug.init(debug3);
          }
          return debug3;
        }
        function extend(namespace, delimiter) {
          const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
          newDebug.log = this.log;
          return newDebug;
        }
        function enable(namespaces) {
          createDebug.save(namespaces);
          createDebug.namespaces = namespaces;
          createDebug.names = [];
          createDebug.skips = [];
          let i;
          const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
          const len2 = split.length;
          for (i = 0; i < len2; i++) {
            if (!split[i]) {
              continue;
            }
            namespaces = split[i].replace(/\*/g, ".*?");
            if (namespaces[0] === "-") {
              createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
            } else {
              createDebug.names.push(new RegExp("^" + namespaces + "$"));
            }
          }
        }
        function disable() {
          const namespaces = [
            ...createDebug.names.map(toNamespace),
            ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
          ].join(",");
          createDebug.enable("");
          return namespaces;
        }
        function enabled(name10) {
          if (name10[name10.length - 1] === "*") {
            return true;
          }
          let i;
          let len2;
          for (i = 0, len2 = createDebug.skips.length; i < len2; i++) {
            if (createDebug.skips[i].test(name10)) {
              return false;
            }
          }
          for (i = 0, len2 = createDebug.names.length; i < len2; i++) {
            if (createDebug.names[i].test(name10)) {
              return true;
            }
          }
          return false;
        }
        function toNamespace(regexp) {
          return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
        }
        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }
          return val;
        }
        function destroy() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
        createDebug.enable(createDebug.load());
        return createDebug;
      }
      module.exports = setup;
    }
  });

  // node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/browser.js
  var require_browser = __commonJS({
    "node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/browser.js"(exports, module) {
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
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
          }
        };
      })();
      exports.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
      ];
      function useColors() {
        if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
          return true;
        }
        if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
          return false;
        }
        return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      function formatArgs(args) {
        args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
        if (!this.useColors) {
          return;
        }
        const c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        let index = 0;
        let lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, (match) => {
          if (match === "%%") {
            return;
          }
          index++;
          if (match === "%c") {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      exports.log = console.debug || console.log || (() => {
      });
      function save(namespaces) {
        try {
          if (namespaces) {
            exports.storage.setItem("debug", namespaces);
          } else {
            exports.storage.removeItem("debug");
          }
        } catch (error) {
        }
      }
      function load() {
        let r;
        try {
          r = exports.storage.getItem("debug");
        } catch (error) {
        }
        if (!r && typeof process !== "undefined" && "env" in process) {
          r = process.env.DEBUG;
        }
        return r;
      }
      function localstorage() {
        try {
          return localStorage;
        } catch (error) {
        }
      }
      module.exports = require_common2()(exports);
      var { formatters } = module.exports;
      formatters.j = function(v) {
        try {
          return JSON.stringify(v);
        } catch (error) {
          return "[UnexpectedJSONParseError]: " + error.message;
        }
      };
    }
  });

  // src/base/string.ts
  var import_lodash = __toESM(require_lodash());
  function checkString(value) {
    return (value + "").trim() !== "" ? (0, import_lodash.isString)(value) : false;
  }

  // src/base/boolean.ts
  function checkBoolean(value) {
    return value !== null && value !== void 0 && typeof value === "boolean";
  }

  // src/base/number.ts
  var import_truetypeof = __toESM(require_truetypeof());
  function checkNumber(value) {
    return (0, import_truetypeof.trueTypeOf)(value) !== "number" ? false : !isNaN(parseFloat(value + ""));
  }
  function checkInteger(value) {
    console.log(`@TODO checkInteger`, value);
  }
  function checkFloat(value) {
    console.log(`@TODO checkFloat`, value);
  }
  function checkUnsigned(value) {
    console.log(`@TODO check unsigned`, value);
  }

  // src/base/any.ts
  function checkAny(value, checkNull = true) {
    if (value !== void 0 && value !== "" && (value + "").trim() !== "") {
      if (checkNull === false || checkNull === true && value !== null) {
        return true;
      }
    }
    return false;
  }

  // src/base/array.ts
  var import_object = __toESM(require_object());

  // src/constants.ts
  var OR_SEPERATOR = "|";
  var BOOLEAN_TYPE = "boolean";
  var STRING_TYPE = "string";
  var NUMBER_TYPE = "number";
  var ARRAY_TYPE = "array";
  var OBJECT_TYPE = "object";
  var ARRAY_TS_TYPE_LFT = "Array<";
  var ARRAY_TYPE_LFT = "array.<";
  var ARRAY_TYPE_RGT = ">";
  var VALIDATE_KEY = "validate";
  var VALIDATE_ASYNC_KEY = "validateAsync";
  var PLUGIN_KEY = "plugin";
  var PLUGIN_FN_KEY = "main";
  var PATTERN_KEY = "pattern";
  var RULES_KEY = "rules";
  var NAME_KEY = "name";
  var PARAMS_KEY = "params";
  var IDX_KEY = "$$idx";
  var VALUE_KEY = "$$value";
  var RESERVED_WORD_ERR = "Your plugin config argument contains reserved keywords";
  var ARG_NOT_MATCH_ERR = "Your params doesn't matching your main argument list";
  var MAIN_NOT_FOUND_ERR = "Can not find 'main' method in your plugin config";
  var KEYWORDS = [
    PARAMS_KEY,
    PATTERN_KEY,
    VALIDATE_KEY,
    VALIDATE_ASYNC_KEY,
    PLUGIN_KEY,
    RULES_KEY,
    "name",
    "type",
    "types",
    "server",
    "tstype",
    "value",
    "optional",
    "tmp",
    "pos",
    "lastResult"
  ];

  // src/base/combine.ts
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

  // src/base/array.ts
  var STYLES = {
    ts: ARRAY_TS_TYPE_LFT,
    jsdoc: ARRAY_TYPE_LFT
  };
  function checkArray(value, type) {
    if (Array.isArray(value)) {
      if (!type) {
        return true;
      }
      let c;
      if (Array.isArray(type)) {
        c = value.filter((v) => {
          const ctn = type.length;
          for (let i = 0; i < ctn; ++i) {
            const t = type[i];
            if (t === ARRAY_TYPE && Array.isArray(v) || t === OBJECT_TYPE && (0, import_object.isPlainObject)(v) || combineCheck(t)(v)) {
              return false;
            }
          }
          return true;
        });
      } else {
        c = value.filter((v) => !combineCheck(type)(v));
      }
      return !(c.length > 0);
    }
    return false;
  }
  function destructArrayStr(type, syntax = "ts") {
    const left = STYLES[syntax];
    if (!left) {
      throw new Error(`Syntax not supported! ${Object.keys(STYLES)}`);
    }
    if (type.indexOf(left) > -1 && type.indexOf(ARRAY_TYPE_RGT) > -1) {
      const _type = type.replace(left, "").replace(ARRAY_TYPE_RGT, "");
      if (_type.indexOf(OR_SEPERATOR)) {
        return _type.split(OR_SEPERATOR);
      }
      return [_type];
    }
    return false;
  }
  function isArrayLike(type) {
    const check1 = destructArrayStr(type);
    if (!check1) {
      return destructArrayStr(type, "jsdoc");
    }
    return false;
  }
  function arrayTypeHandler(p, type) {
    const { arg } = p;
    if (type.length > 1) {
      return !arg.filter((v) => !(type.length > type.filter((t) => !combineCheck(t)(v)).length)).length;
    }
    return type.length > type.filter((t) => !checkArray(arg, t)).length;
  }

  // src/base/object.ts
  var import_object2 = __toESM(require_object());
  function checkObject(value, keys) {
    if ((0, import_object2.isPlainObject)(value)) {
      if (!keys) {
        return true;
      }
      if (typeof keys === "string") {
        return keys in value;
      } else if (checkArray(keys)) {
        if (typeof keys[0] === "string") {
          return checkIfKeysInObj(value, keys);
        }
        return checkIfNameTypeInObj(value, keys);
      }
    }
    return false;
  }
  function checkIfKeysInObj(value, keys) {
    return !keys.filter((key) => {
      return !(key in value);
    }).length;
  }
  function checkIfNameTypeInObj(value, keys) {
    return !keys.filter((key) => {
      const _value = value[key.name];
      return !(key.type.length > key.type.filter((type) => {
        let tmp;
        if (_value !== void 0) {
          if ((tmp = isArrayLike(type)) !== false) {
            return !arrayTypeHandler({ arg: _value }, tmp);
          }
          return !combineCheck(type)(_value);
        }
        return true;
      }).length);
    }).length;
  }
  var objectTypeHandler = function(p) {
    const { arg, param } = p;
    const _args = [arg];
    if (Array.isArray(param.keys) && param.keys.length) {
      _args.push(param.keys);
    }
    return Reflect.apply(checkObject, null, _args);
  };
  var isEmptyObject = function(value) {
    if ((0, import_object2.isPlainObject)(value)) {
      const keys = Object.keys(value);
      return !keys.length;
    }
    return false;
  };

  // src/base/union.ts
  var import_chain_promises = __toESM(require_chain_promises());
  function typeAsFail(result, type) {
    return result || type;
  }
  function generateReversePromisesFn(value, types, extended) {
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
    }).map((fn) => () => __async(this, null, function* () {
      const result = fn();
      return result === true ? Promise.reject(true) : Promise.resolve(result);
    }));
  }
  function checkUnion(value, types, extended) {
    return __async(this, null, function* () {
      const ps = generateReversePromisesFn(value, types, extended);
      return new Promise((resolver, rejecter) => {
        (0, import_chain_promises.queuePromisesProcess)(ps, types[0]).then((type) => {
          rejecter(type);
        }).catch((res) => {
          resolver(res);
        });
      });
    });
  }
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

  // src/lib/promisify.ts
  function promisify(fn) {
    return (...args) => __async(this, null, function* () {
      const result = yield Reflect.apply(fn, null, args);
      return result ? Promise.resolve(result) : Promise.reject(result);
    });
  }
  function reversePromisifyResult(fn) {
    return (...args) => __async(this, null, function* () {
      const result = yield Reflect.apply(fn, null, args);
      return result ? Promise.reject(result) : Promise.resolve(result);
    });
  }

  // src/lib/len.ts
  function len(value) {
    return typeof value === "string" ? value.length : value;
  }

  // src/plugins/more-than.ts
  var name = "moreThan";
  function main(num, value) {
    return len(value) > num;
  }
  var more_than_default = {
    name,
    main,
    params: ["num"]
  };

  // src/plugins/less-than.ts
  var name2 = "lessThan";
  function main2(num, value) {
    return len(value) < num;
  }
  var less_than_default = {
    name: name2,
    main: main2,
    params: ["num"]
  };

  // src/plugins/between.ts
  var name3 = "between";
  function main3(max, min, value) {
    return less_than_default.main(max, value) && more_than_default.main(min, value);
  }
  var between_default = {
    main: main3,
    name: name3,
    params: ["max", "min"]
  };

  // src/plugins/email.ts
  var name4 = "email";
  function main4(value) {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value);
  }
  var email_default = {
    main: main4,
    name: name4
  };

  // src/plugins/int.ts
  var name5 = "int";
  function main5(value) {
    return Number.isInteger(value);
  }
  var int_default = {
    name: name5,
    main: main5
  };

  // src/plugins/less-than-equal.ts
  var name6 = "lessThanEqual";
  function main6(num, value) {
    return len(value) <= num;
  }
  var less_than_equal_default = {
    name: name6,
    main: main6,
    params: ["num"]
  };

  // src/plugins/more-than-equal.ts
  var name7 = "moreThanEqual";
  function main7(num, value) {
    return len(value) >= num;
  }
  var more_than_equal_default = {
    name: name7,
    main: main7,
    params: ["num"]
  };

  // src/plugins/uint.ts
  var name8 = "unit";
  function main8(value) {
    return Number.isInteger(value) && value >= 0;
  }
  var uint_default = {
    name: name8,
    main: main8
  };

  // src/plugins/within.ts
  var name9 = "main";
  function main9(max, min, value) {
    return less_than_equal_default.main(max, value) && more_than_equal_default.main(min, value);
  }
  var within_default = {
    name: name9,
    main: main9,
    params: ["max", "min"]
  };

  // src/plugins/index.ts
  var plugins = [
    between_default,
    email_default,
    int_default,
    less_than_equal_default,
    less_than_default,
    more_than_equal_default,
    more_than_default,
    uint_default,
    within_default
  ];

  // src/plugins/plugins.ts
  var import_lodash2 = __toESM(require_lodash());
  var import_general_exception = __toESM(require_general_exception());
  function curryPlugin(input, pluginConfig) {
    const { plugin } = input;
    if (plugin) {
      const params = pluginConfig[PARAMS_KEY];
      if (params) {
        if (!checkArgKeys(input, params)) {
          throw new import_general_exception.default(`Expected params: ${params.join(",")} not found!`);
        }
        const args = params.map((param) => input[param]);
        return Reflect.apply((0, import_lodash2.curry)(pluginConfig.main), null, args);
      } else {
        throw new import_general_exception.default(`This plugin ${pluginConfig.name} can not be curry`);
      }
    }
    throw new import_general_exception.default(`Unable to find plugin in config`);
  }
  function checkArgKeys(config, params) {
    return params.filter((key) => config[key]).length === params.length;
  }

  // src/lib/common.ts
  var import_validation_error = __toESM(require_validation_error());
  var import_general_exception2 = __toESM(require_general_exception());
  var import_common = __toESM(require_common());
  var import_object4 = __toESM(require_object());
  var import_is_function = __toESM(require_is_function());
  var import_regex = __toESM(require_regex());
  var import_debug = __toESM(require_browser());
  var debug = (0, import_debug.default)("jsonql:validator-core:common");
  function checkPluginArg(params) {
    return !(params.filter((param) => KEYWORDS.includes(param)).length > 0);
  }
  function pluginHasFunc(rule) {
    return rule[PLUGIN_FN_KEY] && (0, import_is_function.isFunction)(rule[PLUGIN_FN_KEY]);
  }
  function getArgsKey(rule) {
    const params = extractFnArgs(rule.main.toString());
    params.pop();
    return params;
  }
  function searchParamsKey(rule) {
    const params = getArgsKey(rule);
    const l = params.length;
    if (l === 0) {
      return rule;
    }
    if (!checkPluginArg(params)) {
      throw new import_general_exception2.default(RESERVED_WORD_ERR);
    }
    rule[PARAMS_KEY] = params;
    return rule;
  }
  function paramMatches(rule) {
    const params = getArgsKey(rule);
    const l = params.length;
    if (l === 0 && !rule[PARAMS_KEY]) {
      return true;
    }
    const _params = rule.params !== void 0 && Array.isArray(rule.params) ? rule.params : false;
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
  function extractFnArgs(fnStr) {
    return fnStr.split("(")[1].split(")")[0].split(",").map((t) => t.trim()).filter((t) => t !== "");
  }
  function constructRuleCb(argName, ruleFn, ruleName) {
    return (value, lastResult, pos) => __async(this, null, function* () {
      return Reflect.apply(ruleFn, null, [value]).then(successThen(argName, value, lastResult, pos)).catch((error) => {
        debug("failed", argName, value, error, pos);
        return Promise.reject(new import_validation_error.default(ruleName, pos));
      });
    });
  }
  function successThen(argName, value, lastResult, pos) {
    return (result) => {
      const idx = pos[0];
      debug("passed", argName, value, result, pos);
      debug("lastResult", lastResult);
      const newResult = { [IDX_KEY]: idx, [VALUE_KEY]: value };
      if (lastResult === void 0) {
        return { [argName]: newResult };
      }
      if (argName in lastResult) {
        const lr = lastResult[argName];
        if (isResultPackage(lr)) {
          if (!lr.includes(newResult)) {
            lastResult[argName].push(newResult);
          }
        } else if (lr[IDX_KEY] !== idx) {
          lastResult[argName] = (0, import_common.toArray)(lastResult[argName]).concat([newResult]);
        }
        return lastResult;
      }
      return (0, import_object4.assign)(lastResult, { [argName]: newResult });
    };
  }
  function isResultPackage(lastResult, key = IDX_KEY) {
    try {
      if (Array.isArray(lastResult)) {
        return !!lastResult.filter((res) => key in res).length;
      }
    } catch (e) {
      debug("isResultPackage", e);
    }
    return false;
  }
  function patternPluginFanctory(pattern) {
    const regex = (0, import_regex.getRegex)(pattern);
    return (value) => __async(this, null, function* () {
      return regex.test(value) ? Promise.resolve(true) : Promise.reject(false);
    });
  }

  // src/validator-plugins.ts
  var import_general_exception3 = __toESM(require_general_exception());
  var import_debug2 = __toESM(require_browser());
  var debug2 = (0, import_debug2.default)("jsonql:validator-core:validator-plugin");
  var ValidatorPlugins = class {
    constructor($version) {
      this.$version = $version;
      this._plugins = /* @__PURE__ */ new Map();
      this._internalPluginNames = [];
      plugins.forEach((plugin) => {
        const name10 = plugin[NAME_KEY];
        this._internalPluginNames.push(name10);
        this._registerPlugin(name10, plugin, true);
      });
    }
    lookupPlugin(input, argName) {
      const pluginName = input[PLUGIN_KEY];
      if (pluginName && this._plugins.has(pluginName)) {
        const pluginConfig = this._plugins.get(pluginName);
        if (pluginConfig[PLUGIN_FN_KEY] && !pluginConfig[PARAMS_KEY]) {
          pluginConfig[VALIDATE_ASYNC_KEY] = promisify(pluginConfig[PLUGIN_FN_KEY]);
        }
        if (pluginConfig && pluginConfig[VALIDATE_ASYNC_KEY] && !pluginConfig[PARAMS_KEY]) {
          return constructRuleCb(argName, pluginConfig[VALIDATE_ASYNC_KEY], pluginName);
        }
        if (pluginConfig && pluginConfig[PARAMS_KEY]) {
          debug2("pluginConfig --->", pluginConfig);
          debug2("input----------->", input);
          const _input = input;
          return constructRuleCb(argName, promisify(curryPlugin(_input, pluginConfig)), pluginName);
        }
      }
      debug2("lookupPlugin", "unable to find", pluginName);
      throw new import_general_exception3.default(`Unable to find plugin: ${pluginName}`);
    }
    registerPlugin(name10, pluginConfig) {
      this._registerPlugin(name10, pluginConfig);
    }
    _registerExternalPlugin(name10, pluginConfig) {
      this._registerPlugin(name10, pluginConfig, false, true);
    }
    export(external = true) {
      const plugins2 = [];
      this._plugins.forEach((p, n) => {
        if (!this.isBuiltIn(n) && p.external === external) {
          plugins2.push(p);
        }
      });
      return plugins2;
    }
    isBuiltIn(pluginName) {
      return this._internalPluginNames.includes(pluginName);
    }
    _registerPlugin(name10, pluginConfig, skipCheck = false, external = false) {
      if (!skipCheck) {
        if (this._plugins.has(name10)) {
          throw new import_general_exception3.default(`plugin ${name10} already existed!`);
        }
        if (!pluginHasFunc(pluginConfig)) {
          debug2("registerPlugin", MAIN_NOT_FOUND_ERR);
          throw new import_general_exception3.default(MAIN_NOT_FOUND_ERR);
        }
        if (pluginConfig[PARAMS_KEY] === void 0) {
          pluginConfig = searchParamsKey(pluginConfig);
          debug2("auto generate params for plugin", pluginConfig);
        } else if (pluginConfig[PARAMS_KEY] !== void 0) {
          if (!checkPluginArg(pluginConfig[PARAMS_KEY])) {
            debug2("registerPlugin", RESERVED_WORD_ERR);
            throw new import_general_exception3.default(RESERVED_WORD_ERR);
          }
          if (!paramMatches(pluginConfig)) {
            debug2("registerPlugin", ARG_NOT_MATCH_ERR);
            throw new import_general_exception3.default(ARG_NOT_MATCH_ERR);
          }
        }
      }
      pluginConfig.name = name10;
      pluginConfig.external = external;
      this._plugins.set(name10, pluginConfig);
    }
  };
})();
