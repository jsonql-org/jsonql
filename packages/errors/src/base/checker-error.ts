// allow supply a custom checker function
// if that failed then we throw this error
export default class JsonqlCheckerError extends Error {
  detail: any
  className: string

  constructor(...args: any) {
    super(...args)
    this.message = args[0]
    this.detail = args[1]

    this.className = JsonqlCheckerError.name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, JsonqlCheckerError)
    }
  }
}
