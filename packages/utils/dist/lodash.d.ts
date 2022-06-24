import type { AnyType, FlatMapCallback } from './types';
export declare const curry: (fn: AnyType, ...args: AnyType[]) => any;
export declare const merge: (target: AnyType, ...sources: AnyType[]) => any;
export declare function flatMap(arr: AnyType[], callback?: FlatMapCallback): any[];
export declare function isString(value: unknown): boolean;
