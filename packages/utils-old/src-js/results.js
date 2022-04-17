// break up from node-middleware
import {
  QUERY_NAME,
  MUTATION_NAME,
  API_REQUEST_METHODS,
  DATA_KEY,
  ERROR_KEY,
  TIMESTAMP_PARAM_NAME
} from 'jsonql-constants'
import { isObjectHasKey } from './generic'
import { timestamp } from './timestamp'
import isArray from 'lodash-es/isArray'
import merge from 'lodash-es/merge'
/**
 * getting what is calling after the above check
 * @param {string} method of call
 * @return {mixed} false on failed
 */
export const getCallMethod = method => {
  const [ POST, PUT ] = API_REQUEST_METHODS
  switch (true) {
    case method === POST:
      return QUERY_NAME
    case method === PUT:
      return MUTATION_NAME
    default:
      return false;
  }
}

/**
 * wrapper method
 * @param {mixed} result of fn return
 * @param {boolean|array} [ts=false] when pass this then we append a new value to the end
 * @return {string} stringify data
 */
export const packResult = function(result, ts = false) {
  let payload = { [DATA_KEY]: result }
  if (ts && isArray(ts)) {
    ts.push(timestamp())
    payload[TIMESTAMP_PARAM_NAME] = ts
  }
  return JSON.stringify(payload)
}

/**
 * Check if the error object contain out custom key
 * @param {*} e object
 * @return {boolean} true
 */
export const isJsonqlErrorObj = e => {
  const searchFields = ['detail', 'className']
  const test = !!searchFields.filter(field => isObjectHasKey(e, field)).length
  if (test) {
    return ['className', 'message', 'statusCode']
      .filter(field => isObjectHasKey(e, field))
      .map(field => (
      {
        [field]: typeof e[field] === 'object' ? e[field].toString() : e[field]
      }
    ))
    .reduce(merge, { detail: e.toString() }) // can only get as much as possible
  }
  return false
}

/**
 * wrapper method - the output is trying to match up the structure of the Error sub class
 * @param {mixed} detail of fn error
 * @param {string} [className=JsonqlError] the errorName
 * @param {number} [statusCode=500] the original error code
 * @return {string} stringify error
 */
export const packError = function(detail, className = 'JsonqlError', statusCode = 0, message = '') {
  let errorObj = { detail, className, statusCode, message }
  // we need to check the detail object to see if it has detail, className and message
  // if it has then we should merge the object instead
  return JSON.stringify({
    [ERROR_KEY]: isJsonqlErrorObj(detail) || errorObj,
    [TIMESTAMP_PARAM_NAME]: [ timestamp() ]
  })
}

// ported from http-client

/**
 * handle the return data
 * @TODO how to handle the return timestamp and calculate the diff?
 * @param {object} result return from server
 * @return {object} strip the data part out, or if the error is presented
 */
export const resultHandler = result => (
  (isObjectHasKey(result, DATA_KEY) && !isObjectHasKey(result, ERROR_KEY)) ? result[DATA_KEY] : result
)
