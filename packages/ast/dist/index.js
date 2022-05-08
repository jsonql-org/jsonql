"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripAllTypeParams = exports.pickInputFile = void 0;
const tslib_1 = require("tslib");
// @jsonql/ast main export
tslib_1.__exportStar(require("./main"), exports);
// now export everything from prosssors
tslib_1.__exportStar(require("./lib/processors"), exports);
// this will get use in the other Decorator
var common_1 = require("./lib/common");
Object.defineProperty(exports, "pickInputFile", { enumerable: true, get: function () { return common_1.pickInputFile; } });
Object.defineProperty(exports, "stripAllTypeParams", { enumerable: true, get: function () { return common_1.stripAllTypeParams; } });
