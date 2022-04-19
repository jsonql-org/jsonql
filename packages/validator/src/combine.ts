// primitive types
import checkIsNumber from './number'
import checkIsString from './string'
import checkIsBoolean from './boolean'
import checkIsAny from './any'
import { NUMBER_TYPE, STRING_TYPE, BOOLEAN_TYPE } from './constants'

/**
 * this is a wrapper method to call different one based on their type
 * @param {string} type to check
 * @return {function} a function to handle the type
 */
const combineFn = function(type) {
  switch (type) {
    case NUMBER_TYPE:
      return checkIsNumber
    case STRING_TYPE:
      return checkIsString
    case BOOLEAN_TYPE:
      return checkIsBoolean
    default:
      return checkIsAny
  }
}

export default combineFn
