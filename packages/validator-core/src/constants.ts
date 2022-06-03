// ported from @jsonql/constants

export const OR_SEPERATOR = '|'

export const BOOLEAN_TYPE = 'boolean'
export const STRING_TYPE = 'string'
export const NUMBER_TYPE = 'number'
export const ARRAY_TYPE = 'array'
export const OBJECT_TYPE = 'object'
// Legacy
export const ARRAY_TS_TYPE_LFT = 'Array<'
export const ARRAY_TYPE_LFT = 'array.<'
export const ARRAY_TYPE_RGT = '>'

// local
export const VALIDATE_KEY = 'validate'
export const VALIDATE_ASYNC_KEY = 'validateAsync'
export const PLUGIN_KEY = 'plugin'
export const PLUGIN_FN_KEY = 'main'
export const PATTERN_KEY = 'pattern'
export const RULES_KEY = 'rules'
export const NAME_KEY = 'name'
export const PARAMS_KEY = 'params'

export const IDX_KEY = '$$idx'
export const VALUE_KEY = '$$value'

export const RESERVED_WORD_ERR = 'Your plugin config argument contains reserved keywords'
export const ARG_NOT_MATCH_ERR = "Your params doesn't matching your main argument list"
export const MAIN_NOT_FOUND_ERR = "Can not find 'main' method in your plugin config"

export const KEYWORDS = [
  PARAMS_KEY,
  PATTERN_KEY,
  VALIDATE_KEY,
  VALIDATE_ASYNC_KEY,
  PLUGIN_KEY,
  RULES_KEY,
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
]
