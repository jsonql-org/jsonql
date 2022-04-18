// contract related methods
// This is ported back from ws-server and it will get use in the server / client side
import fs from 'fs'
import { JsonqlContract } from '../types'
/**
 * ported from jsonql-resolver
 * Using the contract to find the function to call
 */
export function findFromContract(type: string, name: string, contract: JsonqlContract): string | boolean {
  if (contract[type] && contract[type][name] && contract[type][name].file) {
    if (fs.existsSync(contract[type][name].file)) {

      return contract[type][name].file
    }
  }

  return false
}
