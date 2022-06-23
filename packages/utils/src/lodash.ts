// group all the lodash import export in one place
import merge from 'lodash.merge'
import curry from 'lodash.curry'
// import mapValues from 'lodash-es/mapValues'
type FlatMapCallback = (n: any, i: number, arr: any[]) => any
// import mapKeys from 'lodash-es/mapKeys'
// import omitBy from 'lodash-es/omitBy'
/// import isEqual from 'lodash-es/isEqual'
// import findKey from 'lodash-es/findKey'
// import flatMap from 'lodash-es/flatMap'

export function flatMap(arr: any[], callback?: FlatMapCallback) {
  if (!callback) {
    callback = n => n
  }
  return arr.flatMap(callback as FlatMapCallback)
}

export function isPlainObject (obj: unknown): boolean {
	return Object.prototype.toString.call(obj) === '[object Object]'
}

// the lodash-es ESM module can not import from commonjs etc etc etc bug
// so we get rip of most of them
export function isString(value: unknown): boolean {
  return typeof value === 'string'
}
// Poorman way ...
export function isEqual(obj1: unknown, obj2: unknown): boolean {
  try {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
  } catch(e) {
    return false
  }
}

// export
export {
  merge,
  curry
  // mapValues,
// mapKeys,
  // omitBy,
  // findKey,
  // isEqual
}
