/**
 * simple for browser console.info wrapper
 */
export function logger(...args: any[]): void {
  try {
    if (window && window.DEBUG) {
      Reflect.apply(console.log, console, args)
    }
  } catch(e) {}
}

/**
 * generic logger method can control via global property
 */
export const getLogger = (name: string) => {
  let base = [name]
  return (...args: any[]) => {
    try {
      if (window && window.JSONQL_DEBUG) {
        Reflect.apply(console.info, console, base.concat(args))
      }
    } catch(e) {}
  }
}
