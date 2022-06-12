"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEMA_KEY = exports.PARAMS_KEY = exports.NAME_KEY = exports.RULES_KEY = exports.PATTERN_KEY = exports.PLUGIN_FN_KEY = exports.PLUGIN_KEY = exports.VALIDATE_ASYNC_KEY = exports.VALIDATE_KEY = exports.Validators = void 0;
// start your project here
var validators_1 = require("./validators");
Object.defineProperty(exports, "Validators", { enumerable: true, get: function () { return validators_1.Validators; } });
// we need to export some of the constants here as well
var constants_1 = require("@jsonql/validator-core/dist/constants");
Object.defineProperty(exports, "VALIDATE_KEY", { enumerable: true, get: function () { return constants_1.VALIDATE_KEY; } });
Object.defineProperty(exports, "VALIDATE_ASYNC_KEY", { enumerable: true, get: function () { return constants_1.VALIDATE_ASYNC_KEY; } });
Object.defineProperty(exports, "PLUGIN_KEY", { enumerable: true, get: function () { return constants_1.PLUGIN_KEY; } });
Object.defineProperty(exports, "PLUGIN_FN_KEY", { enumerable: true, get: function () { return constants_1.PLUGIN_FN_KEY; } });
Object.defineProperty(exports, "PATTERN_KEY", { enumerable: true, get: function () { return constants_1.PATTERN_KEY; } });
Object.defineProperty(exports, "RULES_KEY", { enumerable: true, get: function () { return constants_1.RULES_KEY; } });
Object.defineProperty(exports, "NAME_KEY", { enumerable: true, get: function () { return constants_1.NAME_KEY; } });
Object.defineProperty(exports, "PARAMS_KEY", { enumerable: true, get: function () { return constants_1.PARAMS_KEY; } });
var constants_2 = require("./constants");
Object.defineProperty(exports, "SCHEMA_KEY", { enumerable: true, get: function () { return constants_2.SCHEMA_KEY; } });
