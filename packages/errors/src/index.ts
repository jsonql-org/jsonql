
import Jsonql406Error from './406-error'
import Jsonql500Error from './500-error'
import JsonqlForbiddenError from './forbidden-error'

import JsonqlAuthorisationError from './authorisation-error'
import JsonqlContractAuthError from './contract-auth-error'
import JsonqlResolverAppError from './resolver-app-error'
import JsonqlResolverNotFoundError from './resolver-not-found-error'
import JsonqlEnumError from './enum-error'
import JsonqlTypeError from './type-error'
import JsonqlCheckerError from './checker-error'
import ValidationError from './validation-error'
import JsonqlError from './error'
import JsonqlServerError from './server-error'
import GeneralError from './general-error'

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
  ValidationError,
  JsonqlError,
  JsonqlServerError,
  GeneralError,
}

export {
  UNKNOWN_ERROR,
  JSONQL_ERRORS_INFO,
  SERVER_INTERNAL_STATUS,
  NO_ERROR_MSG,
  NO_STATUS_CODE,
  SUCCESS_STATUS,
  UNAUTHORIZED_STATUS,
  FORBIDDEN_STATUS,
  NOT_FOUND_STATUS,
  NOT_ACCEPTABLE_STATUS,
} from './constants'

import finalCatch from './fn/final-catch'
import getErrorByStatus from './fn/get-error-by-status'
import {
  getErrorNameByInstanceWithDefault,
  getErrorNameByInstance,
} from './fn/get-error-name-by-instance'
import { templateErrorObject } from './template'

export {
  finalCatch,
  getErrorByStatus,
  getErrorNameByInstanceWithDefault,
  getErrorNameByInstance,
  templateErrorObject,
}
