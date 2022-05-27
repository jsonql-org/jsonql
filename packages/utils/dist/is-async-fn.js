"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAsyncFn = void 0;
const tslib_1 = require("tslib");
// from https://thewebdev.info/2022/03/03/how-to-check-a-function-is-async-with-javascript/
function isAsyncFn(fn) {
    const AsyncFunction = (() => tslib_1.__awaiter(this, void 0, void 0, function* () { console.log(0); })).constructor;
    return fn instanceof AsyncFunction;
}
exports.isAsyncFn = isAsyncFn;
