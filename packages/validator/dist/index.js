"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RETURN_AS_RAW = exports.RETURN_AS_ARR = exports.RETURN_AS_OBJ = exports.TS_TYPE_NAME = exports.TS_TYPE_REF = exports.TS_TYPE_LIT = exports.DEFAULT_VALUE = exports.TS_ARRAY_TYPE = exports.TS_UNION_TYPE = exports.SPREAD_ARG_TYPE = exports.Validator = void 0;
// @jsonql/validator/validator
// class method
var validator_factory_1 = require("./validator-factory");
Object.defineProperty(exports, "Validator", { enumerable: true, get: function () { return validator_factory_1.Validator; } });
// also export all the constants
var constants_1 = require("./constants");
Object.defineProperty(exports, "SPREAD_ARG_TYPE", { enumerable: true, get: function () { return constants_1.SPREAD_ARG_TYPE; } });
Object.defineProperty(exports, "TS_UNION_TYPE", { enumerable: true, get: function () { return constants_1.TS_UNION_TYPE; } });
Object.defineProperty(exports, "TS_ARRAY_TYPE", { enumerable: true, get: function () { return constants_1.TS_ARRAY_TYPE; } });
Object.defineProperty(exports, "DEFAULT_VALUE", { enumerable: true, get: function () { return constants_1.DEFAULT_VALUE; } });
Object.defineProperty(exports, "TS_TYPE_LIT", { enumerable: true, get: function () { return constants_1.TS_TYPE_LIT; } });
Object.defineProperty(exports, "TS_TYPE_REF", { enumerable: true, get: function () { return constants_1.TS_TYPE_REF; } });
Object.defineProperty(exports, "TS_TYPE_NAME", { enumerable: true, get: function () { return constants_1.TS_TYPE_NAME; } });
Object.defineProperty(exports, "RETURN_AS_OBJ", { enumerable: true, get: function () { return constants_1.RETURN_AS_OBJ; } });
Object.defineProperty(exports, "RETURN_AS_ARR", { enumerable: true, get: function () { return constants_1.RETURN_AS_ARR; } });
Object.defineProperty(exports, "RETURN_AS_RAW", { enumerable: true, get: function () { return constants_1.RETURN_AS_RAW; } });
