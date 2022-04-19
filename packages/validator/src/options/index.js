// export also create wrapper methods
import checkOptionsAsync from './check-options-async'
import checkOptionsSync from './check-options-sync'
import constructConfigFn from './construct-config'
import {
  ENUM_KEY,
  CHECKER_KEY,
  ALIAS_KEY,
  OPTIONAL_KEY
} from 'jsonql-constants'

/**
 * This has a different interface
 * @param {*} value to supply
 * @param {string|array} type for checking
 * @param {object} params to map against the config check
 * @param {array} params.enumv NOT enum
 * @param {boolean} params.optional false then nothing
 * @param {function} params.checker need more work on this one later
 * @param {string} params.alias mostly for cmd
 */
const createConfig = (value, type, params = {}) => {
  // Note the enumv not ENUM
  // const { enumv, optional, checker, alias } = params;
  // let args = [value, type, optional, enumv, checker, alias];
  const {
    [OPTIONAL_KEY]: o,
    [ENUM_KEY]: e,
    [CHECKER_KEY]: c,
    [ALIAS_KEY]: a
  } = params;
  return constructConfigFn.apply(null,  [value, type, o, e, c, a])
}

// for testing purpose
const JSONQL_PARAMS_VALIDATOR_INFO = '__PLACEHOLDER__'

/**
 * construct the actual end user method, rename with prefix get since 1.5.2
 * @param {function} validateSync validation method
 * @return {function} for performaning the actual valdiation
 */
const getCheckConfigAsync = function(validateSync) {
  /**
   * We recreate the method here to avoid the circlar import
   * @param {object} config user supply configuration
   * @param {object} appProps mutation options
   * @param {object} [constantProps={}] optional: immutation options
   * @return {object} all checked configuration
   */
  return function(config, appProps, constantProps= {}) {
    return checkOptionsAsync(config, appProps, constantProps, validateSync)
  }
}

/**
 * copy of above but it's sync, rename with prefix get since 1.5.2
 * @param {function} validateSync validation method
 * @return {function} for performaning the actual valdiation
 */
const getCheckConfig = function(validateSync) {
  return function(config, appProps, constantProps = {}) {
    return checkOptionsSync(config, appProps, constantProps, validateSync)
  }
}

// re-export
export {
  createConfig,
  constructConfigFn,
  getCheckConfigAsync,
  getCheckConfig,
  JSONQL_PARAMS_VALIDATOR_INFO
}
