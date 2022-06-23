// port couple regex methods from the @to1source/event
import type { AnyType } from './types'
import { isString } from './lodash'

/**
 * Just check if a pattern is an RegExp object
 */
export function isRegExp(pat: AnyType): boolean {
  return pat instanceof RegExp
}

/**
 * Find from the array by matching the pattern
 */
export function getRegex(pattern: string | RegExp) {
  switch (true) {
    case isRegExp(pattern):
      return pattern
    case isString(pattern):
      return new RegExp(pattern)
    default:
      return false
  }
}
