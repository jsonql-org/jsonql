import {
  SERVER_INTERNAL_STATUS


} from './constants'

// this is from an example from Koa team to use for internal middleware ctx.throw
// but after the test the res.body part is unable to extract the required data
// I keep this one here for future reference

export default class ServerError extends Error {
  statusCode: string | number
  className: string

  constructor(statusCode: string | number, message?: string) {
    super(message)
    this.statusCode = statusCode
    this.className = JsonqlServerError.name
  }

  static get statusCode() {
    return SERVER_INTERNAL_STATUS
  }
}
