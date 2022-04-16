// port couple regex methods from the @to1source/event
import isString from 'lodash-es/isString'

/**
 * Just check if a pattern is an RegExp object
 * @param {*} pat whatever
 * @return {boolean} false when its not
 */
export function isRegExp(pat) {
  return pat instanceof RegExp
}

/**
 * Find from the array by matching the pattern
 * @param {*} pattern a string or RegExp object
 * @return {object} regex object or false when we can not id the input
 */
export function getRegex(pattern) {
  switch (true) {
    case isRegExp(pattern) === true:
      return pattern
    case isString(pattern) === true:
      return new RegExp(pattern)
    default:
      return false
  }
}
