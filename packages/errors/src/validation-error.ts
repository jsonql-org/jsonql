// custom validation error class
// when validaton failed
// should there also be a errors result somewhere

export default class ValidationError extends Error {
  detail: any
  className: string

  constructor(...args: any[]) {
    super(...args)

    this.message = args[0]
    this.detail = args[1]

    this.className = ValidationError.name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError)
    }
  }
}
