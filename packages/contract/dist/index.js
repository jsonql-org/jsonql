"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTRACT_REQUEST_METHODS = exports.DEFAULT_HEADER = exports.CONTENT_TYPE = exports.PUBLIC_CONTRACT_FILE_NAME = exports.DEFAULT_CONTRACT_FILE_NAME = exports.AVAILABLE_FORMATS = exports.REST_NAME = exports.JSONQL_NAME = exports.META_KEY = exports.ERROR_KEY = exports.DATA_KEY = exports.JsonqlContractReader = exports.JsonqlContractWriter = void 0;
// main export
var writer_1 = require("./writer");
Object.defineProperty(exports, "JsonqlContractWriter", { enumerable: true, get: function () { return writer_1.JsonqlContractWriter; } });
var reader_1 = require("./reader");
Object.defineProperty(exports, "JsonqlContractReader", { enumerable: true, get: function () { return reader_1.JsonqlContractReader; } });
// exporting couple constants here that is related to contract
var constants_1 = require("@jsonql/constants");
Object.defineProperty(exports, "DATA_KEY", { enumerable: true, get: function () { return constants_1.DATA_KEY; } });
Object.defineProperty(exports, "ERROR_KEY", { enumerable: true, get: function () { return constants_1.ERROR_KEY; } });
Object.defineProperty(exports, "META_KEY", { enumerable: true, get: function () { return constants_1.META_KEY; } });
Object.defineProperty(exports, "JSONQL_NAME", { enumerable: true, get: function () { return constants_1.JSONQL_NAME; } });
Object.defineProperty(exports, "REST_NAME", { enumerable: true, get: function () { return constants_1.REST_NAME; } });
Object.defineProperty(exports, "AVAILABLE_FORMATS", { enumerable: true, get: function () { return constants_1.AVAILABLE_FORMATS; } });
Object.defineProperty(exports, "DEFAULT_CONTRACT_FILE_NAME", { enumerable: true, get: function () { return constants_1.DEFAULT_CONTRACT_FILE_NAME; } });
Object.defineProperty(exports, "PUBLIC_CONTRACT_FILE_NAME", { enumerable: true, get: function () { return constants_1.PUBLIC_CONTRACT_FILE_NAME; } });
Object.defineProperty(exports, "CONTENT_TYPE", { enumerable: true, get: function () { return constants_1.CONTENT_TYPE; } });
Object.defineProperty(exports, "DEFAULT_HEADER", { enumerable: true, get: function () { return constants_1.DEFAULT_HEADER; } });
Object.defineProperty(exports, "CONTRACT_REQUEST_METHODS", { enumerable: true, get: function () { return constants_1.CONTRACT_REQUEST_METHODS; } });
