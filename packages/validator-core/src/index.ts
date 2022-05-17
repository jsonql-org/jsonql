// start your project here
// this contains all the primitive types checking methods
import { checkString } from './base/string'
import { checkBoolean } from './base/boolean'
import { checkNumber, checkInteger, checkFloat, checkUnsigned } from './base/number'
import { checkAny } from './base/any'

import { checkArray, isArrayLike, arrayTypeHandler } from './base/array'
import { checkObject, objectTypeHandler, isEmptyObject } from './base/object'
// wrapper fn
import { combineCheck } from './base/combine'
// union type check
import { checkUnion, generateReversePromisesFn, checkUnionSync } from './base/union'
import { promisify, reversePromisifyResult } from './lib/promisify'
// for some reason the downstream keep complaining the js version has no export member of X
import { plugins } from './plugins'
// avoid a circular reference
import { curryPlugin, createCoreCurryPlugin } from './plugins/plugins'
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
  isEmptyObject,
  combineCheck,

  checkUnion,
  generateReversePromisesFn,
  checkUnionSync,

  promisify,
  reversePromisifyResult,
  // 0.3.0 move plugins from validator to here
  plugins,
  curryPlugin,
  createCoreCurryPlugin,
}
