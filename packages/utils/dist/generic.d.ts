/**
 * DIY in Array
 */
export declare const inArray: (arr: any[], value: any) => boolean;
export declare const toArray: (arg: any) => any[];
/**
 * parse string to json or just return the original value if error happened
 */
export declare const parseJson: (n: any, t?: boolean) => any;
/**
 * check if the key existing in an object
 */
export declare const isObjectHasKey: (obj: object, key: string) => boolean;
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
 * Simple check if the prop is function
 */
export declare const isFunc: (prop: any) => boolean;
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
export declare const readOnly: (config: object) => void;