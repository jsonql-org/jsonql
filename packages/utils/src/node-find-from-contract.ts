// contract related methods
// This is ported back from ws-server and it will get use in the server / client side
import fs from 'fs'

/**
 * ported from jsonql-resolver
 * Using the contract to find the function to call
 * @param {string} type of resolver
 * @param {string} name of resolver
 * @param {object} contract to search from
 * @return {string} file path to function
 */
export function findFromContract(type, name, contract) {
  if (contract[type] && contract[type][name] && contract[type][name].file) {
    if (fs.existsSync(contract[type][name].file)) {
      return contract[type][name].file
    }
  }
  return false
}
