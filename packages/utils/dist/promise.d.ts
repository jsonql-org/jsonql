import type { AnyType, ProcessAllResult } from './types';
export declare const promise: (cb: AnyType) => Promise<unknown>;
/**
  This is basically the process chain promises
  the different is even when some failed
  we will not throw it and exit, instead we put that in the
  fail result array
*/
export declare function processAll(promises: Array<Promise<AnyType>>): Promise<ProcessAllResult>;
