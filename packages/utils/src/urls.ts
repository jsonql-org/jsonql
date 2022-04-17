import { timestamp } from './timestamp'

/**
 * construct a url with query parameters
 * @param {string} url to append
 * @param {object} params to append to url
 * @return {string} url with appended params
 */
export const urlParams = (url, params) => {
  let parts = []
  for (let key in params) {
    parts.push( [key, params[key]].join('=') )
  }
  return [url, parts.join('&')].join('?')
}

/**
 * construct a url with cache burster
 * @param {string} url to append to
 * @return {object} _cb key timestamp
 */
export const cacheBurstUrl = url => urlParams(url, cacheBurst())

/**
 * @return {object} _cb as key with timestamp
 */
export const cacheBurst = () => ({ _cb: timestamp() })
