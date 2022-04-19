// validate object type

import isPlainObject from 'lodash-es/isPlainObject'
// import filter from 'lodash-es/filter'
import combineFn from './combine'
import { checkIsArray, isArrayLike, arrayTypeHandler } from './array'
/**
 * @TODO if provide with the keys then we need to check if the key:value type as well
 * @param {object} value expected
 * @param {array} [keys=null] if it has the keys array to compare as well
 * @return {boolean} true if OK
 */
export const checkIsObject = function(value, keys=null) {
  if (isPlainObject(value)) {
    if (!keys) {
      return true
    }
    if (checkIsArray(keys)) {
      // please note we DON'T care if some is optional
      // plese refer to the contract.json for the keys
      return !keys.filter(key => {
        let _value = value[key.name];
        return !(key.type.length > key.type.filter(type => {
          let tmp;
          if (_value !== undefined) {
            if ((tmp = isArrayLike(type)) !== false) {
              return !arrayTypeHandler({arg: _value}, tmp)
              // return tmp.filter(t => !checkIsArray(_value, t)).length;
              // @TODO there might be an object within an object with keys as well :S
            }
            return !combineFn(type)(_value)
          }
          return true
        }).length)
      }).length;
    }
  }
  return false
}

/**
 * fold this into it's own function to handler different object type
 * @param {object} p the prepared object for process
 * @return {boolean}
 */
export const objectTypeHandler = function(p) {
  const { arg, param } = p
  let _args = [arg]
  if (Array.isArray(param.keys) && param.keys.length) {
    _args.push(param.keys)
  }
  // just simple check
  return Reflect.apply(checkIsObject, null, _args)
}
