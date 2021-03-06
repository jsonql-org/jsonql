"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chainArrayFns = exports.chainFns = void 0;
const array_1 = require("./array");
/**
 * using just the map reduce to chain multiple functions together
 * @_param {function} mainFn the init function
 * @_param {array} moreFns as many as you want to take the last value and return a new one
 * @_return {function} accept value for the mainFn
 */
const chainFns = (mainFn, ...moreFns) => ((...args) => (moreFns.reduce((value, nextFn) => (
// change here to check if the return value is array then we spread it
Reflect.apply(nextFn, null, (0, array_1.toArray)(value))), Reflect.apply(mainFn, null, args))));
exports.chainFns = chainFns;
/**
 * pass an array of functions to call chainFns
 */
const chainArrayFns = (fns) => Reflect.apply(exports.chainFns, null, fns);
exports.chainArrayFns = chainArrayFns;
