// this get throw from within the checkOptions when run through the enum failed
export default class JsonqlEnumError extends Error {
  detail: any
  className: string

  constructor(...args: any[]) {
    super(...args)

    this.message = args[0]
    this.detail = args[1]

    this.className = JsonqlEnumError.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, JsonqlEnumError)
    }
  }

}
