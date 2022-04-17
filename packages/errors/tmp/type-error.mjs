// this will throw from inside the checkOptions
export default class JsonqlTypeError extends Error {
  constructor(...args) {
    super(...args)

    this.message = args[0]
    this.detail = args[1]

    this.className = JsonqlTypeError.name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, JsonqlTypeError)
    }
  }

  static get name() {
    return 'JsonqlTypeError'
  }
}
