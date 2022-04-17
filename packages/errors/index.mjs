
// export all errors classes
export * from './src/index.mjs'
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
  getErrorNameByInstanceWithDefault
}
