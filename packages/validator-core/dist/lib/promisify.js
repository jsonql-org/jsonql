"use strict";
// create our own promisify method here
// because there are many situation we want the validating method to be async
/// also this define here because the result is in reverse not suitable
// for general purpose use
Object.defineProperty(exports, "__esModule", { value: true });
exports.reversePromisifyResult = exports.promisify = void 0;
const tslib_1 = require("tslib");
/** it's quite annoying Typescript Function type is useless */
function promisify(fn) {
    return (...args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const result = Reflect.apply(fn, null, args);
        return result ? Promise.resolve(result) : Promise.reject(result);
    });
}
exports.promisify = promisify;
/** When the result is true get rejected and vice vesa */
function reversePromisifyResult(fn) {
    return (...args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const result = Reflect.apply(fn, null, args);
        return result ? Promise.reject(result) : Promise.resolve(result);
    });
}
exports.reversePromisifyResult = reversePromisifyResult;
