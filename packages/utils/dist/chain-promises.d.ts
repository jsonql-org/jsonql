import type { AnyType, AnyTypeArr, JsonqlPromiseChainFn } from './types';
/**
 * previously we already make sure the order of the namespaces
 * and attach the auth client to it
 */
export declare function chainPromises(promises: Array<Promise<AnyType>>, asObject?: boolean | object): Promise<any>;
/**
 * This one return a different result from the chainPromises
 * it will be the same like chainFns that take one promise resolve as the next fn parameter
 */
export declare function chainProcessPromises(initPromise: JsonqlPromiseChainFn, ...promises: Array<JsonqlPromiseChainFn>): (...args: AnyTypeArr) => any;
/**
 * This is a combine method to run the above chain process
 * cos sometime we don't want to have the process separate (see validator)
 */
export declare function queuePromisesProcess(queue: Array<JsonqlPromiseChainFn>, ...initValue: AnyTypeArr): any;
