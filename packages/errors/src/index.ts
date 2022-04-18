// server side
import {
 Jsonql406Error,
 Jsonql500Error,
 JsonqlForbiddenError,
 JsonqlAuthorisationError,
 JsonqlContractAuthError,
 JsonqlResolverAppError,
 JsonqlResolverNotFoundError,
// check options error
 JsonqlEnumError,
 JsonqlTypeError,
 JsonqlCheckerError,
// share
 JsonqlValidationError,
 JsonqlError,
 JsonqlServerError,
 GeneralError
} from './base'
// constants
import {
  UNKNOWN_ERROR,
  JSONQL_ERRORS_INFO
} from './constants'
// export all the functions
import finalCatch from './fn/final-catch'
import getErrorByStatus from './fn/get-error-by-status'
import {
  getErrorNameByInstanceWithDefault,
  getErrorNameByInstance,
} from './fn/get-error-name-by-instance'
// export
export {
  Jsonql406Error,
  Jsonql500Error,
  JsonqlForbiddenError,
  JsonqlAuthorisationError,
  JsonqlContractAuthError,
  JsonqlResolverAppError,
  JsonqlResolverNotFoundError,
  JsonqlEnumError,
  JsonqlTypeError,
  JsonqlCheckerError,
  JsonqlValidationError,
  JsonqlError,
  JsonqlServerError,
  GeneralError,
  UNKNOWN_ERROR,
  JSONQL_ERRORS_INFO,
  finalCatch,
  getErrorByStatus,
  getErrorNameByInstanceWithDefault,
  getErrorNameByInstance,
}
