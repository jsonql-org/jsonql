// this will add directly to the then call in each http call

import * as errors from './index.mjs'
// import getErrorByStatus from './get-error-by-status'
import { NO_ERROR_MSG } from './constants.mjs'
const { JsonqlError } = errors

/**
 * We can not just check something like result.data what if the result if false?
 * @param {object} obj the result object
 * @param {string} key we want to check if its exist or not
 * @return {boolean} true on found
 */
const isObjectHasKey = (obj, key) => {
  const keys = Object.keys(obj)
  return !!keys.filter(k => key === k).length
}

/**
 * It will ONLY have our own jsonql specific implement check
 * @param {object} result the server return result
 * @return {object} this will just throw error
 */
export default function clientErrorsHandler(result) {
  if (isObjectHasKey(result, 'error')) {
    const { error } = result
    const { className, name } = error
    const errorName = className || name
    // just throw the whole thing back
    const msg = error.message || NO_ERROR_MSG
    const detail = error.detail || error
    if (errorName && errors[errorName]) {
      throw new errors[className](msg, detail)
    }
    throw new JsonqlError(msg, detail)
  }
  // pass through to the next
  return result
}
