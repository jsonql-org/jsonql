/** it's quite annoying Typescript Function type is useless */
export declare function promisify(fn: any): (...args: any[]) => Promise<boolean>;
/** When the result is true get rejected and vice vesa */
export declare function reversePromisifyResult(fn: any): (...args: any[]) => Promise<boolean>;
