"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEYWORDS = exports.IS_SPREAD_VALUES_KEY = exports.VALUE_KEY = exports.IDX_KEY = exports.PARAMS_KEY = exports.NAME_KEY = exports.RULES_KEY = exports.PATTERN_KEY = exports.PLUGIN_FN_KEY = exports.PLUGIN_KEY = exports.VALIDATE_ASYNC_KEY = exports.VALIDATE_KEY = exports.SPREAD_PREFIX = exports.EXCEPTION_CASE_ERR = exports.PARAMS_NOT_ARRAY_ERR = exports.ARGS_NOT_ARRAY_ERR = void 0;
exports.ARGS_NOT_ARRAY_ERR = `Input argument is not an array!`;
exports.PARAMS_NOT_ARRAY_ERR = `Parameter is not an array`;
exports.EXCEPTION_CASE_ERR = `Exception happened don't know how to handle it`;
// use this to id if the input is spread
exports.SPREAD_PREFIX = '$_spread_arg_';
exports.VALIDATE_KEY = 'validate';
exports.VALIDATE_ASYNC_KEY = 'validateAsync';
exports.PLUGIN_KEY = 'plugin';
exports.PLUGIN_FN_KEY = 'main';
exports.PATTERN_KEY = 'pattern';
exports.RULES_KEY = 'rules';
exports.NAME_KEY = 'name';
exports.PARAMS_KEY = 'params';
// just to avoid the name collision
exports.IDX_KEY = '$$idx';
exports.VALUE_KEY = '$$value';
exports.IS_SPREAD_VALUES_KEY = '$$is_spread_values';
// when dev register their plugin, they can pass extra param but no the word in this list
exports.KEYWORDS = [
    'name',
    'type',
    'types',
    exports.PARAMS_KEY,
    exports.PATTERN_KEY,
    'server',
    'tstype',
    exports.VALIDATE_KEY,
    exports.VALIDATE_ASYNC_KEY,
    'value',
    exports.PLUGIN_KEY,
    'optional',
    exports.RULES_KEY,
    'tmp',
    'pos',
    'lastResult',
];
