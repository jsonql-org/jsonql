// jsonql-errors module interface
import getErrorByStatus from './src/get-error-by-status'
import clientErrorsHandler from './src/client-errors-handler'
import {
  getErrorNameByInstance,
  getErrorNameByInstanceWithDefault
} from './src/get-error-name-by-instance'
import finalCatch from './src/final-catch.js'
import {
  JSONQL_ERRORS_INFO,
  UNKNOWN_ERROR,
} from './src/constants'

import {
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
  JsonqlServerError
} from './src'
// export
export {
  JSONQL_ERRORS_INFO,
  UNKNOWN_ERROR,

  getErrorByStatus,
  clientErrorsHandler,
  finalCatch,
  getErrorNameByInstance,
  getErrorNameByInstanceWithDefault,

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

  JsonqlServerError
}
