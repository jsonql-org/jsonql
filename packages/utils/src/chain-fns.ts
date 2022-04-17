import { toArray } from './generic'
/**
 * using just the map reduce to chain multiple functions together
 * @param {function} mainFn the init function
 * @param {array} moreFns as many as you want to take the last value and return a new one
 * @return {function} accept value for the mainFn
 */
export const chainFns = (mainFn: Function, ...moreFns: Array<Function>) => (
  (...args: any[]) => (
    moreFns.reduce((value, nextFn) => (
      // change here to check if the return value is array then we spread it
      Reflect.apply(nextFn, null, toArray(value))
    ), Reflect.apply(mainFn, null, args))
  )
)
