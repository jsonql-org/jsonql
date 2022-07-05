// Array related methods
import type { AnyType, AnyTypeArr } from './types'
/**
 * DIY in Array
 */
export const inArray = (arr: AnyTypeArr, value: AnyType) => arr.includes(value)

// quick and dirty to turn non array to array
export const toArray = (arg: AnyType) => Array.isArray(arg) ? arg : [arg]

/**  remove nil-like-value from array */
export const compact = (arr: Array<unknown>) => arr.filter(Boolean)
