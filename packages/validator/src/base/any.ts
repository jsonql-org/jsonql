
import { isEmptyObj } from '@jsonql/utils'
import { isPlainObject } from '../lib/lodash'

/** validate any thing only check if there is something */
export function checkAny(value: any, checkNull = true): boolean {
  if (value !== undefined && value !== '' && (value+'').trim() !== '') {
    if (checkNull === false || (checkNull === true && value !== null)) {

      return true
    }
  }

  return false
}

/**
 * Check several parameter that there is something in the param
 this is problematic should rename to isNotEmptyParam
 and we should check if its array is it empty array
 if it's object then if its empty object
 */
export function isNotEmpty(a: any, valueCheck = false) {
  if (Array.isArray(a)) {
    // @NOTE we now check if its an empty array as well
    return valueCheck ? !!a.length : false
  }
  if (isPlainObject(a)) {

    return valueCheck ? !isEmptyObj(a) : false
  }

  return a !== undefined && a !== null && (a+'').trim() !== ''
}
