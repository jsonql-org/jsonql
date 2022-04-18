/**
 * Get document (string) byte length for use in header
 */
export declare const getDocLen: (doc: string) => number;
/**
 * The koa ctx object is not returning what it said on the documentation
 * So I need to write a custom parser to check the request content-type
 */
export declare const headerParser: (req: any, type: string) => any[];
/**
 * wrapper of above method to make it easier to use
 */
export declare const isHeaderPresent: (req: any, type: string) => boolean;
/**
 * Searching for path to the resolver
 */
export declare const getPathToFn: (name: string, type: string, opts: any) => string | boolean;
