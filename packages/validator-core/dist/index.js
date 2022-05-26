"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALUE_KEY = exports.IDX_KEY = exports.ORG_KEY = exports.PARAMS_KEY = exports.NAME_KEY = exports.RULES_KEY = exports.PATTERN_KEY = exports.PLUGIN_FN_KEY = exports.PLUGIN_KEY = exports.VALIDATE_ASYNC_KEY = exports.VALIDATE_KEY = exports.KEYWORDS = exports.ValidatorPlugins = exports.patternPluginFanctory = exports.isResultPackage = exports.successThen = exports.constructRuleCb = exports.pluginHasFunc = exports.checkPluginArg = exports.curryPlugin = exports.plugins = exports.reversePromisifyResult = exports.promisify = exports.checkUnionSync = exports.generateReversePromisesFn = exports.checkUnion = exports.combineCheck = exports.isEmptyObject = exports.objectTypeHandler = exports.checkObject = exports.arrayTypeHandler = exports.isArrayLike = exports.checkArray = exports.checkAny = exports.checkUnsigned = exports.checkFloat = exports.checkInteger = exports.checkNumber = exports.checkBoolean = exports.checkString = void 0;
// start your project here
// this contains all the primitive types checking methods
var string_1 = require("./base/string");
Object.defineProperty(exports, "checkString", { enumerable: true, get: function () { return string_1.checkString; } });
var boolean_1 = require("./base/boolean");
Object.defineProperty(exports, "checkBoolean", { enumerable: true, get: function () { return boolean_1.checkBoolean; } });
var number_1 = require("./base/number");
Object.defineProperty(exports, "checkNumber", { enumerable: true, get: function () { return number_1.checkNumber; } });
Object.defineProperty(exports, "checkInteger", { enumerable: true, get: function () { return number_1.checkInteger; } });
Object.defineProperty(exports, "checkFloat", { enumerable: true, get: function () { return number_1.checkFloat; } });
Object.defineProperty(exports, "checkUnsigned", { enumerable: true, get: function () { return number_1.checkUnsigned; } });
var any_1 = require("./base/any");
Object.defineProperty(exports, "checkAny", { enumerable: true, get: function () { return any_1.checkAny; } });
var array_1 = require("./base/array");
Object.defineProperty(exports, "checkArray", { enumerable: true, get: function () { return array_1.checkArray; } });
Object.defineProperty(exports, "isArrayLike", { enumerable: true, get: function () { return array_1.isArrayLike; } });
Object.defineProperty(exports, "arrayTypeHandler", { enumerable: true, get: function () { return array_1.arrayTypeHandler; } });
var object_1 = require("./base/object");
Object.defineProperty(exports, "checkObject", { enumerable: true, get: function () { return object_1.checkObject; } });
Object.defineProperty(exports, "objectTypeHandler", { enumerable: true, get: function () { return object_1.objectTypeHandler; } });
Object.defineProperty(exports, "isEmptyObject", { enumerable: true, get: function () { return object_1.isEmptyObject; } });
// wrapper fn
var combine_1 = require("./base/combine");
Object.defineProperty(exports, "combineCheck", { enumerable: true, get: function () { return combine_1.combineCheck; } });
// union type check
var union_1 = require("./base/union");
Object.defineProperty(exports, "checkUnion", { enumerable: true, get: function () { return union_1.checkUnion; } });
Object.defineProperty(exports, "generateReversePromisesFn", { enumerable: true, get: function () { return union_1.generateReversePromisesFn; } });
Object.defineProperty(exports, "checkUnionSync", { enumerable: true, get: function () { return union_1.checkUnionSync; } });
var promisify_1 = require("./lib/promisify");
Object.defineProperty(exports, "promisify", { enumerable: true, get: function () { return promisify_1.promisify; } });
Object.defineProperty(exports, "reversePromisifyResult", { enumerable: true, get: function () { return promisify_1.reversePromisifyResult; } });
// for some reason the downstream keep complaining the js version has no export member of X
var plugins_1 = require("./plugins");
Object.defineProperty(exports, "plugins", { enumerable: true, get: function () { return plugins_1.plugins; } });
// avoid a circular reference
var plugins_2 = require("./plugins/plugins");
Object.defineProperty(exports, "curryPlugin", { enumerable: true, get: function () { return plugins_2.curryPlugin; } });
var common_1 = require("./lib/common");
Object.defineProperty(exports, "checkPluginArg", { enumerable: true, get: function () { return common_1.checkPluginArg; } });
Object.defineProperty(exports, "pluginHasFunc", { enumerable: true, get: function () { return common_1.pluginHasFunc; } });
Object.defineProperty(exports, "constructRuleCb", { enumerable: true, get: function () { return common_1.constructRuleCb; } });
Object.defineProperty(exports, "successThen", { enumerable: true, get: function () { return common_1.successThen; } });
Object.defineProperty(exports, "isResultPackage", { enumerable: true, get: function () { return common_1.isResultPackage; } });
Object.defineProperty(exports, "patternPluginFanctory", { enumerable: true, get: function () { return common_1.patternPluginFanctory; } });
var validator_plugins_1 = require("./validator-plugins");
Object.defineProperty(exports, "ValidatorPlugins", { enumerable: true, get: function () { return validator_plugins_1.ValidatorPlugins; } });
// export all constants
var constants_1 = require("./constants");
Object.defineProperty(exports, "KEYWORDS", { enumerable: true, get: function () { return constants_1.KEYWORDS; } });
Object.defineProperty(exports, "VALIDATE_KEY", { enumerable: true, get: function () { return constants_1.VALIDATE_KEY; } });
Object.defineProperty(exports, "VALIDATE_ASYNC_KEY", { enumerable: true, get: function () { return constants_1.VALIDATE_ASYNC_KEY; } });
Object.defineProperty(exports, "PLUGIN_KEY", { enumerable: true, get: function () { return constants_1.PLUGIN_KEY; } });
Object.defineProperty(exports, "PLUGIN_FN_KEY", { enumerable: true, get: function () { return constants_1.PLUGIN_FN_KEY; } });
Object.defineProperty(exports, "PATTERN_KEY", { enumerable: true, get: function () { return constants_1.PATTERN_KEY; } });
Object.defineProperty(exports, "RULES_KEY", { enumerable: true, get: function () { return constants_1.RULES_KEY; } });
Object.defineProperty(exports, "NAME_KEY", { enumerable: true, get: function () { return constants_1.NAME_KEY; } });
Object.defineProperty(exports, "PARAMS_KEY", { enumerable: true, get: function () { return constants_1.PARAMS_KEY; } });
Object.defineProperty(exports, "ORG_KEY", { enumerable: true, get: function () { return constants_1.ORG_KEY; } });
Object.defineProperty(exports, "IDX_KEY", { enumerable: true, get: function () { return constants_1.IDX_KEY; } });
Object.defineProperty(exports, "VALUE_KEY", { enumerable: true, get: function () { return constants_1.VALUE_KEY; } });
