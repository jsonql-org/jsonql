/**
 * check if its array or array like
 * why the type is a not a boolean?
 */
export declare function checkArray(value: any, type?: string): boolean;
/**
 * @deprecated
 * check if it matches the array.<T> pattern
 * This method will be deprecated soon - we are not using the jsdoc to get the type any more
 */
export declare function isArrayLike(type: string): boolean | any[];
/**
 * we might encounter something like array.<T> then we need to take it apart
 */
export declare function arrayTypeHandler(p: any, type: any | any[]): boolean;
