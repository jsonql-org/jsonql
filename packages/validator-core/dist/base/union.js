"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUnion = void 0;
const tslib_1 = require("tslib");
const combine_1 = require("./combine");
const array_1 = require("./array");
const object_1 = require("./object");
const utils_1 = require("@jsonql/utils");
const constants_1 = require("@jsonql/constants");
/**
We use the chainProcessPromises fail and exit side effects to
accomplish this task fast, because it's OR so only need to
have one of them pass that means all pass
so if one pass we throw Error and it will exist
if it fail we resolve it therefore the then is actually failed
*/
function generatePromisesFn(value, types) {
    // we return it as a function therefore
    // if the last one fail the next one no need to get exeucte
    return types.map(type => {
        switch (type) {
            case constants_1.ARRAY_TYPE:
                return () => (0, array_1.checkArray)(value);
            case constants_1.OBJECT_TYPE:
                return () => (0, object_1.checkObject)(value);
            default:
                return () => (0, combine_1.combineCheck)(type)(value);
        }
    })
        .map(fn => ((type) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (fn() ? Promise.reject(true) : Promise.resolve(type));
    })));
}
/**
  because the union type is OR
  therefore it has to be check in one rule
*/
function checkUnion(value, types) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const ps = generatePromisesFn(value, types);
        const pFn = Reflect.apply(utils_1.chainProcessPromises, null, ps);
        return new Promise((resolver, rejecter) => {
            pFn(null) // this param is really pointless
                .catch((res) => {
                resolver(res);
            })
                .then((results) => {
                rejecter(results);
            });
        });
    });
}
exports.checkUnion = checkUnion;
