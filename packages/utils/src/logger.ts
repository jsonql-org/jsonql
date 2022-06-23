import type { AnyType, AnyTypeArr } from './types'

declare global {
  interface Window {
    DEBUG?: AnyType
    JSONQL_DEBUG?: AnyType
  }
}

/**
 * simple for browser console.info wrapper
 */
export function logger(...args: AnyTypeArr): void {
  try {
    if (window && window.DEBUG) {
      Reflect.apply(console.log, console, args)
    }
  } catch(e) {
    return
  }
}

/**
 * generic logger method can control via global property
 */
export const getLogger = (name: string) => {
  const base = [name]
  return (...args: AnyTypeArr) => {
    try {
      if (window && window.JSONQL_DEBUG) {
        Reflect.apply(console.info, console, base.concat(args))
      }
    } catch(e) {
      return
    }
  }
}
