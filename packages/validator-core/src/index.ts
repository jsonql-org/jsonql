// start your project here
// this contains all the primitive types checking methods
export { checkAny } from './base/any'
export { checkArray, isArrayLike, arrayTypeHandler } from './base/array'
export { checkBoolean } from './base/boolean'
export { checkNumber, checkInteger, checkFloat, checkUnsigned } from './base/number'
export { checkString } from './base/string'
export { checkObject, objectTypeHandler } from './base/object'
// wrapper fn
export { combineCheck } from './base/combine'
// union type check
export { checkUnion } from './base/union'
