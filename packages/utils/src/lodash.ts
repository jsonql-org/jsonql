// group all the lodash import export in one place
// import curry from 'lodash.curry'
// import mapValues from 'lodash-es/mapValues'
import type { FlatMapCallback } from './types'
import { trueTypeOf } from './truetypeof'
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

export const isObject = (item: unknown): boolean => {
  return (trueTypeOf(item) === 'object' && !Array.isArray(item))
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
  return trueTypeOf(value) === 'string'
}
// Poorman way ...
/*
export function isEqual(obj1: unknown, obj2: unknown): boolean {
  try {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
  } catch(e) {
    return false
  }
}
*/
/*!
 * Check if two objects or arrays are equal
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {*}       obj1 The first item
 * @param  {*}       obj2 The second item
 * @return {Boolean}       Returns true if they're equal in value
 */
export function isEqual (obj1: unknown, obj2: unknown) {
	function getType (obj: unknown): string {
		return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
	}
	function areArraysEqual () {
		// Check length
		if ((obj1 as unknown[]).length !== (obj2 as unknown[]).length) {
      return false
    }
		// Check each item in the array
		for (let i = 0; i < (obj1 as unknown[]).length; i++) {
			if (!isEqual((obj1 as unknown[])[i], (obj2 as unknown[])[i])) {
        return false
      }
		}
		// If no errors, return true
		return true
	}
	function areObjectsEqual () {
		if (Object.keys(obj1 as object).length !== Object.keys(obj2 as object).length) {
      return false
    }
		// Check each item in the object
		for (const key in obj1 as object) {
			if (Object.prototype.hasOwnProperty.call(obj1, key)) {
				if (!isEqual((obj1 as object)[key], (obj2 as object)[key])) {
          return false
        }
			}
		}
		// If no errors, return true
		return true
	}
	function areFunctionsEqual () {
		return (obj1 as object).toString() === (obj2 as object).toString()
	}
	function arePrimativesEqual () {
		return obj1 === obj2
	}
	// Get the object type
	const type = getType(obj1)
  switch (type) {
    case 'array':
      return areArraysEqual()
    case 'object':
      return areObjectsEqual()
    case 'function':
      return areFunctionsEqual()
    default:
      if (type !== getType(obj2)) {
        return false
      }
      return arePrimativesEqual()
  }
}
