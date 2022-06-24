// validate string type

import { isString } from '@jsonql/utils/dist/lodash'
/**
 * double check if its string
 */
export function checkString(value: unknown) {
  return ((value+'').trim() !== '') ? isString(value) : false
}
