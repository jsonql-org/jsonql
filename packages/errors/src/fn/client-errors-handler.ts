// this will add directly to the then call in each http call

import GeneralException from '../error'
// import getErrorByStatus from './get-error-by-status'
import { NO_ERROR_MSG } from '../constants'

/**
 * We can not just check something like result.data what if the result if false?
 */
const isObjectHasKey = (obj: any, key: string): boolean => {
  const keys = Object.keys(obj)
  return !!keys.filter(k => key === k).length
}

/**
 * It will ONLY have our own jsonql specific implement check
 */
export default function clientErrorsHandler(result: any) {
  if (isObjectHasKey(result, 'error')) {
    const { error } = result
    const { className, name } = error
    const errorName = className || name
    // just throw the whole thing back
    const msg = error.message || NO_ERROR_MSG
    const detail = error.detail || error
    if (errorName && error[errorName]) {
      throw new error[className](msg, detail)
    }
    throw new GeneralException(msg, detail)
  }
  // pass through to the next
  return result
}
