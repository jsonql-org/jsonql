"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = exports.isPlainObject = exports.isString = exports.isNaN = void 0;
// group all the lodash code in one place
var lodash_1 = require("@jsonql/utils/dist/lodash");
Object.defineProperty(exports, "isNaN", { enumerable: true, get: function () { return lodash_1.isNaN; } });
Object.defineProperty(exports, "isString", { enumerable: true, get: function () { return lodash_1.isString; } });
Object.defineProperty(exports, "isPlainObject", { enumerable: true, get: function () { return lodash_1.isPlainObject; } });
var common_1 = require("@jsonql/utils/dist/common");
Object.defineProperty(exports, "isFunction", { enumerable: true, get: function () { return common_1.isFunction; } });
