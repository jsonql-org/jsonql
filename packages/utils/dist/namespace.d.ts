import { JsonqlContract } from './types';
/**
 * @BUG we should check the socket part instead of expect the downstream to read the menu!
 * We only need this when the enableAuth is true otherwise there is only one namespace
 * RETURN: 1. remap the contract using the namespace --> resolvers
 * 2. the size of the object (1 all private, 2 mixed public with private)
 * 3. which namespace is public
 */
export declare function groupByNamespace(contract: JsonqlContract): {
    nspGroup: {};
    publicNamespace: null;
    size: number;
};
/**
 * @NOTE ported from jsonql-ws-client
 * Got to make sure the connection order otherwise it will hang
 */
export declare function getNamespaceInOrder(nspGroup: any, publicNamespace: string): string[];
/**
 * @TODO this might change, what if we want to do room with ws
 * 1. there will only be max two namespace
 * 2. when it's normal we will have the stock path as namespace
 * 3. when enableAuth then we will have two, one is jsonql/public + private
 */
export declare function getNamespace(config: any): string[];
/**
 * get the private namespace
 */
export declare function getPrivateNamespace(namespaces: string[]): string | boolean;
/**
 * Got a problem with a contract that is public only the groupByNamespace is wrong
 * which is actually not a problem when using a fallback, but to be sure things in order
 * we could combine with the config to group it
 */
export declare function getNspInfoByConfig(config: any): ({
    size: number;
    nspGroup: {
        [x: string]: {};
    };
    publicNamespace: string;
} | {
    nspGroup: {};
    publicNamespace: null;
    size: number;
}) & {
    namespaces: string[];
};
