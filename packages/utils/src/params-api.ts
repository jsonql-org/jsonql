// ported from jsonql-params-validator
// craete several helper function to construct / extract the payload
// and make sure they are all the same
import {
  PAYLOAD_PARAM_NAME,
  CONDITION_PARAM_NAME,
  RESOLVER_PARAM_NAME,
  QUERY_ARG_NAME,
  TIMESTAMP_PARAM_NAME
} from '@jsonql/constants'
import { JsonqlValidationError } from '@jsonql/errors'
import { isPlainObject, isString } from './lodash'
import { timestamp } from './timestamp'
import { parseJson } from './generic'

/**
 * check if the payload has a timestamp field, then append a new timestamp to it
 */
export const handleTimestamp = (payload: any): Array<string | number> => {
  let ts = payload[TIMESTAMP_PARAM_NAME]
  if (!Array.isArray(ts)) {
    ts = [ts]
  }
  ts.push( timestamp() )

  return ts
}

/**
 * make sure it's an object (it was call formatPayload but it doesn't make sense)
 */
export const toPayload = (payload: any) => (
  isString(payload) ? parseJson(payload) : payload
)

/**
 * format the payload with QUERY_ARG_NAME key
 */
export const formatPayload = (args: any) => (
  { [QUERY_ARG_NAME]: args }
)

/**
 * extract the resolver name from the payload
 */
export function getResolverFromPayload(payload: any): string {
  const keys = Object.keys(payload)

  return keys.filter(key => key !== TIMESTAMP_PARAM_NAME)[0]
}

/**
 * wrapper method to add the timestamp as well
 */
export function createDeliverable(resolverName: string, payload: any, extra = {}) {

  return Object.assign({
    [resolverName]: payload,
    [TIMESTAMP_PARAM_NAME]: [ timestamp() ]
  }, extra)
}

/**
 * generate a query
 */
export function createQuery(resolverName: string, args = [], jsonp = false) {
  if (isString(resolverName) && Array.isArray(args)) {
    let payload = formatPayload(args)
    if (jsonp === true) {

      return payload
    }

    return createDeliverable(resolverName, payload)
  }

  throw new JsonqlValidationError('utils:params-api:createQuery', {
    message: `expect resolverName to be string and args to be array!`,
    resolverName,
    args
  })
}

/**
 * string version of the createQuery
 */
export function createQueryStr(resolverName: string, args = [], jsonp = false): string {

  return JSON.stringify(createQuery(resolverName, args, jsonp))
}

/**
 * create a mutation call
 */
export function createMutation(
  resolverName: string,
  payload: any,
  condition = {},
  jsonp = false
) {
  const _payload = {
    [PAYLOAD_PARAM_NAME]: payload,
    [CONDITION_PARAM_NAME]: condition
  }
  if (jsonp === true) {
    return _payload
  }
  if (isString(resolverName)) {

    return createDeliverable(resolverName, _payload)
  }
  throw new JsonqlValidationError(
    `[createMutation] expect resolverName to be string!`,
    {
      resolverName, payload, condition
    })
}

/**
 * string version of createMutation
 */
export function createMutationStr(
  resolverName: string,
  payload: any,
  condition = {},
  jsonp = false
): string {

  return JSON.stringify(createMutation(resolverName, payload, condition, jsonp))
}

/**
 * Extract the parts from payload and format for use
 */
export function getQueryFromArgs(resolverName: string, payload: any): any {
  if (resolverName && isPlainObject(payload)) {
    const args = payload[resolverName]
    if (args[QUERY_ARG_NAME]) {

      return {
        [RESOLVER_PARAM_NAME]: resolverName,
        [QUERY_ARG_NAME]: args[QUERY_ARG_NAME],
        [TIMESTAMP_PARAM_NAME]: handleTimestamp(payload)
      }
    }
  }

  return false
}

/**
 * Share function so no repeat
 */
function processPayload(payload: any, processor: Function) {
  const p = toPayload(payload)
  const resolverName = getResolverFromPayload(p)

  return Reflect.apply(processor, null, [resolverName, p])
}

/**
 * extract the payload back
 */
export function getQueryFromPayload(payload: any) {
  const result = processPayload(payload, getQueryFromArgs)
  if (result !== false) {

    return result
  }

  throw new JsonqlValidationError(
    '[getQueryArgs] Payload is malformed!',
    payload
  )
}

/**
 * Further break down from method below for use else where
 */
export function getMutationFromArgs(resolverName: string, payload: any): any {
  if (resolverName && isPlainObject(payload)) {
    const args = payload[resolverName]
    if (args) {

      return {
        [RESOLVER_PARAM_NAME]: resolverName,
        [PAYLOAD_PARAM_NAME]: args[PAYLOAD_PARAM_NAME],
        [CONDITION_PARAM_NAME]: args[CONDITION_PARAM_NAME],
        [TIMESTAMP_PARAM_NAME]: handleTimestamp(payload)
      }
    }
  }

  return false
}

/**
 * Extract the mutation part from payload
 */
export function getMutationFromPayload(payload: any) {
  const result = processPayload(payload, getMutationFromArgs)
  if (result !== false) {

    return result
  }

  throw new JsonqlValidationError(
    '[getMutationArgs] Payload is malformed!',
    payload
  )
}
