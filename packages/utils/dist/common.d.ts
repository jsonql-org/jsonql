import type { AnyType, AnyTypeArr } from './types';
/**
 * DIY in Array
 */
export declare const inArray: (arr: AnyTypeArr, value: AnyType) => boolean;
export declare const toArray: (arg: AnyType) => any[];
/**
 * parse string to json or just return the original value if error happened
 */
export declare const parseJson: (n: AnyType, t?: boolean) => any;
/**
 * create an event name
 */
export declare const createEvtName: (...args: string[]) => string;
/**
 * generic placeholder function
 */
export declare const nil: () => boolean;
/** handy method to show deep json structure */
export declare const showDeep: (code: unknown) => void;
/** from https://www.tutorialstonight.com/javascript-string-format.php
  change to a standard function instead of prototype pollution
*/
export declare function formatStr(str: string, ...args: AnyTypeArr): string;
