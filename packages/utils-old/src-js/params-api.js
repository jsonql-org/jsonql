// ported from jsonql-params-validator
// craete several helper function to construct / extract the payload
// and make sure they are all the same
import {
  PAYLOAD_PARAM_NAME,
  CONDITION_PARAM_NAME,
  RESOLVER_PARAM_NAME,
  QUERY_ARG_NAME,
  TIMESTAMP_PARAM_NAME
} from 'jsonql-constants'

import JsonqlValidationError from 'jsonql-errors/src/validation-error'

import isArray from 'lodash-es/isArray'
import isString from 'lodash-es/isString'
import isPlainObject from 'lodash-es/isPlainObject'

import { timestamp } from './timestamp'
import { parseJson } from './generic'

/**
 * check if the payload has a timestamp field, then append a new timestamp to it
 * @param {object} payload from the com
 * @return {array} timestamp field with an array value
 */
export const handleTimestamp = payload => {
  let ts = payload[TIMESTAMP_PARAM_NAME]
  if (!isArray(ts)) {
    ts = [ts]
  }
  ts.push( timestamp() )

  return ts
}

/**
 * make sure it's an object (it was call formatPayload but it doesn't make sense)
 * @param {*} payload the object comes in could be string based
 * @return {object} the transformed payload
 */
export const toPayload = payload => isString(payload) ? parseJson(payload) : payload

/**
 * @param {*} args arguments to send
 *@return {object} formatted payload
 */
export const formatPayload = (args) => (
  { [QUERY_ARG_NAME]: args }
)

/**
 * extract the resolver name from the payload 
 * @param {object} payload
 * @return {string} resolver name  
 */
export function getResolverFromPayload(payload) {
  const keys = Object.keys(payload)
  return keys.filter(key => key !== TIMESTAMP_PARAM_NAME)[0]
}

/**
 * wrapper method to add the timestamp as well
 * @param {string} resolverName name of the resolver
 * @param {*} payload what is sending 
 * @param {object} extra additonal property we want to merge into the deliverable
 * @return {object} delierable
 */
export function createDeliverable(resolverName, payload, extra = {}) {
  return Object.assign({
    [resolverName]: payload,
    [TIMESTAMP_PARAM_NAME]: [ timestamp() ]
  }, extra)
}

/**
 * @param {string} resolverName name of function
 * @param {array} [args=[]] from the ...args
 * @param {boolean} [jsonp = false] add v1.3.0 to koa
 * @return {object} formatted argument
 */
export function createQuery(resolverName, args = [], jsonp = false) {
  if (isString(resolverName) && isArray(args)) {
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
 * @return {string}
 */
export function createQueryStr(resolverName, args = [], jsonp = false) {
  return JSON.stringify(createQuery(resolverName, args, jsonp))
}

/**
 * @param {string} resolverName name of function
 * @param {*} payload to send
 * @param {object} [condition={}] for what
 * @param {boolean} [jsonp = false] add v1.3.0 to koa
 * @return {object} formatted argument
 */
export function createMutation(resolverName, payload, condition = {}, jsonp = false) {
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
  throw new JsonqlValidationError(`[createMutation] expect resolverName to be string!`, { resolverName, payload, condition })
}

/**
 * string version of createMutation
 * @return {string}
 */
export function createMutationStr(resolverName, payload, condition = {}, jsonp = false) {
  return JSON.stringify(createMutation(resolverName, payload, condition, jsonp))
}

/**
 * Extract the parts from payload and format for use
 * @param {string} resolverName name of fn
 * @param {object} payload the incoming json
 * @return {object|boolean} false on failed
 */
export function getQueryFromArgs(resolverName, payload) {
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
 * @param {object} payload the payload from client
 * @param {function} processor the last get result method
 * @return {*} result processed result
 */
function processPayload(payload, processor) {
  const p = toPayload(payload)
  const resolverName = getResolverFromPayload(p)
  return Reflect.apply(processor, null, [resolverName, p])
}

/**
 * extra the payload back
 * @param {*} payload from http call
 * @return {object} resolverName and args
 */
export function getQueryFromPayload(payload) {
  const result = processPayload(payload, getQueryFromArgs)
  if (result !== false) {
    return result
  }
  throw new JsonqlValidationError('[getQueryArgs] Payload is malformed!', payload)
}

/**
 * Further break down from method below for use else where
 * @param {string} resolverName name of fn
 * @param {object} payload payload
 * @return {object|boolean} false on failed
 */
export function getMutationFromArgs(resolverName, payload) {
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
 * @param {object} payload
 * @return {object} resolverName, payload, conditon
 */
export function getMutationFromPayload(payload) {
  const result = processPayload(payload, getMutationFromArgs)

  if (result !== false) {
    return result
  }
  throw new JsonqlValidationError('[getMutationArgs] Payload is malformed!', payload)
}
