import type { AnyType } from './types'
import { timestamp } from './timestamp'

/**
 * construct a url with query parameters
 */
export const urlParams = (url: string, params: AnyType): string => {
  const parts: string[] = []
  for (const key in params) {
    parts.push( [ key, params[key] ].join('=') )
  }

  return [ url, parts.join('&') ].join('?')
}

/**
 * construct a url with cache burster
 */
export const cacheBurstUrl = (url: string) => urlParams(url, cacheBurst())

/**
 * return _cb as key with timestamp
 */
export const cacheBurst = (name = '_cb') => ({ [name]: timestamp() })
