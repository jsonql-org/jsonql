"use strict";
// ported from @jsonql/constants
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEYWORDS = exports.RESERVED_WORD_ERR = exports.VALUE_KEY = exports.IDX_KEY = exports.PARAMS_KEY = exports.NAME_KEY = exports.RULES_KEY = exports.PATTERN_KEY = exports.PLUGIN_FN_KEY = exports.PLUGIN_KEY = exports.VALIDATE_ASYNC_KEY = exports.VALIDATE_KEY = exports.ARRAY_TYPE_RGT = exports.ARRAY_TYPE_LFT = exports.ARRAY_TS_TYPE_LFT = exports.OBJECT_TYPE = exports.ARRAY_TYPE = exports.NUMBER_TYPE = exports.STRING_TYPE = exports.BOOLEAN_TYPE = exports.OR_SEPERATOR = void 0;
exports.OR_SEPERATOR = '|';
exports.BOOLEAN_TYPE = 'boolean';
exports.STRING_TYPE = 'string';
exports.NUMBER_TYPE = 'number';
exports.ARRAY_TYPE = 'array';
exports.OBJECT_TYPE = 'object';
// Legacy
exports.ARRAY_TS_TYPE_LFT = 'Array<';
exports.ARRAY_TYPE_LFT = 'array.<';
exports.ARRAY_TYPE_RGT = '>';
// local
exports.VALIDATE_KEY = 'validate';
exports.VALIDATE_ASYNC_KEY = 'validateAsync';
exports.PLUGIN_KEY = 'plugin';
exports.PLUGIN_FN_KEY = 'main';
exports.PATTERN_KEY = 'pattern';
exports.RULES_KEY = 'rules';
exports.NAME_KEY = 'name';
exports.PARAMS_KEY = 'params';
exports.IDX_KEY = '$$idx';
exports.VALUE_KEY = '$$value';
exports.RESERVED_WORD_ERR = 'Your plugin config argument contains reserved keywords';
exports.KEYWORDS = [
    exports.PARAMS_KEY,
    exports.PATTERN_KEY,
    exports.VALIDATE_KEY,
    exports.VALIDATE_ASYNC_KEY,
    exports.PLUGIN_KEY,
    exports.RULES_KEY,
    'name',
    'type',
    'types',
    'server',
    'tstype',
    'value',
    'optional',
    'tmp',
    'pos',
    'lastResult',
];
