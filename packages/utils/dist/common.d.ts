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
  change to a normal function
*/
export declare function formatStr(str: string, ...args: any[]): string;
