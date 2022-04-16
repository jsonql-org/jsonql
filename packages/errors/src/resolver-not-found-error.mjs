import { NOT_FOUND_STATUS } from './constants.mjs'
/**
 * This is a custom error to throw when could not find the resolver
 * This help us to capture the right error, due to the call happens in sequence
 * @param {string} message to tell what happen
 * @param {mixed} extra things we want to add, 500?
 */
export default class JsonqlResolverNotFoundError extends Error {
  constructor(...args) {
    super(...args)

    this.message = args[0]
    this.detail = args[1]

    this.className = JsonqlResolverNotFoundError.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, JsonqlResolverNotFoundError);
    }
  }

  static get statusCode() {
    return NOT_FOUND_STATUS
  }

  static get name() {
    return 'JsonqlResolverNotFoundError';
  }
}
