"use strict";
// @jsonql/validator/validator
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkResolverReturnsAsync = exports.checkResolverReturns = exports.checkReturnsAsync = exports.checkReturns = exports.validateAsync = exports.validateSync = exports.normalizeArgs = void 0;
var main_1 = require("./main");
Object.defineProperty(exports, "normalizeArgs", { enumerable: true, get: function () { return main_1.normalizeArgs; } });
Object.defineProperty(exports, "validateSync", { enumerable: true, get: function () { return main_1.validateSync; } });
Object.defineProperty(exports, "validateAsync", { enumerable: true, get: function () { return main_1.validateAsync; } });
var returns_1 = require("./returns");
Object.defineProperty(exports, "checkReturns", { enumerable: true, get: function () { return returns_1.checkReturns; } });
Object.defineProperty(exports, "checkReturnsAsync", { enumerable: true, get: function () { return returns_1.checkReturnsAsync; } });
Object.defineProperty(exports, "checkResolverReturns", { enumerable: true, get: function () { return returns_1.checkResolverReturns; } });
Object.defineProperty(exports, "checkResolverReturnsAsync", { enumerable: true, get: function () { return returns_1.checkResolverReturnsAsync; } });
