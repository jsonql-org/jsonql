// some useful methods for error handling
// import { inspect } from 'util'

/**
 * Port this from the CIS App
 * Note the original call singature has a param call `key` but never used
 */
export const replaceErrors = function(value: any): any {
  if (value instanceof Error) {
    var error = {}
    Object.getOwnPropertyNames(value).forEach(function (key) {
      error[key] = value[key]
    })

    return error
  }

  return value
}

/**
 * create readible string version of the error object
 */
export const printError = function(error: Error): string {
  //return 'MASKED'; //error.toString();
  return JSON.stringify(error, replaceErrors)
  // return inspect(error, false, null, true)
}
