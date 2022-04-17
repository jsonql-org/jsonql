// split the contract into the node side and the generic side
import { isObjectHasKey } from './generic'
import isPlainObject from 'lodash-es/isPlainObject'
import {
  QUERY_NAME,
  MUTATION_NAME,
  SOCKET_NAME,
  QUERY_ARG_NAME,
  PAYLOAD_PARAM_NAME,
  CONDITION_PARAM_NAME
} from 'jsonql-constants'
import { JsonqlError, JsonqlResolverNotFoundError } from 'jsonql-errors'
/**
 * Check if the json is a contract file or not
 * @param {object} contract json object
 * @return {boolean} true
 */
export function checkIsContract(contract) {
  return isPlainObject(contract)
  && (
    isObjectHasKey(contract, QUERY_NAME)
 || isObjectHasKey(contract, MUTATION_NAME)
 || isObjectHasKey(contract, SOCKET_NAME)
  )
}

/**
 * Wrapper method that check if it's contract then return the contract or false
 * @param {object} contract the object to check
 * @return {boolean | object} false when it's not
 */
export function isContract(contract) {
  return checkIsContract(contract) ? contract : false
}

/**
 * Ported from jsonql-params-validator but different
 * if we don't find the socket part then return false
 * @param {object} contract the contract object
 * @return {object|boolean} false on failed
 */
export function extractSocketPart(contract) {
  if (isObjectHasKey(contract, SOCKET_NAME)) {
    return contract[SOCKET_NAME]
  }
  return false
}

/**
 * Extract the args from the payload
 * @param {object} payload to work with
 * @param {string} type of call
 * @return {array} args
 */
export function extractArgsFromPayload(payload, type) {
  switch (type) {
    case QUERY_NAME:
      return payload[QUERY_ARG_NAME]
    case MUTATION_NAME:
      return [
        payload[PAYLOAD_PARAM_NAME],
        payload[CONDITION_PARAM_NAME]
      ]
    default:
      throw new JsonqlError(`Unknown ${type} to extract argument from!`)
  }
}

/**
 * Like what the name said
 * @param {object} contract the contract json
 * @param {string} type query|mutation
 * @param {string} name of the function
 * @return {object} the params part of the contract
 */
export function extractParamsFromContract(contract, type, name) {
  try {
    const result = contract[type][name]
    // debug('extractParamsFromContract', result)
    if (!result) {
      // debug(name, type, contract)
      throw new JsonqlResolverNotFoundError(name, type)
    }
    return result
  } catch(e) {
    throw new JsonqlResolverNotFoundError(name, e)
  }
}
