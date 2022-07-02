import type { AnyType } from './types';
/**
 * Just check if a pattern is an RegExp object
 */
export declare function isRegExp(pat: AnyType): boolean;
/**
 * Find from the array by matching the pattern
 */
export declare function getRegex(pattern: string | RegExp): RegExp | string | boolean;
