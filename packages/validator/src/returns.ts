// validate the return result using the contract defintion 
import { validateSync, validateAsync } from './validator'
import { JsonqlValidationError } from 'jsonql-errors'
import { 
  RETURNS_NAME, 
  DATA_KEY,
  ERROR_KEY
} from './constants'

/**
 * extra the defintion from contract using resolverType --> resolverName 
 * @param {string} resolverType type of resolver  
 * @param {string} resolverName name of resolver 
 * @param {object} contract json 
 * @return {object|boolean} or false when not found   
 */
function getDefFromContract(resolverType, resolverName, contract) {
  if (contract[resolverType] && contract[resolverType][resolverName]) {
    return contract[resolverType][resolverName]
  }
  return false 
}

/** 
 * then we package the result once again for easier to use 
 * @param {array} result the valdiation result
 * @return {object} with DATA_KEY and ERROR_KEY
 */
function packageResult(result, args) {
  let obj = {[DATA_KEY]: [], [ERROR_KEY]: []}
  if (result.length) {
    obj[ERROR_KEY] = result
  } else {
    obj[DATA_KEY] = args
  }
  return obj 
} 


/**
 * Basically it's an alias to the validateSync 
 * @param {array} value the raw return result from resolver  
 * @param {array} params the `returns` part from the resolverName.returns
 * @param {boolean} async or not
 * @return {object} validation result
 */
export function checkReturns(value, params, async = false) {
  const args = [value]
  if (async) {
    return validateAsync(args, params)
      .then(result => packageResult(result, args))
  }
  const result = validateSync(args, params)
  return packageResult(result, args) 
} 

// just a wrapper method 
export const checkReturnsAsync = (value, params) => checkReturns(value, params, true)

/**
 * The combine method for use to check the resolver returns with contract
 * @param {string} resolverType type of resolver (query, mutation, socket, auth) 
 * @param {string} resolverName  name of the resolver 
 * @param {object} contract the full contract json
 * @param {array} value the return results
 * @return {*}
 */
export function checkResolverReturns(resolverType, resolverName, contract, value) {
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
 * @param {string} resolverType type of resolver (query, mutation, socket, auth) 
 * @param {string} resolverName  name of the resolver 
 * @param {object} contract the full contract json
 * @param {array} value the raw return results
 * @return {*}
 */
export function checkResolverReturnsAsync(resolverType, resolverName, contract, value) {
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

