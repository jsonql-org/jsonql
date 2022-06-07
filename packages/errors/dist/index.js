"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateErrorObject = exports.getErrorNameByInstance = exports.getErrorNameByInstanceWithDefault = exports.getErrorByStatus = exports.finalCatch = exports.NOT_ACCEPTABLE_STATUS = exports.NOT_FOUND_STATUS = exports.FORBIDDEN_STATUS = exports.UNAUTHORIZED_STATUS = exports.SUCCESS_STATUS = exports.NO_STATUS_CODE = exports.NO_ERROR_MSG = exports.SERVER_INTERNAL_STATUS = exports.JSONQL_ERRORS_INFO = exports.UNKNOWN_ERROR = exports.GeneralError = exports.JsonqlServerError = exports.JsonqlError = exports.ValidationError = exports.JsonqlCheckerError = exports.JsonqlTypeError = exports.JsonqlEnumError = exports.JsonqlResolverNotFoundError = exports.JsonqlResolverAppError = exports.JsonqlContractAuthError = exports.JsonqlAuthorisationError = exports.JsonqlForbiddenError = exports.Jsonql500Error = exports.Jsonql406Error = void 0;
const tslib_1 = require("tslib");
const _406_error_1 = tslib_1.__importDefault(require("./406-error"));
exports.Jsonql406Error = _406_error_1.default;
const _500_error_1 = tslib_1.__importDefault(require("./500-error"));
exports.Jsonql500Error = _500_error_1.default;
const forbidden_error_1 = tslib_1.__importDefault(require("./forbidden-error"));
exports.JsonqlForbiddenError = forbidden_error_1.default;
const authorisation_error_1 = tslib_1.__importDefault(require("./authorisation-error"));
exports.JsonqlAuthorisationError = authorisation_error_1.default;
const contract_auth_error_1 = tslib_1.__importDefault(require("./contract-auth-error"));
exports.JsonqlContractAuthError = contract_auth_error_1.default;
const resolver_app_error_1 = tslib_1.__importDefault(require("./resolver-app-error"));
exports.JsonqlResolverAppError = resolver_app_error_1.default;
const resolver_not_found_error_1 = tslib_1.__importDefault(require("./resolver-not-found-error"));
exports.JsonqlResolverNotFoundError = resolver_not_found_error_1.default;
const enum_error_1 = tslib_1.__importDefault(require("./enum-error"));
exports.JsonqlEnumError = enum_error_1.default;
const type_error_1 = tslib_1.__importDefault(require("./type-error"));
exports.JsonqlTypeError = type_error_1.default;
const checker_error_1 = tslib_1.__importDefault(require("./checker-error"));
exports.JsonqlCheckerError = checker_error_1.default;
const validation_error_1 = tslib_1.__importDefault(require("./validation-error"));
exports.ValidationError = validation_error_1.default;
const error_1 = tslib_1.__importDefault(require("./error"));
exports.JsonqlError = error_1.default;
const server_error_1 = tslib_1.__importDefault(require("./server-error"));
exports.JsonqlServerError = server_error_1.default;
const general_error_1 = tslib_1.__importDefault(require("./general-error"));
exports.GeneralError = general_error_1.default;
var constants_1 = require("./constants");
Object.defineProperty(exports, "UNKNOWN_ERROR", { enumerable: true, get: function () { return constants_1.UNKNOWN_ERROR; } });
Object.defineProperty(exports, "JSONQL_ERRORS_INFO", { enumerable: true, get: function () { return constants_1.JSONQL_ERRORS_INFO; } });
Object.defineProperty(exports, "SERVER_INTERNAL_STATUS", { enumerable: true, get: function () { return constants_1.SERVER_INTERNAL_STATUS; } });
Object.defineProperty(exports, "NO_ERROR_MSG", { enumerable: true, get: function () { return constants_1.NO_ERROR_MSG; } });
Object.defineProperty(exports, "NO_STATUS_CODE", { enumerable: true, get: function () { return constants_1.NO_STATUS_CODE; } });
Object.defineProperty(exports, "SUCCESS_STATUS", { enumerable: true, get: function () { return constants_1.SUCCESS_STATUS; } });
Object.defineProperty(exports, "UNAUTHORIZED_STATUS", { enumerable: true, get: function () { return constants_1.UNAUTHORIZED_STATUS; } });
Object.defineProperty(exports, "FORBIDDEN_STATUS", { enumerable: true, get: function () { return constants_1.FORBIDDEN_STATUS; } });
Object.defineProperty(exports, "NOT_FOUND_STATUS", { enumerable: true, get: function () { return constants_1.NOT_FOUND_STATUS; } });
Object.defineProperty(exports, "NOT_ACCEPTABLE_STATUS", { enumerable: true, get: function () { return constants_1.NOT_ACCEPTABLE_STATUS; } });
const final_catch_1 = tslib_1.__importDefault(require("./fn/final-catch"));
exports.finalCatch = final_catch_1.default;
const get_error_by_status_1 = tslib_1.__importDefault(require("./fn/get-error-by-status"));
exports.getErrorByStatus = get_error_by_status_1.default;
const get_error_name_by_instance_1 = require("./fn/get-error-name-by-instance");
Object.defineProperty(exports, "getErrorNameByInstanceWithDefault", { enumerable: true, get: function () { return get_error_name_by_instance_1.getErrorNameByInstanceWithDefault; } });
Object.defineProperty(exports, "getErrorNameByInstance", { enumerable: true, get: function () { return get_error_name_by_instance_1.getErrorNameByInstance; } });
const template_1 = require("./template");
Object.defineProperty(exports, "templateErrorObject", { enumerable: true, get: function () { return template_1.templateErrorObject; } });
