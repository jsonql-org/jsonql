// a bunch of check if something is empty that was in the common.ts
// check if an obj is empty, ported from Velocejs
import type { AnyType } from './types'
import { isPlainObject } from './object'

export const isEmptyObj = (obj: AnyType): boolean => (
  obj && isPlainObject(obj) && Object.keys(obj).length === 0
)

/**
 * Check several parameter that there is something in the param
 */
export const isNotEmpty = (param: unknown): boolean => (
  param !== undefined &&
  // param !== false &&
  param !== null &&
  (param+'').trim() !== ''
)

/**
 * Check several parameter that there is something in the param
 this is problematic should rename to isNotEmptyParam
 and we should check if its array is it empty array
 if it's object then if its empty object
 */
export function notEmpty (a: unknown, valueCheck = false): boolean {
  if (Array.isArray(a)) {
    // @NOTE we now check if its an empty array as well
    return valueCheck ? !!a.length : false
  }
  if (isPlainObject(a)) {
    return valueCheck ? !isEmptyObj(a) : false
  }
  return isNotEmpty(a)
}

/** just not to make my head hurt */
export const isEmpty = (value: unknown, valueCheck?: boolean) => !notEmpty(value, valueCheck)
