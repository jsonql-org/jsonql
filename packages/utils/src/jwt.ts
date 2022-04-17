// ported from the jsonql-jwt
import { BASE64_FORMAT } from '@jsonql/constants'
/**
 * create a buffer from string
 * @param {string} str to transform
 * @param {string} [format=BASE64_FORMAT] format to use
 * @return {buffer} tramsformed
 */
export function buff(str, format = BASE64_FORMAT) {
  if (Buffer.isBuffer(str)) {
    return str
  }
  return new Buffer.from(str, format)
}

/**
 * encode in base64 string
 * @param {*} str target
 * @return {string} base64 encoded
 */
export const base64Encode = str => window.btoa(unescape(encodeURIComponent(str)))

/**
 * decode from base64 string
 * @param {string} json base64 encoded string
 * @return {*} decoded payload
 */
export const base64Decode = json => decodeURIComponent(escape(window.atob(json)))
