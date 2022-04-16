// just a simple util method to return the error based on the status code
import {
  UNAUTHORIZED_STATUS,
  FORBIDDEN_STATUS,
  NOT_FOUND_STATUS,
  NOT_ACCEPTABLE_STATUS,
  SERVER_INTERNAL_STATUS
} from './constants'


/**
 * @param {number} statusCode to check
 * @param {boolean} contract if this is a contract call or not
 * @return {string} the error name
 */
export default function getErrorByStatus(statusCode, contract = false) {
  switch (statusCode) {
    case UNAUTHORIZED_STATUS:
      return contract ? 'JsonqlContractAuthError' : 'JsonqlAuthorisationError'
    case FORBIDDEN_STATUS:
      return 'JsonqlForbiddenError'
    case NOT_FOUND_STATUS:
      return 'JsonqlResolverNotFoundError'
    case NOT_ACCEPTABLE_STATUS:
      return 'Jsonql406Error'
    case SERVER_INTERNAL_STATUS:
      return 'Jsonql500Error'
    default:
      return 'JsonqlError'
  }
}
