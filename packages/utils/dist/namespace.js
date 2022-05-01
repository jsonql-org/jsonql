"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNspInfoByConfig = exports.getPrivateNamespace = exports.getNamespace = exports.getNamespaceInOrder = exports.groupByNamespace = void 0;
// take out all the namespace related methods in one place for easy to find
const constants_1 = require("@jsonql/constants");
const errors_1 = require("@jsonql/errors");
const contract_1 = require("./contract");
// should this move to constants
const SOCKET_NOT_FOUND_ERR = `socket not found in contract!`;
const SIZE = 'size';
/**
 * create the group using publicNamespace when there is only public
 */
function groupPublicNamespace(socket, publicNamespace) {
    const g = {};
    for (const resolverName in socket) {
        const params = socket[resolverName];
        g[resolverName] = params;
    }
    return { size: 1, nspGroup: { [publicNamespace]: g }, publicNamespace };
}
/**
 * @BUG we should check the socket part instead of expect the downstream to read the menu!
 * We only need this when the enableAuth is true otherwise there is only one namespace
 * RETURN: 1. remap the contract using the namespace --> resolvers
 * 2. the size of the object (1 all private, 2 mixed public with private)
 * 3. which namespace is public
 */
function groupByNamespace(contract) {
    const socket = (0, contract_1.extractSocketPart)(contract);
    if (socket === false) {
        throw new errors_1.JsonqlError('groupByNamespace', SOCKET_NOT_FOUND_ERR);
    }
    const prop = {
        [constants_1.NSP_GROUP]: {},
        [constants_1.PUBLIC_NAMESPACE]: null,
        [SIZE]: 0
    };
    for (const resolverName in socket) {
        const params = socket[resolverName];
        const { namespace } = params;
        if (namespace) {
            if (!prop[constants_1.NSP_GROUP][namespace]) {
                ++prop[SIZE];
                prop[constants_1.NSP_GROUP][namespace] = {};
            }
            prop[constants_1.NSP_GROUP][namespace][resolverName] = params;
            // get the public namespace
            if (!prop[constants_1.PUBLIC_NAMESPACE] && params[constants_1.PUBLIC_KEY]) {
                prop[constants_1.PUBLIC_NAMESPACE] = namespace;
            }
        }
    }
    return prop;
}
exports.groupByNamespace = groupByNamespace;
/**
 * @NOTE ported from jsonql-ws-client
 * Got to make sure the connection order otherwise it will hang
 */
function getNamespaceInOrder(nspGroup, publicNamespace) {
    const names = []; // need to make sure the order!
    for (const namespace in nspGroup) {
        if (namespace === publicNamespace) {
            names[1] = namespace;
        }
        else {
            names[0] = namespace;
        }
    }
    return names;
}
exports.getNamespaceInOrder = getNamespaceInOrder;
/**
 * @TODO this might change, what if we want to do room with ws
 * 1. there will only be max two namespace
 * 2. when it's normal we will have the stock path as namespace
 * 3. when enableAuth then we will have two, one is jsonql/public + private
 */
function getNamespace(config) {
    const base = constants_1.JSONQL_PATH;
    if (config.enableAuth) {
        // the public come first @1.0.1 we use the constants instead of the user supplied value
        // @1.0.4 we use the config value again, because we could control this via the post init
        return [
            [base, config.privateNamespace].join('/'),
            [base, config.publicNamespace].join('/')
        ];
    }
    return [base];
}
exports.getNamespace = getNamespace;
/**
 * get the private namespace
 */
function getPrivateNamespace(namespaces) {
    return namespaces.length > 1 ? namespaces[0] : false;
}
exports.getPrivateNamespace = getPrivateNamespace;
/**
 * Got a problem with a contract that is public only the groupByNamespace is wrong
 * which is actually not a problem when using a fallback, but to be sure things in order
 * we could combine with the config to group it
 */
function getNspInfoByConfig(config) {
    const { contract, enableAuth } = config;
    const namespaces = getNamespace(config);
    const nspInfo = enableAuth ? groupByNamespace(contract)
        : groupPublicNamespace(contract.socket, namespaces[0]);
    // add the namespaces into it as well
    return Object.assign(nspInfo, { namespaces });
}
exports.getNspInfoByConfig = getNspInfoByConfig;
