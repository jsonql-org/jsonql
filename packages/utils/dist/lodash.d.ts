import type { AnyType, FlatMapCallback } from './types';
export declare const curry: (fn: AnyType, ...args: AnyType[]) => any;
export declare const merge: (target: AnyType, ...sources: AnyType[]) => any;
export declare const isObject: (item: unknown) => boolean;
export declare function flatMap(arr: AnyType[], callback?: FlatMapCallback): any[];
export declare function isPlainObject(obj: unknown): boolean;
export declare function isString(value: unknown): boolean;
export declare function isEqualCheap(obj1: unknown, obj2: unknown): boolean;
export declare function isEqual(obj1: unknown, obj2: unknown): boolean;
