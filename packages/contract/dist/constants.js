"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_KEY = exports.PARAMS_KEY = exports.NAME_KEY = exports.RULES_KEY = exports.CONTRACT_REQUEST_METHODS = exports.DEFAULT_HEADER = exports.CHARSET = exports.CONTENT_TYPE = exports.DEFAULT_PLUGIN_FILE_NAME = exports.PUBLIC_CONTRACT_FILE_NAME = exports.DEFAULT_CONTRACT_FILE_NAME = exports.AVAILABLE_FORMATS = exports.REST_NAME = exports.JSONQL_NAME = exports.VALIDATION_KEY = exports.META_KEY = exports.ERROR_KEY = exports.DATA_KEY = void 0;
// the core stuff to id if it's calling with jsonql
exports.DATA_KEY = 'data';
exports.ERROR_KEY = 'error';
exports.META_KEY = 'meta';
// new key to insert valdiation data
exports.VALIDATION_KEY = 'validation';
exports.JSONQL_NAME = 'jsonql';
exports.REST_NAME = 'rest';
exports.AVAILABLE_FORMATS = [exports.JSONQL_NAME, exports.REST_NAME];
// contract file names
exports.DEFAULT_CONTRACT_FILE_NAME = 'contract.json';
exports.PUBLIC_CONTRACT_FILE_NAME = 'public-contract.json';
exports.DEFAULT_PLUGIN_FILE_NAME = 'plugins.js';
exports.CONTENT_TYPE = 'application/vnd.api+json';
exports.CHARSET = 'charset=utf-8';
exports.DEFAULT_HEADER = {
    'Accept': exports.CONTENT_TYPE,
    'Content-Type': [exports.CONTENT_TYPE, exports.CHARSET].join('')
};
exports.CONTRACT_REQUEST_METHODS = 'GET';
// @TODO this should be import but write this inline for now
exports.RULES_KEY = 'rules';
exports.NAME_KEY = 'name';
exports.PARAMS_KEY = 'params';
exports.SERVER_KEY = 'server';
