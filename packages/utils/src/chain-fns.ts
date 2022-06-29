import type { AnyType, AnyTypeArr } from './types'
import { toArray } from './common'
/**
 * using just the map reduce to chain multiple functions together
 * @_param {function} mainFn the init function
 * @_param {array} moreFns as many as you want to take the last value and return a new one
 * @_return {function} accept value for the mainFn
 */
export const chainFns = (
  mainFn: AnyType,
  ...moreFns: AnyTypeArr
): ((...args: AnyTypeArr) => AnyType) => (
  (...args: AnyTypeArr) => (
    moreFns.reduce((value, nextFn) => (
      // change here to check if the return value is array then we spread it
      Reflect.apply(nextFn, null, toArray(value))
    ), Reflect.apply(mainFn, null, args))
  )
)

/**
 * pass an array of functions to call chainFns
 */
export const chainArrayFns = (fns: AnyTypeArr) => Reflect.apply(chainFns, null, fns)
