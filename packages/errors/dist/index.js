"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorNameByInstance = exports.getErrorNameByInstanceWithDefault = exports.getErrorByStatus = exports.finalCatch = exports.JSONQL_ERRORS_INFO = exports.UNKNOWN_ERROR = exports.GeneralError = exports.JsonqlServerError = exports.JsonqlError = exports.JsonqlValidationError = exports.JsonqlCheckerError = exports.JsonqlTypeError = exports.JsonqlEnumError = exports.JsonqlResolverNotFoundError = exports.JsonqlResolverAppError = exports.JsonqlContractAuthError = exports.JsonqlAuthorisationError = exports.JsonqlForbiddenError = exports.Jsonql500Error = exports.Jsonql406Error = void 0;
const tslib_1 = require("tslib");
// server side
const base_1 = require("./base");
Object.defineProperty(exports, "Jsonql406Error", { enumerable: true, get: function () { return base_1.Jsonql406Error; } });
Object.defineProperty(exports, "Jsonql500Error", { enumerable: true, get: function () { return base_1.Jsonql500Error; } });
Object.defineProperty(exports, "JsonqlForbiddenError", { enumerable: true, get: function () { return base_1.JsonqlForbiddenError; } });
Object.defineProperty(exports, "JsonqlAuthorisationError", { enumerable: true, get: function () { return base_1.JsonqlAuthorisationError; } });
Object.defineProperty(exports, "JsonqlContractAuthError", { enumerable: true, get: function () { return base_1.JsonqlContractAuthError; } });
Object.defineProperty(exports, "JsonqlResolverAppError", { enumerable: true, get: function () { return base_1.JsonqlResolverAppError; } });
Object.defineProperty(exports, "JsonqlResolverNotFoundError", { enumerable: true, get: function () { return base_1.JsonqlResolverNotFoundError; } });
Object.defineProperty(exports, "JsonqlEnumError", { enumerable: true, get: function () { return 
    // check options error
    base_1.JsonqlEnumError; } });
Object.defineProperty(exports, "JsonqlTypeError", { enumerable: true, get: function () { return base_1.JsonqlTypeError; } });
Object.defineProperty(exports, "JsonqlCheckerError", { enumerable: true, get: function () { return base_1.JsonqlCheckerError; } });
Object.defineProperty(exports, "JsonqlValidationError", { enumerable: true, get: function () { return 
    // share
    base_1.JsonqlValidationError; } });
Object.defineProperty(exports, "JsonqlError", { enumerable: true, get: function () { return base_1.JsonqlError; } });
Object.defineProperty(exports, "JsonqlServerError", { enumerable: true, get: function () { return base_1.JsonqlServerError; } });
Object.defineProperty(exports, "GeneralError", { enumerable: true, get: function () { return base_1.GeneralError; } });
// constants
const constants_1 = require("./constants");
Object.defineProperty(exports, "UNKNOWN_ERROR", { enumerable: true, get: function () { return constants_1.UNKNOWN_ERROR; } });
Object.defineProperty(exports, "JSONQL_ERRORS_INFO", { enumerable: true, get: function () { return constants_1.JSONQL_ERRORS_INFO; } });
// export all the functions
const final_catch_1 = tslib_1.__importDefault(require("./fn/final-catch"));
exports.finalCatch = final_catch_1.default;
const get_error_by_status_1 = tslib_1.__importDefault(require("./fn/get-error-by-status"));
exports.getErrorByStatus = get_error_by_status_1.default;
const get_error_name_by_instance_1 = require("./fn/get-error-name-by-instance");
Object.defineProperty(exports, "getErrorNameByInstanceWithDefault", { enumerable: true, get: function () { return get_error_name_by_instance_1.getErrorNameByInstanceWithDefault; } });
Object.defineProperty(exports, "getErrorNameByInstance", { enumerable: true, get: function () { return get_error_name_by_instance_1.getErrorNameByInstance; } });
