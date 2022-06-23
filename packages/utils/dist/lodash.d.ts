import type { FlatMapCallback } from './types';
export declare const curry: (fn: any, ...args: any[]) => any;
export declare const merge: (target: any, ...sources: any[]) => any;
export declare const isObject: (item: unknown) => boolean;
export declare function flatMap(arr: any[], callback?: FlatMapCallback): any[];
export declare function isPlainObject(obj: unknown): boolean;
export declare function isString(value: unknown): boolean;
/*!
 * Check if two objects or arrays are equal
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {*}       obj1 The first item
 * @param  {*}       obj2 The second item
 * @return {Boolean}       Returns true if they're equal in value
 */
export declare function isEqual(obj1: unknown, obj2: unknown): boolean;
