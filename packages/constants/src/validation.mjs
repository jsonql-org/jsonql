// validation related constants


export const OR_SEPERATOR = '|'

export const BOOLEAN_TYPE = 'boolean'
export const STRING_TYPE = 'string'
export const NUMBER_TYPE = 'number'
export const ARRAY_TYPE = 'array'
export const OBJECT_TYPE = 'object'

export const FUNCTION_TYPE = 'function'
export const ANY_TYPE = 'any'
// when validator need to register new types
// these will be the type that allow to based upon
export const BASED_PRIMITIVE_TYPES = [
  NUMBER_TYPE,
  STRING_TYPE,
  // BOOLEAN_TYPE, // is there anything can be extend from here?
  ARRAY_TYPE,
  OBJECT_TYPE,
]

export const NUMBER_TYPES = ['int', 'integer', 'float', 'double', 'decimal']
// supported types
export const SUPPORTED_TYPES = [
  NUMBER_TYPE,
  STRING_TYPE,
  BOOLEAN_TYPE,
  ARRAY_TYPE,
  OBJECT_TYPE,
  ANY_TYPE
]

export const ARRAY_TS_TYPE_LFT = 'Array<'
export const ARRAY_TYPE_LFT = 'array.<'
export const ARRAY_TYPE_RGT = '>'
// matching what we used before 
export const DEFAULT_VALUE = 'defaultvalue'
