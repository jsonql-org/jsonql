import { NOT_ACCEPTABLE_STATUS } from './constants'
/**
 * This is a custom error to throw when server throw a 406
 * This help us to capture the right error, due to the call happens in sequence
 * @param {string} message to tell what happen
 * @param {mixed} extra things we want to add, 500?
 */
export default class Jsonql406Error extends Error {
  detail: any
  className: string

  constructor(...args: any[]) {
    super(...args)
    this.message = args[0]
    this.detail = args[1]
    // We can't access the static name from an instance
    // but we can do it like this
    this.className = Jsonql406Error.name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Jsonql406Error)
    }
  }

  static get statusCode() {
    return NOT_ACCEPTABLE_STATUS
  }

}
