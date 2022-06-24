import type { AnyType } from './types';
/**
 * construct a url with query parameters
 */
export declare const urlParams: (url: string, params: AnyType) => string;
/**
 * construct a url with cache burster
 */
export declare const cacheBurstUrl: (url: string) => string;
/**
 * return _cb as key with timestamp
 */
export declare const cacheBurst: (name?: string) => {
    [x: string]: number;
};
