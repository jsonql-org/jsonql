import type { AnyType, JsonqlResolver, JsonqlAsyncResolver } from './types';
/**
 * this is essentially the same as the injectToFn
 * but this will not allow overwrite and set the setter and getter
 */
export declare function objDefineProps(obj: AnyType, name: string, setter: AnyType, getter?: null): any;
/**
 * check if the object has name property
 */
export declare function objHasProp(obj: AnyType, name: string): any;
/**
 * After the user login we will use this Object.define add a new property
 * to the resolver with the decoded user data
 */
export declare function injectToFn(resolver: JsonqlResolver | JsonqlAsyncResolver, name: string, data: AnyType, overwrite?: boolean): JsonqlResolver | JsonqlAsyncResolver;
