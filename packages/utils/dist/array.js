"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compact = exports.toArray = exports.inArray = void 0;
/**
 * DIY in Array
 */
const inArray = (arr, value) => arr.includes(value);
exports.inArray = inArray;
// quick and dirty to turn non array to array
const toArray = (arg) => Array.isArray(arg) ? arg : [arg];
exports.toArray = toArray;
/**  remove nil-like-value from array */
const compact = (arr) => arr.filter(Boolean);
exports.compact = compact;
