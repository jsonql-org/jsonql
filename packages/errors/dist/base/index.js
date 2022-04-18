"use strict";
// default export from dir root
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralError = exports.JsonqlServerError = exports.JsonqlError = exports.JsonqlValidationError = exports.JsonqlCheckerError = exports.JsonqlTypeError = exports.JsonqlEnumError = exports.JsonqlResolverNotFoundError = exports.JsonqlResolverAppError = exports.JsonqlContractAuthError = exports.JsonqlAuthorisationError = exports.JsonqlForbiddenError = exports.Jsonql500Error = exports.Jsonql406Error = void 0;
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
// check options error
const enum_error_1 = tslib_1.__importDefault(require("./enum-error"));
exports.JsonqlEnumError = enum_error_1.default;
const type_error_1 = tslib_1.__importDefault(require("./type-error"));
exports.JsonqlTypeError = type_error_1.default;
const checker_error_1 = tslib_1.__importDefault(require("./checker-error"));
exports.JsonqlCheckerError = checker_error_1.default;
// share
const validation_error_1 = tslib_1.__importDefault(require("./validation-error"));
exports.JsonqlValidationError = validation_error_1.default;
const error_1 = tslib_1.__importDefault(require("./error"));
exports.JsonqlError = error_1.default;
const server_error_1 = tslib_1.__importDefault(require("./server-error"));
exports.JsonqlServerError = server_error_1.default;
const general_error_1 = tslib_1.__importDefault(require("./general-error"));
exports.GeneralError = general_error_1.default;
