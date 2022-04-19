
import isInArray from './is-in-array'

const isObjectHasKey = function(obj, key) {
  const keys = Object.keys(obj)
  return isInArray(keys, key)
}

export default isObjectHasKey