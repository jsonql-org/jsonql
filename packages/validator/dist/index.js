"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const tslib_1 = require("tslib");
// @jsonql/validator/validator
// class method
var validator_factory_1 = require("./validator-factory");
Object.defineProperty(exports, "Validator", { enumerable: true, get: function () { return validator_factory_1.Validator; } });
// also export all the constants
tslib_1.__exportStar(require("./constants"), exports);
