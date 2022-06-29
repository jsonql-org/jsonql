import type { AnyType, AnyTypeArr } from './types';
/**
 * using just the map reduce to chain multiple functions together
 * @_param {function} mainFn the init function
 * @_param {array} moreFns as many as you want to take the last value and return a new one
 * @_return {function} accept value for the mainFn
 */
export declare const chainFns: (mainFn: AnyType, ...moreFns: AnyTypeArr) => (...args: AnyTypeArr) => AnyType;
/**
 * pass an array of functions to call chainFns
 */
export declare const chainArrayFns: (fns: AnyTypeArr) => any;
