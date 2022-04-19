// validate array type

import isArray from 'lodash-es/isArray'
import trim from 'lodash-es/trim'
import combineFn from './combine'
import {
  ARRAY_TYPE_LFT,
  ARRAY_TYPE_RGT,
  OR_SEPERATOR
} from './constants'

/**
 * @param {array} value expected
 * @param {string} [type=''] pass the type if we encounter array.<T> then we need to check the value as well
 * @return {boolean} true if OK
 */
export const checkIsArray = function(value, type='') {
  if (isArray(value)) {
    if (type === '' || trim(type)==='') {
      return true;
    }
    // we test it in reverse
    // @TODO if the type is an array (OR) then what?
    // we need to take into account this could be an array
    const c = value.filter(v => !combineFn(type)(v))
    return !(c.length > 0)
  }
  return false
}

/**
 * check if it matches the array.<T> pattern
 * @param {string} type
 * @return {boolean|array} false means NO, always return array
 */
export const isArrayLike = function(type) {
  // @TODO could that have something like array<> instead of array.<>? missing the dot?
  // because type script is Array<T> without the dot
  if (type.indexOf(ARRAY_TYPE_LFT) > -1 && type.indexOf(ARRAY_TYPE_RGT) > -1) {
    const _type = type.replace(ARRAY_TYPE_LFT, '').replace(ARRAY_TYPE_RGT, '')
    if (_type.indexOf(OR_SEPERATOR)) {
      return _type.split(OR_SEPERATOR)
    }
    return [_type]
  }
  return false
}

/**
 * we might encounter something like array.<T> then we need to take it apart
 * @param {object} p the prepared object for processing
 * @param {string|array} type the type came from <T>
 * @return {boolean} for the filter to operate on
 */
export const arrayTypeHandler = function(p, type) {
  const { arg } = p
  // need a special case to handle the OR type
  // we need to test the args instead of the type(s)
  if (type.length > 1) {
    return !arg.filter(v => (
      !(type.length > type.filter(t => !combineFn(t)(v)).length)
    )).length
  }
  // type is array so this will be or!
  return type.length > type.filter(t => !checkIsArray(arg, t)).length
}
