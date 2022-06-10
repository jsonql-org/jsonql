/**
 * simple util method to get the value from the config object
 */
export declare const getConfigValue: (name: string, obj: object) => any;
/**
 * Shorthand method for Object.assign
 */
export declare const assign: (...args: unknown[]) => any;
/**
Array to object
*/
export declare const arrToObj: (args: unknown[], processor: any, initValue?: {}) => any;
/**
 * check if the key existing in an object
 */
export declare const objectHasKey: (obj: object, key: string) => boolean;
/**
 * Shorthand method to turn config into immutatble (readonly)
 * was call freeze
 */
export declare const readOnly: (config: object) => any;
