"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkArray = void 0;
// validate array type
const lodash_1 = require("../lib/lodash");
const combine_1 = require("./combine");
const constants_1 = require("@jsonql/constants");
/**
 * check if its array or array like
 * why the type is a not a boolean?
 */
function checkArray(value, type // @TODO more combination
) {
    if (Array.isArray(value)) {
        if (!type) {
            return true;
        }
        // we test it in reverse
        // @TODO if the type is an array (OR) then what?
        // we need to take into account this could be an array
        let c;
        if (Array.isArray(type)) { // Union type
            c = value.filter((v) => {
                // only need one is correct
                const ctn = type.length;
                for (let i = 0; i < ctn; ++i) {
                    const t = type[i];
                    if ((t === constants_1.ARRAY_TYPE && Array.isArray(v)) ||
                        (t === constants_1.OBJECT_TYPE && (0, lodash_1.isPlainObject)(v)) ||
                        (0, combine_1.combineCheck)(t)(v)) {
                        return false;
                    }
                }
                return true;
            });
        }
        else {
            c = value.filter(v => !(0, combine_1.combineCheck)(type)(v));
        }
        return !(c.length > 0);
    }
    return false;
}
exports.checkArray = checkArray;
