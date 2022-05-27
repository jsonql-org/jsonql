"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAsyncFn = void 0;
const tslib_1 = require("tslib");
function isAsyncFn(fn) {
    // @ts-ignore
    const AsyncArrowFunction = (() => tslib_1.__awaiter(this, void 0, void 0, function* () { })).constructor;
    // @ts-ignore
    const AsyncFunction = (function () {
        return tslib_1.__awaiter(this, void 0, void 0, function* () { });
    }).constructor;
    return fn instanceof AsyncFunction ||
        fn instanceof AsyncArrowFunction;
}
exports.isAsyncFn = isAsyncFn;
