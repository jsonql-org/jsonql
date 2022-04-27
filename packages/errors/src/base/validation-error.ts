// custom validation error class
// when validaton failed
// should there also be a errors result somewhere

export default class JsonqlValidationError extends Error {
  detail: any
  className: string

  constructor(...args: any[]) {
    super(...args)

    this.message = args[0]
    this.detail = args[1]

    this.className = JsonqlValidationError.name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, JsonqlValidationError)
    }
  }

}
