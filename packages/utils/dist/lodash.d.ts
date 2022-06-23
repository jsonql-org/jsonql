import merge from 'lodash.merge';
import curry from 'lodash.curry';
declare type FlatMapCallback = (n: any, i: number, arr: any[]) => any;
export declare function flatMap(arr: any[], callback?: FlatMapCallback): any[];
export declare function isPlainObject(obj: unknown): boolean;
export declare function isString(value: unknown): boolean;
export declare function isEqual(obj1: unknown, obj2: unknown): boolean;
export { merge, curry };
