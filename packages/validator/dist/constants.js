"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RETURN_AS_RAW = exports.RETURN_AS_ARR = exports.RETURN_AS_OBJ = exports.TS_TYPE_NAME = exports.TS_TYPE_REF = exports.TS_TYPE_LIT = exports.DEFAULT_VALUE = exports.TS_ARRAY_TYPE = exports.TS_UNION_TYPE = exports.SPREAD_ARG_TYPE = exports.IS_SPREAD_VALUES_KEY = exports.SPREAD_PREFIX = exports.EXCEPTION_CASE_ERR = exports.PARAMS_NOT_ARRAY_ERR = exports.ARGS_NOT_ARRAY_ERR = void 0;
exports.ARGS_NOT_ARRAY_ERR = `Input argument is not an array!`;
exports.PARAMS_NOT_ARRAY_ERR = `Parameter is not an array`;
exports.EXCEPTION_CASE_ERR = `Exception happened don't know how to handle it`;
// use this to id if the input is spread
exports.SPREAD_PREFIX = '$_spread_arg_';
exports.IS_SPREAD_VALUES_KEY = '$$is_spread_values';
exports.SPREAD_ARG_TYPE = 'RestElement';
exports.TS_UNION_TYPE = 'TsUnionType';
exports.TS_ARRAY_TYPE = 'TsArrayType';
exports.DEFAULT_VALUE = 'defaultvalue';
// when they type inline along the params
exports.TS_TYPE_LIT = 'TsTypeLiteral';
// when pass a type reference we just treat them as object
exports.TS_TYPE_REF = 'TsTypeReference';
// this is for us to id what that is
exports.TS_TYPE_NAME = 'tstype';
// return result as - default array 
exports.RETURN_AS_OBJ = 'object';
exports.RETURN_AS_ARR = 'array';
exports.RETURN_AS_RAW = 'raw';
