export const ARGS_NOT_ARRAY_ERR = `Input argument is not an array!`
export const PARAMS_NOT_ARRAY_ERR = `Parameter is not an array`
export const EXCEPTION_CASE_ERR = `Exception happened don't know how to handle it`
// use this to id if the input is spread
export const SPREAD_PREFIX = '$_spread_arg_'

export const VALIDATE_KEY = 'validate'
export const VALIDATE_ASYNC_KEY = 'validateAsync'
export const PLUGIN_KEY = 'plugin'
export const PLUGIN_FN_KEY = 'main'
export const PATTERN_KEY = 'pattern'
export const RULES_KEY = 'rules'
export const NAME_KEY = 'name'
export const PARAMS_KEY = 'params'
// just to avoid the name collision
export const IDX_KEY = '$$idx'
export const VALUE_KEY = '$$value'
export const IS_SPREAD_VALUES_KEY = '$$is_spread_values'
// when dev register their plugin, they can pass extra param but no the word in this list
export const KEYWORDS = [
  'name',
  'type',
  'types',
  PARAMS_KEY,
  PATTERN_KEY,
  'server',
  'tstype',
  VALIDATE_KEY,
  VALIDATE_ASYNC_KEY,
  'value',
  PLUGIN_KEY,
  'optional',
  RULES_KEY,
  'tmp',
  'pos',
  'lastResult',
]
