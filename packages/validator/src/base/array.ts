// validate array type
import { combineCheck } from './combine'
import {
  ARRAY_TYPE_LFT,
  ARRAY_TYPE_RGT,
  OR_SEPERATOR
} from '../lib/constants'

/**
 * check if its array or array like
 * why the type is a not a boolean?
 */
export function checkArray(value: any, type='') {
  if (Array.isArray(value)) {
    if (type === '' || (type+'').trim() ==='') {

      return true
    }
    // we test it in reverse
    // @TODO if the type is an array (OR) then what?
    // we need to take into account this could be an array
    const c = value.filter(v => !combineCheck(type)(v))

    return !(c.length > 0)
  }

  return false
}

/**
 * @deprecated
 * check if it matches the array.<T> pattern
 * This method will be deprecated soon - we are not using the jsdoc to get the type any more
 */
export function isArrayLike(type: string): boolean | any[] {
  // @TODO could that have something like array<> instead of array.<>? missing the dot?
  // because type script is Array<T> without the dot
  if (type.indexOf(ARRAY_TYPE_LFT) > -1 && type.indexOf(ARRAY_TYPE_RGT) > -1) {
    const _type = type.replace(ARRAY_TYPE_LFT, '').replace(ARRAY_TYPE_RGT, '')
    if (_type.indexOf(OR_SEPERATOR)) {
      // return as array
      return _type.split(OR_SEPERATOR)
    }
    // return as array
    return [_type]
  }
  // fail return false
  return false
}

/**
 * we might encounter something like array.<T> then we need to take it apart
 */
export function arrayTypeHandler(p: any, type: any | any[]): boolean {
  const { arg } = p
  // need a special case to handle the OR type
  // we need to test the args instead of the type(s)
  if (type.length > 1) {
    return !arg.filter((v: any) => (
      !(type.length > type.filter((t: any) => !combineCheck(t)(v)).length)
    )).length
  }
  // type is array so this will be or!
  return type.length > type.filter((t: any) => !checkArray(arg, t)).length
}
