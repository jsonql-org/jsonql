import { JsonqlCheckObjectKeys } from '../types';
/**
 * check if the input is object also able to check if key(s) existed in that object
 @TODO need to rethink about how this checkObject keys should be
 */
export declare function checkObject(value: any, keys?: string | Array<string> | Array<JsonqlCheckObjectKeys>): boolean;
/**
 * fold this into it's own function to handler different object type
 */
export declare const objectTypeHandler: (p: any) => any;
/** check if an object is empty */
export declare const isEmptyObject: (value: any) => boolean;
