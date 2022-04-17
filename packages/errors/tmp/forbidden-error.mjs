import { FORBIDDEN_STATUS } from './constants.mjs'
/**
 * this is the 403 Forbidden error
 * that means this user is not login
 * use the 401 for try to login and failed
 * @param {string} message to tell what happen
 * @param {mixed} extra things we want to add, 500?
 */
export default class JsonqlForbiddenError extends Error {
  constructor(...args) {
    super(...args)
    this.message = args[0]
    this.detail = args[1]

    this.className = JsonqlForbiddenError.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, JsonqlForbiddenError)
    }
  }

  static get statusCode() {
    return FORBIDDEN_STATUS
  }

  static get name() {
    return 'JsonqlForbiddenError'
  }
}
