/**
 * Historical library
 * @2015-05-04 found a problem if the value is a number like string
 * it will pass, so add a check if it's string before we pass to next
 * @2022 completely rewritten from ground up
 */
export declare function checkNumber(value: number): boolean;
export declare function checkInteger(value: unknown): boolean;
export declare function checkFloat(value: unknown): boolean;
export declare function checkUnsigned(value: unknown): boolean;
