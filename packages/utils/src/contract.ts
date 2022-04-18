// split the contract into the node side and the generic side
import { isPlainObject } from './lodash'
import { isObjectHasKey } from './generic'
const {
  QUERY_NAME,
  MUTATION_NAME,
  SOCKET_NAME,
  QUERY_ARG_NAME,
  PAYLOAD_PARAM_NAME,
  CONDITION_PARAM_NAME
} from '@jsonql/constants'
import {
  JsonqlError,
  JsonqlResolverNotFoundError
} from '@jsonql/errors'
import { JsonqlContract } from './types'

/**
 * Check if the json is a contract file or not
 */
export function checkIsContract(contract: JsonqlContract): boolean {
  return isPlainObject(contract)
  && (
    isObjectHasKey(contract, QUERY_NAME)
 || isObjectHasKey(contract, MUTATION_NAME)
 || isObjectHasKey(contract, SOCKET_NAME)
  )
}

/**
 * Wrapper method that check if it's contract then return the contract or false
 */
export function isContract(contract: JsonqlContract): JsonqlContract | boolean {
  return checkIsContract(contract) ? contract : false
}

/**
 * Ported from jsonql-params-validator but different
 * if we don't find the socket part then return false
 */
export function extractSocketPart(contract: JsonqlContract): any {
  if (isObjectHasKey(contract, SOCKET_NAME)) {

    return contract[SOCKET_NAME]
  }
  return false
}

/**
 * Extract the args from the payload
 */
export function extractArgsFromPayload(payload: any, type: string): Array<any> {
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
 * extract the param from a contracct
 */
export function extractParamsFromContract(contract: JsonqlContract, type: string, name: string): any {
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
