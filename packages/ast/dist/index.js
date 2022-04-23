"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickInputFile = exports.tsFunctionParser = exports.tsClassParser = void 0;
// @jsonql/ast main export 
var main_1 = require("./main");
Object.defineProperty(exports, "tsClassParser", { enumerable: true, get: function () { return main_1.tsClassParser; } });
Object.defineProperty(exports, "tsFunctionParser", { enumerable: true, get: function () { return main_1.tsFunctionParser; } });
// this will get use in the other Decorator
var common_1 = require("./common");
Object.defineProperty(exports, "pickInputFile", { enumerable: true, get: function () { return common_1.pickInputFile; } });
