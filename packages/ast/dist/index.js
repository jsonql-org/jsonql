"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripTypeParams = exports.pickInputFile = exports.tsFunctionParser = exports.tsClassParser = exports.tsFileParserSync = exports.tsFileParser = void 0;
// @jsonql/ast main export
var main_1 = require("./main");
Object.defineProperty(exports, "tsFileParser", { enumerable: true, get: function () { return main_1.tsFileParser; } });
Object.defineProperty(exports, "tsFileParserSync", { enumerable: true, get: function () { return main_1.tsFileParserSync; } });
Object.defineProperty(exports, "tsClassParser", { enumerable: true, get: function () { return main_1.tsClassParser; } });
Object.defineProperty(exports, "tsFunctionParser", { enumerable: true, get: function () { return main_1.tsFunctionParser; } });
// this will get use in the other Decorator
var common_1 = require("./lib/common");
Object.defineProperty(exports, "pickInputFile", { enumerable: true, get: function () { return common_1.pickInputFile; } });
Object.defineProperty(exports, "stripTypeParams", { enumerable: true, get: function () { return common_1.stripTypeParams; } });
