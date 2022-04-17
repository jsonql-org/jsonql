/**
 * simple for browser console.info wrapper
 * @param {array} args
 * @return {void}
 */
export function logger(...args) {
  try {
    if (window && window.DEBUG) {
      Reflect.apply(console.log, console, args)
    }
  } catch(e) {}
}

/**
 * generic logger method can control via global property
 * @param {string} name of this logger to prepend to the output
 * @return {function} the logging method 
 */
export const getLogger = name => {
  let base = [name]
  return (...args) => {
    try {
      if (window && window.JSONQL_DEBUG) {
        Reflect.apply(console.info, console, base.concat(args))
      }
    } catch(e) {}
  }
}
