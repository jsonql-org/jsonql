
/**
 * Simple check if the prop is function
 * We found situtation where it report as an object but debug output show as [Function]
 */
export const isFunction = function(prop: unknown, debug = false) {
  if (typeof prop === 'function') {
    return true
  }
  if (debug) {
    console.error(`Expect to be Function type! Got ${typeof prop}`)
  }
  return false
}
