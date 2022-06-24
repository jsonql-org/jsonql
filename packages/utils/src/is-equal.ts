// move out from lodash

// Poorman way ...
export function isEqualCheap(obj1: unknown, obj2: unknown): boolean {
  try {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
  } catch(e) {
    return false
  }
}

/*
 * Check if two objects or arrays are equal
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * (c) 2022 Joel Chu rewrite in Typescript and fix styling issues
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
