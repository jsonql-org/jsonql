import Jsonql406Error from './406-error.mjs'
import Jsonql500Error from './500-error.mjs'
import JsonqlForbiddenError from './forbidden-error.mjs'
import JsonqlAuthorisationError from './authorisation-error.mjs'
import JsonqlContractAuthError from './contract-auth-error.mjs'
import JsonqlResolverAppError from './resolver-app-error.mjs'
import JsonqlResolverNotFoundError from './resolver-not-found-error.mjs'
// check options error
import JsonqlEnumError from './enum-error.mjs'
import JsonqlTypeError from './type-error.mjs'
import JsonqlCheckerError from './checker-error.mjs'
// share
import JsonqlValidationError from './validation-error.mjs'
import JsonqlError from './error.mjs'

import JsonqlServerError from './server-error.mjs'

import { NO_ERROR_MSG } from './constants.mjs'

/**
 * If using the instance of could not find the actual error then
 * we need to use a different way to analysis the error object to find the exact
 * Error type
 * @param {object} e error
 * @param {*} msg message
 * @param {*} detail the full detail
 * @return {boolean} if this is false then not found
 */
function getErrorByObject(e, msg, detail) {
  // @TODO
}


/**
 * this will put into generator call at the very end and catch
 * the error throw from inside then throw again
 * this is necessary because we split calls inside and the throw
 * will not reach the actual client unless we do it this way
 * @param {object} e Error
 * @return {void} just throw
 */
export default function finalCatch(e) {
  // this is a hack to get around the validateAsync not actually throw error
  // instead it just rejected it with the array of failed parameters
  if (Array.isArray(e)) {
    // if we want the message then I will have to create yet another function
    // to wrap this function to provide the name prop
    throw new JsonqlValidationError('', e)
  }
  const msg = e.message || NO_ERROR_MSG
  const detail = e.detail || e
  // @BUG the instance of not always work for some reason!
  // need to figure out a better way to find out the type of the error
  switch (true) {
    case e instanceof Jsonql406Error:
      throw new Jsonql406Error(msg, detail)
    case e instanceof Jsonql500Error:
      throw new Jsonql500Error(msg, detail)
    case e instanceof JsonqlForbiddenError:
      throw new JsonqlForbiddenError(msg, detail)
    case e instanceof JsonqlAuthorisationError:
      throw new JsonqlAuthorisationError(msg, detail)
    case e instanceof JsonqlContractAuthError:
      throw new JsonqlContractAuthError(msg, detail)
    case e instanceof JsonqlResolverAppError:
      throw new JsonqlResolverAppError(msg, detail)
    case e instanceof JsonqlResolverNotFoundError:
      throw new JsonqlResolverNotFoundError(msg, detail)
    case e instanceof JsonqlEnumError:
      throw new JsonqlEnumError(msg, detail)
    case e instanceof JsonqlTypeError:
      throw new JsonqlTypeError(msg, detail)
    case e instanceof JsonqlCheckerError:
      throw new JsonqlCheckerError(msg, detail)
    case e instanceof JsonqlValidationError:
      throw new JsonqlValidationError(msg, detail)
    case e instanceof JsonqlServerError:
      throw new JsonqlServerError(msg, detail)
    default:
      throw new JsonqlError(msg, detail)
  }
}