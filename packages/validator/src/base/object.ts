// validate object type
import { isPlainObject } from '../lib/lodash'
// import filter from 'lodash-es/filter'
import { combineCheck } from './combine'
import { checkArray, isArrayLike, arrayTypeHandler } from './array'
/**
 * @TODO if provide with the keys then we need to check if the key:value type as well
 */
export const checkObject = function(value: any, keys?: Array<any>) {
  if (isPlainObject(value)) {
    if (!keys) {
      return true
    }
    // @TODO we might have to break it up into a different method
    if (checkArray(keys)) {
      // please note we DON'T care if some is optional
      // please refer to the contract.json for the keys
      return !keys.filter(key => {
        const _value = value[key.name];
        return !(key.type.length > key.type.filter(type => {
          let tmp: any
          if (_value !== undefined) {
            if ((tmp = isArrayLike(type)) !== false) {

              return !arrayTypeHandler({arg: _value}, tmp)
              // return tmp.filter(t => !checkArray(_value, t)).length;
              // @TODO there might be an object within an object with keys as well :S
            }

            return !combineCheck(type)(_value)
          }

          return true
        }).length)
      }).length
    }
  }

  return false
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
