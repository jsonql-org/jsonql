// main export
import notEmpty from './not-empty'

import { checkIsArray, isArrayLike, arrayTypeHandler } from './array'
import { checkIsObject, objectTypeHandler } from './object'

import checkIsBoolean from './boolean'
import checkIsNumber from './number'
import checkIsString from './string'
import checkIsAny from './any'

import combineFn from './combine'
// re-export
export {
  notEmpty,

  checkIsAny,
  checkIsString,
  checkIsBoolean,
  checkIsNumber,
  checkIsArray,
  isArrayLike,
  arrayTypeHandler,
  checkIsObject,
  objectTypeHandler,

  combineFn
}
