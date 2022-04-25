// validate array type
import { isPlainObject } from '../lib/lodash'
import { combineCheck } from './combine'
import {
  ARRAY_TYPE,
  OBJECT_TYPE,
} from '@jsonql/constants'

/**
 * check if its array or array like
 * why the type is a not a boolean?
 */
export function checkArray(
  value: any,
  type?: string | string[] // @TODO more combination
) {
  if (Array.isArray(value)) {
    if (!type) {
      return true
    }
    // we test it in reverse
    // @TODO if the type is an array (OR) then what?
    // we need to take into account this could be an array
    let c: any[]
    if (Array.isArray(type)) { // Union type
      c = value.filter((v: any) => {
        // only need one is correct
        const ctn = type.length
        for (let i = 0; i < ctn; ++i) {
          const t = type[i]
          if (
            (t === ARRAY_TYPE && Array.isArray(v)) ||
            (t === OBJECT_TYPE && isPlainObject(v)) ||
            combineCheck(t)(v)
          ) {
            return false
          }
        }
        return true
      })
    } else {
      c = value.filter(v => !combineCheck(type)(v))
    }
    return !(c.length > 0)
  }
  return false
}
