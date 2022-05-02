// ported from the jsonql-jwt
import { BASE64_FORMAT } from '@jsonql/constants'
/**
 * create a buffer from string
 */
export function buff(str: string, format = BASE64_FORMAT): Buffer {
  if (Buffer.isBuffer(str)) {

    return str
  }

  return Buffer.from(str, format)
}

/**
 * encode in base64 string
 */
export const base64Encode = (str: any) => window.btoa(unescape(encodeURIComponent(str)))

/**
 * decode from base64 string
 */
export const base64Decode = (json: string) => decodeURIComponent(escape(window.atob(json)))
