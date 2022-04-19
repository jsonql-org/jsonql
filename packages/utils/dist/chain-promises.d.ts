/**
 * previously we already make sure the order of the namespaces
 * and attach the auth client to it
 */
export declare function chainPromises(promises: Array<Promise<any>>, asObject?: boolean | object): Promise<any>;
/**
 * This one return a different result from the chainPromises
 * it will be the same like chainFns that take one promise resolve as the next fn parameter
 */
export declare function chainProcessPromises(initPromise: Function, ...promises: Array<Function>): (...args: any[]) => any;
