/**
 * Simple check if the prop is function
 * We found situtation where it report as an object but debug output show as [Function]
 */
export declare const isFunction: (prop: unknown, debug?: boolean) => boolean;
/** finally found a solution to check if something is an async function */
export declare function isAsyncFunction(prop: unknown): boolean;
