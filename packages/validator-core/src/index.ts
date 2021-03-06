// start your project here
// this contains all the primitive types checking methods
export { checkString } from './base/string'
export { checkBoolean } from './base/boolean'
export { checkNumber, checkInteger, checkFloat, checkUnsigned } from './base/number'
export { checkAny } from './base/any'
export { checkArray, isArrayLike, arrayTypeHandler } from './base/array'
export { checkObject, objectTypeHandler, isEmptyObject } from './base/object'
// wrapper fn
export { combineCheck } from './base/combine'
// union type check
export { checkUnion, checkUnionSync, generateReversePromisesFn } from './base/union'
export { promisify, reversePromisifyResult } from './lib/promisify'
// for some reason the downstream keep complaining the js version has no export member of X
export { plugins } from './plugins'
// avoid a circular reference
export {
  curryPlugin,
} from './plugins/plugins'
export {
  checkPluginArg,
  pluginHasFunc,
  constructRuleCb,
  successThen,
  isResultPackage,
  patternPluginFanctory,
} from './lib/common'
export { ValidatorPlugins } from './validator-plugins'
// export all constants
export {
  BOOLEAN_TYPE,
  STRING_TYPE,
  NUMBER_TYPE,
  ARRAY_TYPE,
  OBJECT_TYPE,
  OR_SEPERATOR,
  ARRAY_TYPE_LFT,
  ARRAY_TYPE_RGT,
  ARRAY_TS_TYPE_LFT,

  KEYWORDS,
  VALIDATE_KEY,
  VALIDATE_ASYNC_KEY,
  PLUGIN_KEY,
  PLUGIN_FN_KEY,
  PATTERN_KEY,
  RULES_KEY,
  NAME_KEY,
  PARAMS_KEY,
  
  IDX_KEY,
  VALUE_KEY,
} from './constants'
