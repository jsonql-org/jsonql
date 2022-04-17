// allow supply a custom checker function
// if that failed then we throw this error
export default class JsonqlCheckerError extends Error {
  constructor(...args) {
    super(...args)
    this.message = args[0]
    this.detail = args[1]

    this.className = JsonqlCheckerError.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, JsonqlCheckerError)
    }
  }

  static get name() {
    return 'JsonqlCheckerError'
  }
}
