// The base Error of all
import whereAmI from './where-am-i'

export default class JsonqlBaseError extends Error {
  constructor(...args: any[]) {
    super(...args)
  }

  static where() {
    return whereAmI()
  }

}
