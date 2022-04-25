// validate the return result using the contract defintion
import { validateSync, validateAsync } from './main'
import { JsonqlValidationError } from '@jsonql/errors'
import {
  RETURNS_NAME,
  DATA_KEY,
  ERROR_KEY
} from '../lib/constants'

/**
 * extra the defintion from contract using resolverType --> resolverName
 */
function getDefFromContract(
  resolverType: string,
  resolverName: string,
  contract: any
) {
  if (contract[resolverType] && contract[resolverType][resolverName]) {

    return contract[resolverType][resolverName]
  }
  return false
}

/**
 * then we package the result once again for easier to use
 */
function packageResult(result: any[], args: any) {
  let obj: any = {[DATA_KEY]: [], [ERROR_KEY]: []}
  if (result.length) {
    obj[ERROR_KEY] = result
  } else {
    obj[DATA_KEY] = args
  }
  return obj
}

/**
 * Basically it's an alias to the validateSync
 */
export function checkReturns(
  value: any[],
  params: any[],
  async = false
) {
  const args = [value]
  if (async) {
    return validateAsync(args, params)
      .then((result: any) => packageResult(result, args))
  }
  const result: any = validateSync(args, params)

  return packageResult(result, args)
}

// just a wrapper method
export const checkReturnsAsync = (value: any[], params: any) => (
  checkReturns(value, params, true)
)
/**
 * The combine method for use to check the resolver returns with contract
 */
export function checkResolverReturns(
  resolverType: string,
  resolverName: string,
  contract: any,
  value: any[]
) {
  // console.info('checkResolverReturns -->', resolverType, resolverName, contract, args)
  const def = getDefFromContract(resolverType, resolverName, contract)
  if (def) {
    // format the value
    return checkReturns(value, def[RETURNS_NAME])
  }
  throw new JsonqlValidationError(
    'checkResolverReturns',
    `${resolverType}.${resolverName} ${RETURNS_NAME} not found`
  )
}

/**
 * The async version of checkResolverReturns
 */
export function checkResolverReturnsAsync(
  resolverType: string,
  resolverName: string,
  contract: any,
  value: any[]
) {
  const def = getDefFromContract(resolverType, resolverName, contract)
  if (def) {
    
    return checkReturns(value, def[RETURNS_NAME], true)
  }
  return Promise.reject(
    new JsonqlValidationError(
      'checkResolverReturnsAsync',
      `${resolverType}.${resolverName} ${RETURNS_NAME} not found`
    )
  )
}
