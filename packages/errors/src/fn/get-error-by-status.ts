// just a simple util method to return the error based on the status code
import {
  UNAUTHORIZED_STATUS,
  FORBIDDEN_STATUS,
  NOT_FOUND_STATUS,
  NOT_ACCEPTABLE_STATUS,
  SERVER_INTERNAL_STATUS
} from '../constants'

/**
 * use the status code to find the right type of error 
 */
export default function getErrorByStatus(statusCode: string | number, contract = false): string {
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
