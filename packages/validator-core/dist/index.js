"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCoreCurryPlugin = exports.curryPlugin = exports.plugins = exports.reversePromisifyResult = exports.promisify = exports.checkUnionSync = exports.generateReversePromisesFn = exports.checkUnion = exports.combineCheck = exports.isEmptyObject = exports.objectTypeHandler = exports.checkObject = exports.checkString = exports.checkUnsigned = exports.checkFloat = exports.checkInteger = exports.checkNumber = exports.checkBoolean = exports.arrayTypeHandler = exports.isArrayLike = exports.checkArray = exports.checkAny = void 0;
// start your project here
// this contains all the primitive types checking methods
const string_1 = require("./base/string");
Object.defineProperty(exports, "checkString", { enumerable: true, get: function () { return string_1.checkString; } });
const boolean_1 = require("./base/boolean");
Object.defineProperty(exports, "checkBoolean", { enumerable: true, get: function () { return boolean_1.checkBoolean; } });
const number_1 = require("./base/number");
Object.defineProperty(exports, "checkNumber", { enumerable: true, get: function () { return number_1.checkNumber; } });
Object.defineProperty(exports, "checkInteger", { enumerable: true, get: function () { return number_1.checkInteger; } });
Object.defineProperty(exports, "checkFloat", { enumerable: true, get: function () { return number_1.checkFloat; } });
Object.defineProperty(exports, "checkUnsigned", { enumerable: true, get: function () { return number_1.checkUnsigned; } });
const any_1 = require("./base/any");
Object.defineProperty(exports, "checkAny", { enumerable: true, get: function () { return any_1.checkAny; } });
const array_1 = require("./base/array");
Object.defineProperty(exports, "checkArray", { enumerable: true, get: function () { return array_1.checkArray; } });
Object.defineProperty(exports, "isArrayLike", { enumerable: true, get: function () { return array_1.isArrayLike; } });
Object.defineProperty(exports, "arrayTypeHandler", { enumerable: true, get: function () { return array_1.arrayTypeHandler; } });
const object_1 = require("./base/object");
Object.defineProperty(exports, "checkObject", { enumerable: true, get: function () { return object_1.checkObject; } });
Object.defineProperty(exports, "objectTypeHandler", { enumerable: true, get: function () { return object_1.objectTypeHandler; } });
Object.defineProperty(exports, "isEmptyObject", { enumerable: true, get: function () { return object_1.isEmptyObject; } });
// wrapper fn
const combine_1 = require("./base/combine");
Object.defineProperty(exports, "combineCheck", { enumerable: true, get: function () { return combine_1.combineCheck; } });
// union type check
const union_1 = require("./base/union");
Object.defineProperty(exports, "checkUnion", { enumerable: true, get: function () { return union_1.checkUnion; } });
Object.defineProperty(exports, "generateReversePromisesFn", { enumerable: true, get: function () { return union_1.generateReversePromisesFn; } });
Object.defineProperty(exports, "checkUnionSync", { enumerable: true, get: function () { return union_1.checkUnionSync; } });
const promisify_1 = require("./lib/promisify");
Object.defineProperty(exports, "promisify", { enumerable: true, get: function () { return promisify_1.promisify; } });
Object.defineProperty(exports, "reversePromisifyResult", { enumerable: true, get: function () { return promisify_1.reversePromisifyResult; } });
// for some reason the downstream keep complaining the js version has no export member of X
const plugins_1 = require("./plugins");
Object.defineProperty(exports, "plugins", { enumerable: true, get: function () { return plugins_1.plugins; } });
// avoid a circular reference
const plugins_2 = require("./plugins/plugins");
Object.defineProperty(exports, "curryPlugin", { enumerable: true, get: function () { return plugins_2.curryPlugin; } });
Object.defineProperty(exports, "createCoreCurryPlugin", { enumerable: true, get: function () { return plugins_2.createCoreCurryPlugin; } });
