/**
 * DIY in Array
 */
export declare const inArray: (arr: any[], value: any) => boolean;
export declare const toArray: (arg: any) => any[];
export declare const isEmptyObj: (obj: any) => boolean;
/**
 * parse string to json or just return the original value if error happened
 */
export declare const parseJson: (n: any, t?: boolean) => any;
/**
 * check if the key existing in an object
 */
export declare const objectHasKey: (obj: object, key: string) => boolean;
/**
 * create an event name
 */
export declare const createEvtName: (...args: string[]) => string;
/**
 * simple util method to get the value from the config object
 */
export declare const getConfigValue: (name: string, obj: object) => any;
/**
 * Check several parameter that there is something in the param
 */
export declare const isNotEmpty: (param: any) => boolean;
/**
 * Check several parameter that there is something in the param
 this is problematic should rename to isNotEmptyParam
 and we should check if its array is it empty array
 if it's object then if its empty object
 */
export declare function notEmpty(a: any, valueCheck?: boolean): boolean;
export declare const isEmpty: (value: any, valueCheck?: boolean | undefined) => boolean;
/**
 * Simple check if the prop is function
 */
export declare const isFunction: (prop: any) => boolean;
/**
 * Shorthand method for Object.assign
 */
export declare const assign: (...args: any[]) => any;
/**
 * generic placeholder function
 */
export declare const nil: () => boolean;
/**
 * Shorthand method to turn config into immutatble (readonly)
 * was call freeze
 */
export declare const readOnly: (config: object) => any;
