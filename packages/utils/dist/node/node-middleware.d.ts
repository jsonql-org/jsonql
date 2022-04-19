import { JsonqlContract } from '../types';
/**
 * ported from jsonql-resolver
 * Using the contract to find the function to call
 */
export declare function findFromContract(type: string, name: string, contract: JsonqlContract): string | boolean;
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
/**
 * Port this from the CIS App
 * Note the original call singature has a param call `key` but never used
 */
export declare const replaceErrors: (value: any) => any;
/**
 * create readible string version of the error object
 */
export declare const printError: (error: Error) => string;
