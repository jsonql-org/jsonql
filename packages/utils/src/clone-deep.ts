import type { AnyType } from './types'
import { trueTypeOf } from './truetypeof'
// Poorman ...
export const cloneDeepCheap = (obj: AnyType) => JSON.parse(JSON.stringify(obj))

/*
 * Create an immutable clone of data (an array, object, map, set, etc.)
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * (c) 2022 Joel Chu rewritten in Typescript and fix a lot of coding style
 */
export function cloneDeep (obj: AnyType) {
	/**
	 * Copy properties from the original object to the clone
	 */
	function copyProps (clone: AnyType) {
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				clone[key] = cloneDeep(obj[key])
			}
		}
	}

	/**
	 * Create an immutable copy of an object
	 */
	function cloneObj () {
		const clone = {}
		copyProps(clone)
		return clone
	}

	/**
	 * Create an immutable copy of an array
	 */
	function cloneArr () {
		return obj.map(function (item: AnyType) {
			return cloneDeep(item)
		});
	}

	/**
	 * Create an immutable copy of a Map
	 */
	function cloneMap () {
		const clone = new Map()
		for (const [key, val] of obj) {
			clone.set(key, cloneDeep(val))
		}
		return clone
	}

	/**
	 * Create an immutable clone of a Set
	 */
	function cloneSet () {
		const clone = new Set()
		for (const item of obj) {
			clone.add(cloneDeep(item))
		}
		return clone
	}

	/**
	 * Create an immutable copy of a function
	 */
	function cloneFunction () {
    // @ts-ignore
    const self = this as AnyType
		const clone = obj.bind(self)
		copyProps(clone)
		return clone
	}

	// Get object type
	const type = trueTypeOf(obj)
  switch (type) {
    case 'object':
      return cloneObj()
    case 'array':
      return cloneArr()
    case 'map':
      return cloneMap()
    case 'set':
      return cloneSet()
    case 'function':
      return cloneFunction()
    default:
      return obj
  }
}
