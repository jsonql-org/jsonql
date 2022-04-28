"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUnion = exports.generateReversePromisesFn = void 0;
const tslib_1 = require("tslib");
const combine_1 = require("./combine");
const array_1 = require("./array");
const object_1 = require("./object");
const src_1 = require("@jsonql/utils/src");
const constants_1 = require("@jsonql/constants");
/** wrap the or return result together */
function typeAsFail(result, type) {
    return result || type;
}
/**
We use the chainProcessPromises fail and exit side effects to
accomplish this task fast, because it's OR so only need to
have one of them pass that means all pass
so if one pass we throw Error and it will exist
if it fail we resolve it therefore the then is actually failed
*/
function generateReversePromisesFn(value, types, extended // this will be check keys
) {
    // we return it as a function therefore
    // if the last one fail the next one no need to get exeucte
    return types.map((type, i) => {
        const args = [value];
        if (extended && extended[i]) {
            args.push(extended[i]);
        }
        switch (type) {
            case constants_1.ARRAY_TYPE:
                return () => typeAsFail(Reflect.apply(array_1.checkArray, null, args), type);
            case constants_1.OBJECT_TYPE:
                return () => typeAsFail(Reflect.apply(object_1.checkObject, null, args), type);
            default:
                return () => typeAsFail((0, combine_1.combineCheck)(type)(value), type);
        }
    })
        .map(fn => (
    // this treat result in opposite way because once one pass
    // then we want to exit the queue (it's OR just need one to pass)
    () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const result = fn();
        // @TODO may be push them together in one array?
        return result === true ? Promise.reject(true) : Promise.resolve(result);
    })));
}
exports.generateReversePromisesFn = generateReversePromisesFn;
/**
  because the union type is OR
  therefore it has to be check in one rule
*/
function checkUnion(value, types, extended) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const ps = generateReversePromisesFn(value, types, extended);
        // we wrap this in another promise to reverse the result
        return new Promise((resolver, rejecter) => {
            /**
            There is a weird behavior here, if we call the catch first
            the 'then' always get call, it might be a promise A behavior
            */
            (0, src_1.queuePromisesProcess)(ps, types[0])
                .then((type) => {
                // console.log('failed', type)
                rejecter(type);
            })
                .catch((res) => {
                // console.log('passed', res)
                resolver(res);
            });
        });
    });
}
exports.checkUnion = checkUnion;
