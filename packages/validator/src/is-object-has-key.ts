
import isInArray from './is-in-array'

export default function isObjectHasKey(obj: any, key: string | symbol) {
  const keys = Object.keys(obj)

  return isInArray(keys, key)
}
