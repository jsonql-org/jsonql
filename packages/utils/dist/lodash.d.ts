import type { FlatMapCallback } from './types';
export declare const curry: (fn: any, ...args: any[]) => any;
export declare const merge: (target: any, ...sources: any[]) => any;
export declare const isObject: (item: unknown) => unknown;
export declare function flatMap(arr: any[], callback?: FlatMapCallback): any[];
export declare function isPlainObject(obj: unknown): boolean;
export declare function isString(value: unknown): boolean;
export declare function isEqual(obj1: unknown, obj2: unknown): boolean;
