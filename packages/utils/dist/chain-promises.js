"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chainProcessPromises = exports.chainPromises = void 0;
// break it out on its own because
// it's building from the lodash-es from scratch
// according to this discussion https://github.com/lodash/lodash/issues/3298
const lodash_1 = require("./lodash");
/**
 * previously we already make sure the order of the namespaces
 * and attach the auth client to it
 */
function chainPromises(promises, asObject = false) {
    return promises.reduce((promiseChain, currentTask) => (promiseChain.then(chainResults => (currentTask.then(currentResult => (asObject === false ? [...chainResults, currentResult] : (0, lodash_1.merge)(chainResults, currentResult)))))), Promise.resolve(asObject === false ? [] : ((0, lodash_1.isPlainObject)(asObject) ? asObject : {})));
}
exports.chainPromises = chainPromises;
/**
 * This one return a different result from the chainPromises
 * it will be the same like chainFns that take one promise resolve as the next fn parameter
 */
function chainProcessPromises(initPromise, ...promises) {
    return (...args) => (promises.reduce((promiseChain, currentTask) => (promiseChain.then((chainResult) => (currentTask(chainResult)))), Reflect.apply(initPromise, null, args)));
}
exports.chainProcessPromises = chainProcessPromises;
/**
 pass an array of promises, when one fail then exit
 then result return from the success promise will pass to the next one as parameter
*/
/*
export function some(promises: Array<Promise<any>>, acculminator = []) {
  const fn = promises.shift()
  return fn()
    .then((result: any) => {

    })

}
*/
