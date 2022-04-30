// start your project here
// this contains all the primitive types checking methods
import { checkAny } from './base/any'
import { checkArray, isArrayLike, arrayTypeHandler } from './base/array'
import { checkBoolean } from './base/boolean'
import { checkNumber, checkInteger, checkFloat, checkUnsigned } from './base/number'
import { checkString } from './base/string'
import { checkObject, objectTypeHandler } from './base/object'
// wrapper fn
import { combineCheck } from './base/combine'
// union type check
import { checkUnion, generateReversePromisesFn } from './base/union'
import { promisify, reversePromisifyResult } from './lib/promisify'
// for some reason the downstream keep complaining the js version has no export member of X
import { plugins } from './plugins'
export {
  checkAny,
  checkArray,
  isArrayLike,
  arrayTypeHandler,
  checkBoolean,
  checkNumber,
  checkInteger,
  checkFloat,
  checkUnsigned,
  checkString,
  checkObject,
  objectTypeHandler,
  combineCheck,
  checkUnion,
  generateReversePromisesFn,
  promisify,
  reversePromisifyResult,
  // 0.3.0 move plugins from validator to here
  plugins,
}
