import { SERVER_INTERNAL_STATUS } from '../constants'

/**
 * This is a custom error to throw when server throw a 500
 * This help us to capture the right error, due to the call happens in sequence
 * @param {string} message to tell what happen
 * @param {mixed} extra things we want to add, 500?
 */
export default class Jsonql500Error extends Error {
  detail: any
  className: string

  constructor(...args: any[]) {
    super(...args)

    this.message = args[0]
    this.detail = args[1]

    this.className = Jsonql500Error.name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Jsonql500Error)
    }
  }

  static get statusCode() {
    return SERVER_INTERNAL_STATUS
  }
}
