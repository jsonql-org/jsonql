import { trueTypeOf } from './truetypeof'
const expected = ['asyncfunction', 'function']
/**
 * Simple check if the prop is function
 * We found situtation where it report as an object but debug output show as [Function]
 */
export const isFunction = function (prop: unknown, debug = false): boolean {
  const result = trueTypeOf(prop)
  if (expected.includes(result)) {
    return true
  }
  if (debug) {
    console.error(`Expect to be Function type! Got ${typeof prop}`)
  }
  return false
}
/** finally found a solution to check if something is an async function */
export function isAsyncFunction (prop: unknown): boolean {
  return trueTypeOf(prop) === expected[0]
}
