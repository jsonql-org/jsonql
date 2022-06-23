import type { AnyType, AnyTypeArr } from './types';
declare global {
    interface Window {
        DEBUG?: AnyType;
        JSONQL_DEBUG?: AnyType;
    }
}
/**
 * simple for browser console.info wrapper
 */
export declare function logger(...args: AnyTypeArr): void;
/**
 * generic logger method can control via global property
 */
export declare const getLogger: (name: string) => (...args: AnyTypeArr) => void;
