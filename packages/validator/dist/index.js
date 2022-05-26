"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = exports.ValidatorPlugins = void 0;
// @jsonql/validator/validator
// class method
var validator_core_1 = require("@jsonql/validator-core");
Object.defineProperty(exports, "ValidatorPlugins", { enumerable: true, get: function () { return validator_core_1.ValidatorPlugins; } });
var validator_factory_1 = require("./validator-factory");
Object.defineProperty(exports, "Validator", { enumerable: true, get: function () { return validator_factory_1.Validator; } });
