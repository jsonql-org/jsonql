// split the contract into the node side and the common side
import { isPlainObject } from './lodash'
import { objectHasKey } from './common'
import {
  QUERY_NAME,
  MUTATION_NAME,
  SOCKET_NAME,
  QUERY_ARG_NAME,
  PAYLOAD_PARAM_NAME,
  CONDITION_PARAM_NAME
} from '@jsonql/constants'
import {
  GeneralException,
  JsonqlResolverNotFoundError
} from '@jsonql/errors'
import { JsonqlContract } from './types'

/**
 * Check if the json is a contract file or not
 */
export function checkIsContract(contract: JsonqlContract): boolean {
  return isPlainObject(contract)
  && (
    objectHasKey(contract, QUERY_NAME)
 || objectHasKey(contract, MUTATION_NAME)
 || objectHasKey(contract, SOCKET_NAME)
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
  if (objectHasKey(contract, SOCKET_NAME)) {

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
      throw new GeneralException(`Unknown ${type} to extract argument from!`)
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
