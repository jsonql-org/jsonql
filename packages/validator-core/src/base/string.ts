// validate string type

import { isString } from '../lib/lodash'
/**
 * double check if its string
 */
export function checkString(value: unknown) {
  return ((value+'').trim() !== '') ? isString(value) : false
}
