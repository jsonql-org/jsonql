// group all the lodash import export in one place
// import curry from 'lodash.curry'
// import mapValues from 'lodash-es/mapValues'
import type { AnyType, FlatMapCallback } from './types'
import { trueTypeOf } from './truetypeof'
import { isObject } from './object'

// DIY curry method
export const curry = (fn: AnyType, ...args: AnyType[]) =>
  (fn.length <= args.length) ?
    fn(...args) :
    (...more: AnyType[]) => curry(fn, ...args, ...more)

// import mapKeys from 'lodash-es/mapKeys'
// import omitBy from 'lodash-es/omitBy'
// import findKey from 'lodash-es/findKey'
export const merge = (target: AnyType, ...sources: AnyType[]) => {
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

// flatMap native
export function flatMap (arr: AnyType[], callback?: FlatMapCallback) {
  if (!callback) {
    callback = n => n
  }
  return arr.flatMap(callback as FlatMapCallback)
}

// the lodash-es ESM module can not import from commonjs etc etc etc bug
// so we get rip of most of them
export function isString (value: unknown): boolean {
  return trueTypeOf(value) === 'string'
}
