// custom validation error class
// when validaton failed
export default class JsonqlValidationError extends Error {
  constructor(...args) {
    super(...args)

    this.message = args[0]
    this.detail = args[1]

    this.className = JsonqlValidationError.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, JsonqlValidationError)
    }
  }

  static get name() {
    return 'JsonqlValidationError'
  }
}
