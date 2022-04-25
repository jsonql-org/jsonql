"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUnion = exports.debug = exports.combineCheck = exports.objectTypeHandler = exports.checkObject = exports.checkString = exports.checkUnsigned = exports.checkFloat = exports.checkInteger = exports.checkNumber = exports.checkBoolean = exports.arrayTypeHandler = exports.isArrayLike = exports.checkArray = exports.checkAny = void 0;
// this contains all the primitive types checking methods
var any_1 = require("./any");
Object.defineProperty(exports, "checkAny", { enumerable: true, get: function () { return any_1.checkAny; } });
var array_1 = require("./array");
Object.defineProperty(exports, "checkArray", { enumerable: true, get: function () { return array_1.checkArray; } });
Object.defineProperty(exports, "isArrayLike", { enumerable: true, get: function () { return array_1.isArrayLike; } });
Object.defineProperty(exports, "arrayTypeHandler", { enumerable: true, get: function () { return array_1.arrayTypeHandler; } });
var boolean_1 = require("./boolean");
Object.defineProperty(exports, "checkBoolean", { enumerable: true, get: function () { return boolean_1.checkBoolean; } });
var number_1 = require("./number");
Object.defineProperty(exports, "checkNumber", { enumerable: true, get: function () { return number_1.checkNumber; } });
Object.defineProperty(exports, "checkInteger", { enumerable: true, get: function () { return number_1.checkInteger; } });
Object.defineProperty(exports, "checkFloat", { enumerable: true, get: function () { return number_1.checkFloat; } });
Object.defineProperty(exports, "checkUnsigned", { enumerable: true, get: function () { return number_1.checkUnsigned; } });
var string_1 = require("./string");
Object.defineProperty(exports, "checkString", { enumerable: true, get: function () { return string_1.checkString; } });
var object_1 = require("./object");
Object.defineProperty(exports, "checkObject", { enumerable: true, get: function () { return object_1.checkObject; } });
Object.defineProperty(exports, "objectTypeHandler", { enumerable: true, get: function () { return object_1.objectTypeHandler; } });
// wrapper fn
var combine_1 = require("./combine");
Object.defineProperty(exports, "combineCheck", { enumerable: true, get: function () { return combine_1.combineCheck; } });
var debug_1 = require("./debug");
Object.defineProperty(exports, "debug", { enumerable: true, get: function () { return debug_1.debug; } });
// union type check
var union_1 = require("./union");
Object.defineProperty(exports, "checkUnion", { enumerable: true, get: function () { return union_1.checkUnion; } });
