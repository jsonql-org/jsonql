// get error name by instance
import { UNKNOWN_ERROR } from '../constants'

/**
 * @param {array} errs list of errors to compare from
 * @param {object} e the error captured
 * @return {array} filtered with name as value
 */
function mapErrToName(errs: any[], e: any): Array<string> {

  return errs.filter((err: any) => e instanceof err)
    .map((err: any) => err.name)
}

/**
 * just what the name said
 * default return the UNKNOWN_ERROR
 */
export function getErrorNameByInstance(errs: any[], e: any) {
  let error = mapErrToName(errs, e)

  return error.length ? error[0] : UNKNOWN_ERROR
}

/**
 * the same as above with a default JsonqlError as default
 */
export function getErrorNameByInstanceWithDefault(errs: any[], e: any): string {
  let name = getErrorNameByInstance(errs, e)

  return name === UNKNOWN_ERROR ? 'JsonqlError' : name
}
