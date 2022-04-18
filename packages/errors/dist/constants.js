"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONQL_ERRORS_INFO = exports.UNKNOWN_ERROR = exports.NO_ERROR_MSG = exports.NO_STATUS_CODE = exports.SERVER_INTERNAL_STATUS = exports.NOT_FOUND_STATUS = exports.FORBIDDEN_STATUS = exports.UNAUTHORIZED_STATUS = exports.NOT_ACCEPTABLE_STATUS = void 0;
// group all the constants one place
const constants_1 = require("@jsonql/constants");
Object.defineProperty(exports, "NOT_ACCEPTABLE_STATUS", { enumerable: true, get: function () { return constants_1.NOT_ACCEPTABLE_STATUS; } });
Object.defineProperty(exports, "UNAUTHORIZED_STATUS", { enumerable: true, get: function () { return constants_1.UNAUTHORIZED_STATUS; } });
Object.defineProperty(exports, "FORBIDDEN_STATUS", { enumerable: true, get: function () { return constants_1.FORBIDDEN_STATUS; } });
Object.defineProperty(exports, "NOT_FOUND_STATUS", { enumerable: true, get: function () { return constants_1.NOT_FOUND_STATUS; } });
Object.defineProperty(exports, "SERVER_INTERNAL_STATUS", { enumerable: true, get: function () { return constants_1.SERVER_INTERNAL_STATUS; } });
Object.defineProperty(exports, "NO_STATUS_CODE", { enumerable: true, get: function () { return constants_1.NO_STATUS_CODE; } });
Object.defineProperty(exports, "NO_ERROR_MSG", { enumerable: true, get: function () { return constants_1.NO_ERROR_MSG; } });
const UNKNOWN_ERROR = 'unknown_error';
exports.UNKNOWN_ERROR = UNKNOWN_ERROR;
const JSONQL_ERRORS_INFO = '__PLACEHOLDER__';
exports.JSONQL_ERRORS_INFO = JSONQL_ERRORS_INFO;
