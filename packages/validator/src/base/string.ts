// validate string type

import { isString } from '../lib/lodash'
/**
 * double check if its string 
 */
export function checkString(value: any) {
  return ((value+'').trim() !== '') ? isString(value) : false
}
