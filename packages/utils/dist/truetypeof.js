"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trueTypeOf = void 0;
/*!
 * More accurately check the type of a JavaScript object
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 */
function trueTypeOf(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
exports.trueTypeOf = trueTypeOf;
