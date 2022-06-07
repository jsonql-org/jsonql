// this is a new Error class that is not part of the Jsonql
// but we will use it in other external modules

export default class GeneralException extends Error {
  detail: any
  className: string

  constructor(...args: any[]) {
    super(...args)

    this.message = args[0]
    this.detail = args[1]

    this.className = GeneralException.name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GeneralException)
    }
  }
}
