import type { AnyType, AnyTypeArr } from '@jsonql/utils/index';
/** it's quite annoying Typescript Function type is useless */
export declare function promisify(fn: AnyType): (...args: AnyTypeArr) => Promise<boolean>;
/** When the result is true get rejected and vice vesa */
export declare function reversePromisifyResult(fn: AnyType): (...args: AnyTypeArr) => Promise<boolean>;
