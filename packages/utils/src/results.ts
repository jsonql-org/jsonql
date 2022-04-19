// break up from node-middleware
import {
  QUERY_NAME,
  MUTATION_NAME,
  API_REQUEST_METHODS,
  DATA_KEY,
  ERROR_KEY,
  TIMESTAMP_PARAM_NAME
} from '@jsonql/constants'
import { isObjectHasKey } from './common'
import { timestamp } from './timestamp'
import { merge } from './lodash'

/**
 * get what is calling after the above check
 */
export const getCallMethod = (method: string) => {
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
 */
export const packResult = function(result: any, ts = false): string {
  let payload = { [DATA_KEY]: result }
  if (ts && Array.isArray(ts)) {
    ts.push(timestamp())
    payload[TIMESTAMP_PARAM_NAME] = ts
  }

  return JSON.stringify(payload)
}

/**
 * Check if the error object contain our custom key
 */
export const isJsonqlErrorObj = (e: Error) => {
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
 */
export const packError = function(
  detail: any,
  className = 'JsonqlError',
  statusCode = 0,
  message = ''
): string {
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
 */
export const resultHandler = (result: any) => (
  (
    isObjectHasKey(result, DATA_KEY) &&
    !isObjectHasKey(result, ERROR_KEY)
  ) ? result[DATA_KEY] : result
)
