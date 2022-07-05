import type { AnyType, AnyTypeArr } from './types';
/**
 * DIY in Array
 */
export declare const inArray: (arr: AnyTypeArr, value: AnyType) => boolean;
export declare const toArray: (arg: AnyType) => any[];
/**  remove nil-like-value from array */
export declare const compact: (arr: Array<unknown>) => unknown[];
