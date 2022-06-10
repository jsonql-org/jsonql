export declare const isEmptyObj: (obj: any) => boolean;
/**
 * Check several parameter that there is something in the param
 */
export declare const isNotEmpty: (param: unknown) => boolean;
/**
 * Check several parameter that there is something in the param
 this is problematic should rename to isNotEmptyParam
 and we should check if its array is it empty array
 if it's object then if its empty object
 */
export declare function notEmpty(a: unknown, valueCheck?: boolean): boolean;
/** just not to make my head hurt */
export declare const isEmpty: (value: unknown, valueCheck?: boolean) => boolean;
