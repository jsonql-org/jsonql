// port couple regex methods from the @to1source/event
import { isString } from './lodash'

/**
 * Just check if a pattern is an RegExp object
 */
export function isRegExp(pat: any): boolean {
  return pat instanceof RegExp
}

/**
 * Find from the array by matching the pattern
 */
export function getRegex(pattern: any) {
  switch (true) {
    case isRegExp(pattern) === true:

      return pattern
    case isString(pattern) === true:

      return new RegExp(pattern)
    default:

      return false
  }
}
