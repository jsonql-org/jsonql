// some useful methods for error handling
// import { inspect } from 'util'
/**
 * Port this from the CIS App
 * @param {string} key of object
 * @param {mixed} value of object
 * @return {string} of things we after
 */
export const replaceErrors = function(key, value) {
  if (value instanceof Error) {
    var error = {};
    Object.getOwnPropertyNames(value).forEach(function (key) {
      error[key] = value[key];
    })
    return error;
  }
  return value;
}

/**
 * create readible string version of the error object
 * @param {object} error obj
 * @return {string} printable result
 */
export const printError = function(error) {
  //return 'MASKED'; //error.toString();
  return JSON.stringify(error, replaceErrors)
  // return inspect(error, false, null, true)
}
