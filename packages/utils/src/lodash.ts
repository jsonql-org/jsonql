// group all the lodash import export in one place
// import curry from 'lodash.curry'
// import mapValues from 'lodash-es/mapValues'
import type { FlatMapCallback } from './types'
// DIY curry method
export const curry = (fn: any, ...args: any[]) =>
  (fn.length <= args.length) ?
    fn(...args) :
    (...more: any[]) => curry(fn, ...args, ...more)

// import mapKeys from 'lodash-es/mapKeys'
// import omitBy from 'lodash-es/omitBy'
// import findKey from 'lodash-es/findKey'
export const merge = (target: any, ...sources: any[]) => {
  if (!sources.length) return target
  const source = sources.shift()
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, {
            [key]: {}
          })
        }
        merge(target[key], source[key])
      } else {
        Object.assign(target, {
          [key]: source[key]
        })
      }
    }
  }
  return merge(target, ...sources)
}

export const isObject = (item: unknown) => {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

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
