// validate object type
import { isPlainObject } from '../lib/lodash'
// import filter from 'lodash-es/filter'
import { combineCheck } from './combine'
import { checkArray, isArrayLike, arrayTypeHandler } from './array'
import { JsonqlCheckObjectKeys } from '../types'

/**
 * check if the input is object also able to check if key(s) existed in that object
 @TODO need to rethink about how this checkObject keys should be
 */
export function checkObject(
  value: any,
  keys?: string | Array<string> | Array<JsonqlCheckObjectKeys>
) {
  if (isPlainObject(value)) {
    if (!keys) {
      return true
    }
    // bs about ts
    if (typeof keys === 'string') {
      return keys in value
    }
    // @TODO we might have to break it up into a different method
    else if (checkArray(keys)) {
      if (typeof keys[0] === 'string') {
        return checkIfKeysInObj(
          value,
          keys as unknown as Array<string>
        )
      }
      return checkIfNameTypeInObj(
        value,
        keys as unknown as Array<JsonqlCheckObjectKeys>
      )
    }
  }
  return false
}

/** check if the keys existed in the object */
function checkIfKeysInObj(
  value: any,
  keys: Array<string>
) {
  return !keys.filter((key: string) => {
    return !(key in value)
  }).length
}

/** check if JsonqlCheckObjectKeys is in the object */
function checkIfNameTypeInObj(
  value: any,
  keys: Array<JsonqlCheckObjectKeys>
) {
  // please note we DON'T care if some is optional
  // please refer to the contract.json for the keys
  return !keys.filter((key: JsonqlCheckObjectKeys) => {
    const _value = value[key.name]
    return !(key.type.length > key.type.filter((type: unknown) => {
      let tmp: unknown
      if (_value !== undefined) {
        if ((tmp = isArrayLike(type as string)) !== false) {
          return !arrayTypeHandler({arg: _value}, tmp as any[])
          // return tmp.filter(t => !checkArray(_value, t)).length;
          // @TODO there might be an object within an object with keys as well :S
        }
        return !combineCheck(type as string)(_value)
      }
      return true
    }).length)
  }).length
}

/**
 * fold this into it's own function to handler different object type
 */
export const objectTypeHandler = function(p: any) {
  const { arg, param } = p
  const _args = [arg]
  if (Array.isArray(param.keys) && param.keys.length) {
    _args.push(param.keys)
  }
  // just simple check
  return Reflect.apply(checkObject, null, _args)
}

/** check if an object is empty */
export const isEmptyObject = function(value: any) {
  if (isPlainObject(value)) {
    const keys = Object.keys(value)

    return !keys.length
  }
  return false
}
