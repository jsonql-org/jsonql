// take out all the namespace related methods in one place for easy to find
import {
  JSONQL_PATH,
  PUBLIC_KEY,
  NSP_GROUP,
  PUBLIC_NAMESPACE
} from '@jsonql/constants'
import { JsonqlError } from '@jsonql/errors'
import { extractSocketPart } from './contract'
import { JsonqlContract } from './types'
// should this move to constants
const SOCKET_NOT_FOUND_ERR = `socket not found in contract!`
const SIZE = 'size'

/**
 * create the group using publicNamespace when there is only public
 */
function groupPublicNamespace(socket: any, publicNamespace: string) {
  let g = {}
  for (let resolverName in socket) {
    let params = socket[resolverName]
    g[resolverName] = params
  }
  return { size: 1, nspGroup: {[publicNamespace]: g}, publicNamespace}
}


/**
 * @BUG we should check the socket part instead of expect the downstream to read the menu!
 * We only need this when the enableAuth is true otherwise there is only one namespace
 * RETURN: 1. remap the contract using the namespace --> resolvers
 * 2. the size of the object (1 all private, 2 mixed public with private)
 * 3. which namespace is public
 */
export function groupByNamespace(contract: JsonqlContract) {
  let socket = extractSocketPart(contract)
  if (socket === false) {
    throw new JsonqlError('groupByNamespace', SOCKET_NOT_FOUND_ERR)
  }
  let prop = {
    [NSP_GROUP]: {},
    [PUBLIC_NAMESPACE]: null,
    [SIZE]: 0
  }

  for (let resolverName in socket) {
    let params = socket[resolverName]
    let { namespace } = params
    if (namespace) {
      if (!prop[NSP_GROUP][namespace]) {
        ++prop[SIZE]
        prop[NSP_GROUP][namespace] = {}
      }
      prop[NSP_GROUP][namespace][resolverName] = params
      // get the public namespace
      if (!prop[PUBLIC_NAMESPACE] && params[PUBLIC_KEY]) {
        prop[PUBLIC_NAMESPACE] = namespace
      }
    }
  }

  return prop
}

/**
 * @NOTE ported from jsonql-ws-client
 * Got to make sure the connection order otherwise it will hang
 */
export function getNamespaceInOrder(nspGroup: any, publicNamespace: string) {
  let names: string[] = [] // need to make sure the order!
  for (let namespace in nspGroup) {
    if (namespace === publicNamespace) {
      names[1] = namespace
    } else {
      names[0] = namespace
    }
  }
  return names
}

/**
 * @TODO this might change, what if we want to do room with ws
 * 1. there will only be max two namespace
 * 2. when it's normal we will have the stock path as namespace
 * 3. when enableAuth then we will have two, one is jsonql/public + private
 */
export function getNamespace(config: any): string[] {
  const base = JSONQL_PATH
  if (config.enableAuth) {
    // the public come first @1.0.1 we use the constants instead of the user supplied value
    // @1.0.4 we use the config value again, because we could control this via the post init
    return [
      [ base , config.privateNamespace ].join('/'),
      [ base , config.publicNamespace ].join('/')
    ]
  }
  return [ base ]
}

/**
 * get the private namespace
 */
export function getPrivateNamespace(namespaces: string[]): string | boolean {

  return namespaces.length > 1 ? namespaces[0] : false
}

/**
 * Got a problem with a contract that is public only the groupByNamespace is wrong
 * which is actually not a problem when using a fallback, but to be sure things in order
 * we could combine with the config to group it
 */
export function getNspInfoByConfig(config: any) {
  const { contract, enableAuth } = config
  const namespaces = getNamespace(config)
  let nspInfo = enableAuth ? groupByNamespace(contract)
                           : groupPublicNamespace(contract.socket, namespaces[0])
  // add the namespaces into it as well
  return Object.assign(nspInfo, { namespaces })
}
