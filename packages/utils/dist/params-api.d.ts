/**
 * check if the payload has a timestamp field, then append a new timestamp to it
 */
export declare const handleTimestamp: (payload: any) => Array<string | number>;
/**
 * make sure it's an object (it was call formatPayload but it doesn't make sense)
 */
export declare const toPayload: (payload: any) => any;
/**
 * format the payload with QUERY_ARG_NAME key
 */
export declare const formatPayload: (args: any) => {
    args: any;
};
/**
 * extract the resolver name from the payload
 */
export declare function getResolverFromPayload(payload: any): string;
/**
 * wrapper method to add the timestamp as well
 */
export declare function createDeliverable(resolverName: string, payload: any, extra?: {}): {
    [x: string]: any;
    TS: number[];
};
/**
 * generate a query
 */
export declare function createQuery(resolverName: string, args?: never[], jsonp?: boolean): {
    [x: string]: any;
    TS: number[];
} | {
    args: any;
};
/**
 * string version of the createQuery
 */
export declare function createQueryStr(resolverName: string, args?: never[], jsonp?: boolean): string;
/**
 * create a mutation call
 */
export declare function createMutation(resolverName: string, payload: any, condition?: {}, jsonp?: boolean): {
    [x: string]: any;
    TS: number[];
} | {
    payload: any;
    condition: {};
};
/**
 * string version of createMutation
 */
export declare function createMutationStr(resolverName: string, payload: any, condition?: {}, jsonp?: boolean): string;
/**
 * Extract the parts from payload and format for use
 */
export declare function getQueryFromArgs(resolverName: string, payload: any): any;
/**
 * extract the payload back
 */
export declare function getQueryFromPayload(payload: any): any;
/**
 * Further break down from method below for use else where
 */
export declare function getMutationFromArgs(resolverName: string, payload: any): any;
/**
 * Extract the mutation part from payload
 */
export declare function getMutationFromPayload(payload: any): any;
