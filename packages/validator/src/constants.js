// Good practice rule - No magic number

const ARGS_NOT_ARRAY_ERR = `args is not an array! You might want to do: ES6 Array.from(arguments) or ES5 Array.prototype.slice.call(arguments)`
const PARAMS_NOT_ARRAY_ERR = `params is not an array! Did something gone wrong when you generate the contract.json?`
const EXCEPTION_CASE_ERR = 'Could not understand your arguments and parameter structure!'
const UNUSUAL_CASE_ERR = 'This is an unusual situation where the arguments are more than the params, but not mark as spread'

const RETURNS_NAME = 'returns'

import {
  
  DEFAULT_TYPE, // this is a mistake should move back to the validation
  DATA_KEY, 
  ERROR_KEY,

  TYPE_KEY,
  OPTIONAL_KEY,
  ENUM_KEY,
  ARGS_KEY,
  CHECKER_KEY,
  ALIAS_KEY,

  ARRAY_TYPE_LFT,
  ARRAY_TYPE_RGT,
  
  ARRAY_TYPE,
  OBJECT_TYPE,
  STRING_TYPE,
  BOOLEAN_TYPE,
  NUMBER_TYPE,
  KEY_WORD,
  OR_SEPERATOR
} from 'jsonql-constants'

// group all export in one 
export {
  ARGS_NOT_ARRAY_ERR,
  PARAMS_NOT_ARRAY_ERR,
  EXCEPTION_CASE_ERR,
  UNUSUAL_CASE_ERR,
  DEFAULT_TYPE,
  ARRAY_TYPE_LFT,
  ARRAY_TYPE_RGT,
  TYPE_KEY,
  OPTIONAL_KEY,
  ENUM_KEY,
  ARGS_KEY,
  CHECKER_KEY,
  ALIAS_KEY,
  ARRAY_TYPE,
  OBJECT_TYPE,
  STRING_TYPE,
  BOOLEAN_TYPE,
  NUMBER_TYPE,
  KEY_WORD,
  OR_SEPERATOR,

  RETURNS_NAME,

  DATA_KEY, 
  ERROR_KEY 
}