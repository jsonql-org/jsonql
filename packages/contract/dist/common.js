"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjValue = void 0;
/** return the first value */
function getObjValue(obj) {
    for (const _ in obj) {
        return obj;
    }
    throw new Error(`If you see me then check your input object!`);
}
exports.getObjValue = getObjValue;
