// primitive types
import { checkNumber } from './number'
import { checkString } from './string'
import { checkBoolean } from './boolean'
import { checkAny } from './any'
import { NUMBER_TYPE, STRING_TYPE, BOOLEAN_TYPE } from '@jsonql/constants'

/**
 * this is a wrapper method to call different one based on their type
 */
export function combineCheck(type: string) {
  switch (type) {
    case NUMBER_TYPE:
      return checkNumber
    case STRING_TYPE:
      return checkString
    case BOOLEAN_TYPE:
      return checkBoolean
    default:
      return checkAny
  }
}
