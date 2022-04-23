/**
 * @2015-05-04 found a problem if the value is a number like string
 * it will pass, so add a check if it's string before we pass to next
 */
export declare function checkNumber(value: number): boolean;
export declare function checkInteger(value: any): void;
export declare function checkFloat(value: any): void;
export declare function checkUnsigned(value: any): void;
