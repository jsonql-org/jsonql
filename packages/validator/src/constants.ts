export const ARGS_NOT_ARRAY_ERR = `Input argument is not an array!`
export const PARAMS_NOT_ARRAY_ERR = `Parameter is not an array`
export const EXCEPTION_CASE_ERR = `Exception happened don't know how to handle it`
// use this to id if the input is spread
export const SPREAD_PREFIX = '$_spread_arg_'
export const IS_SPREAD_VALUES_KEY = '$$is_spread_values'

export const SPREAD_ARG_TYPE = 'RestElement'

export const TS_UNION_TYPE = 'TsUnionType'
export const TS_ARRAY_TYPE = 'TsArrayType'
export const DEFAULT_VALUE = 'defaultvalue'

// when they type inline along the params
export const TS_TYPE_LIT = 'TsTypeLiteral'
// when pass a type reference we just treat them as object
export const TS_TYPE_REF = 'TsTypeReference'
// this is for us to id what that is
export const TS_TYPE_NAME = 'tstype'
