"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAll = exports.promise = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("./lodash");
/* looks silly but save a lot of typing in ava async test */
const promise = (cb) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return new Promise(cb); });
exports.promise = promise;
/**
  This is basically the process chain promises
  the different is even when some failed
  we will not throw it and exit, instead we put that in the
  fail result array
*/
function processAll(promises) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return promises.reduce((promiseChain, currentTask) => (promiseChain.then(chainResults => (currentTask
            .then(currentResult => ((0, lodash_1.merge)(chainResults, {
            done: [...chainResults.done, currentResult]
        })))
            .catch(err => ((0, lodash_1.merge)(chainResults, {
            fail: [...chainResults.fail, err]
        })))))), Promise.resolve({ done: [], fail: [] }));
    });
}
exports.processAll = processAll;
