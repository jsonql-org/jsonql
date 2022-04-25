/**
 * check if its array or array like
 * why the type is a not a boolean?
 */
export declare function checkArray(value: any, type?: string | string[]): boolean;
/**
 * check if it matches the array.<T> pattern
 * This method will be deprecated soon - we are not using the jsdoc to get the type any more
 * @TODO 2022-04-23 Instead of deprecated this we need to expand this method to use the swc generated map
 * also make it compatible between the array.<T> and the array<T> style (jsdoc or ts)
 */
export declare function isArrayLike(type: string): boolean | string[];
/**
 * we might encounter something like array.<T> then we need to take it apart
 @deprecated This method is no longer needed here
 */
export declare function arrayTypeHandler(p: any, type: any[]): boolean;
