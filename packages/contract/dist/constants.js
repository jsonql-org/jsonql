"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTRACT_REQUEST_METHODS = exports.DEFAULT_HEADER = exports.CHARSET = exports.CONTENT_TYPE = exports.PUBLIC_CONTRACT_FILE_NAME = exports.DEFAULT_CONTRACT_FILE_NAME = exports.AVAILABLE_FORMATS = exports.REST_NAME = exports.JSONQL_NAME = exports.META_KEY = exports.ERROR_KEY = exports.DATA_KEY = void 0;
// the core stuff to id if it's calling with jsonql
exports.DATA_KEY = 'data';
exports.ERROR_KEY = 'error';
exports.META_KEY = 'meta';
exports.JSONQL_NAME = 'jsonql';
exports.REST_NAME = 'rest';
exports.AVAILABLE_FORMATS = [exports.JSONQL_NAME, exports.REST_NAME];
// contract file names
exports.DEFAULT_CONTRACT_FILE_NAME = 'contract.json';
exports.PUBLIC_CONTRACT_FILE_NAME = 'public-contract.json';
exports.CONTENT_TYPE = 'application/vnd.api+json';
exports.CHARSET = 'charset=utf-8';
exports.DEFAULT_HEADER = {
    'Accept': exports.CONTENT_TYPE,
    'Content-Type': [exports.CONTENT_TYPE, exports.CHARSET].join('')
};
exports.CONTRACT_REQUEST_METHODS = 'GET';
