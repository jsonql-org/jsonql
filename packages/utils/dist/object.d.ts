import type { AnyType, MapCallback } from './types';
export declare function isObject(o: AnyType): boolean;
export declare function isPlainObject(o: AnyType): boolean;
/** short hand of !isPlainObject */
export declare const isClass: (o: AnyType) => boolean;
/**
 * simple util method to get the value from the config object
 */
export declare const getConfigValue: (name: string, obj: object) => any;
/**
 * Shorthand method for Object.assign
 */
export declare const assign: (...args: unknown[]) => any;
export declare const extend: (...args: unknown[]) => any;
/**
  Array to object
*/
export declare const arrToObj: (args: unknown[], processor: MapCallback, initValue?: {}) => AnyType;
/**
 * check if the key existing in an object
 */
export declare const objectHasKey: (obj: object, key: string) => boolean;
/**
 * Shorthand method to turn config into immutatble (readonly)
 * was call freeze
 */
export declare const readOnly: (config: object) => AnyType;
