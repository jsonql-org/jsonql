// jsonql-errors module interface
import getErrorByStatus from './src/get-error-by-status.mjs'
import clientErrorsHandler from './src/client-errors-handler.mjs'
import {
  getErrorNameByInstance,
  getErrorNameByInstanceWithDefault
} from './src/get-error-name-by-instance.mjs'
import finalCatch from './src/final-catch.mjs'
import {
  JSONQL_ERRORS_INFO,
  UNKNOWN_ERROR,
} from './src/constants.mjs'

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
