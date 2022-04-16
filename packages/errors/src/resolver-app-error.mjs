import { SERVER_INTERNAL_STATUS } from './constants.mjs'
/**
 * This is a custom error to throw when the resolver throw error and capture inside the middleware
 * This help us to capture the right error, due to the call happens in sequence
 * @param {string} message to tell what happen
 * @param {mixed} extra things we want to add, 500?
 */
export default class JsonqlResolverAppError extends Error {
  constructor(...args) {
    super(...args)

    this.message = args[0]
    this.detail = args[1]

    this.className = JsonqlResolverAppError.name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, JsonqlResolverAppError)
    }
  }

  static get statusCode() {
    return SERVER_INTERNAL_STATUS
  }

  static get name() {
    return 'JsonqlResolverAppError'
  }
}
