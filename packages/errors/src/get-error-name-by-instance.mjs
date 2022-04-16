// get error name by instance
import { UNKNOWN_ERROR } from './constants.mjs'

/**
 * @param {array} errs list of errors to compare from
 * @param {object} e the error captured
 * @return {array} filtered with name as value
 */
function mapErrToName(errs, e) {

  return errs.filter(err => e instanceof err)
    .map(err => err.name)
}

/**
 * @param {array} errs list of errors to compare from
 * @param {object} e the error captured
 * @return {string} name of the error object
 */
function getErrorNameByInstance(errs, e) {
  let error = mapErrToName(errs, e)

  return error.length ? error[0] : UNKNOWN_ERROR
}

/**
 * the same as above with a default JsonqlError as default
 * @param {array} errs same
 * @param {object} e error itself
 * @return {string} the name of the error
 */
function getErrorNameByInstanceWithDefault(errs, e) {
  let name = getErrorNameByInstance(errs, e)

  return name === UNKNOWN_ERROR ? 'JsonqlError' : name
}


export {
  getErrorNameByInstanceWithDefault,
  getErrorNameByInstance,
  UNKNOWN_ERROR
}
