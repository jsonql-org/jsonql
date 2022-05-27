import { UNAUTHORIZED_STATUS } from './constants'

/**
 * This is a custom error when not supply the credential and try to get contract
 * This help us to capture the right error, due to the call happens in sequence
 * @param {string} message to tell what happen
 * @param {mixed} extra things we want to add, 500?
 */
export default class JsonqlContractAuthError extends Error {
  detail: any
  className: string

  constructor(...args: any[]) {
    super(...args)
    this.message = args[0]
    this.detail = args[1]

    this.className = JsonqlContractAuthError.name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, JsonqlContractAuthError)
    }
  }

  static get statusCode() {
    return UNAUTHORIZED_STATUS
  }

}
