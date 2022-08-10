import type { AnyType } from './types';
export declare const promise: (cb: AnyType) => Promise<unknown>;
/** we unwrap the result to make it more generic */
export declare function processAll(promises: Array<Promise<AnyType>>): Promise<any[]>;
