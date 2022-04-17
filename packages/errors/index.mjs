
// export all errors classes
export * from './src/index.mjs'
import GeneralError from './src/general.mjs'

import {
  UNKNOWN_ERROR,
  JSONQL_ERRORS_INFO
} from './src/constants.mjs'

// export all the functions

import finalCatch from './src/final-catch.mjs'
import getErrorByStatus from './src/get-error-by-status.mjs'
import {
  getErrorNameByInstanceWithDefault,
  getErrorNameByInstance,
} from './src/get-error-name-by-instance.mjs'

export {
  finalCatch,
  getErrorByStatus,
  getErrorNameByInstance,
  getErrorNameByInstanceWithDefault,
  UNKNOWN_ERROR,
  JSONQL_ERRORS_INFO ,
  GeneralError
}
