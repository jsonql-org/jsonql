"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAny = void 0;
/** validate any thing only check if there is something */
function checkAny(value, checkNull = true) {
    if (value !== undefined && value !== '' && (value + '').trim() !== '') {
        if (checkNull === false || (checkNull === true && value !== null)) {
            return true;
        }
    }
    return false;
}
exports.checkAny = checkAny;
