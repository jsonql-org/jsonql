import { SERVER_INTERNAL_STATUS } from './constants.mjs'

// this is from an example from Koa team to use for internal middleware ctx.throw
// but after the test the res.body part is unable to extract the required data
// I keep this one here for future reference

export default class JsonqlServerError extends Error {

  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode;
    this.className = JsonqlServerError.name
  }

  static get statusCode() {
    return SERVER_INTERNAL_STATUS
  }

  static get name() {
    return 'JsonqlServerError'
  }
}
