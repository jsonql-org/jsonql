import { NO_STATUS_CODE } from '../constants'

/**
 * This is a custom error to throw whenever a error happen inside the jsonql
 * This help us to capture the right error, due to the call happens in sequence
 * @param {string} message to tell what happen
 * @param {mixed} extra things we want to add, 500?
 */
export default class JsonqlError extends Error {
  detail: any
  className: string

  constructor(...args: any[]) {
    super(...args)

    this.message = args[0]
    this.detail = args[1]

    this.className = JsonqlError.name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, JsonqlError)
      // this.detail = this.stack;
    }
  }

  static get statusCode() {
    return NO_STATUS_CODE
  }
}
