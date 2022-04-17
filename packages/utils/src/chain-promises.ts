// break it out on its own because
// it's building from the lodash-es from scratch
// according to this discussion https://github.com/lodash/lodash/issues/3298
import isPlainObject from 'lodash-es/isPlainObject'
import merge from 'lodash-es/merge'

/**
 * previously we already make sure the order of the namespaces
 * and attach the auth client to it
 * @_param {array} promises array of unresolved promises
 * @_param {boolean} asObject if true then merge the result object
 * @_return {object} promise resolved with the array of promises resolved results
 */
export function chainPromises(promises: Array<Promise<any>>, asObject = false) {
  return promises.reduce((promiseChain, currentTask) => (
    promiseChain.then(chainResults => (
      currentTask.then(currentResult => (
        asObject === false ? [...chainResults, currentResult] : merge(chainResults, currentResult)
      ))
    ))
  ), Promise.resolve(
    asObject === false ? [] : (isPlainObject(asObject) ? asObject : {})
  ))
}

/**
 * This one return a different result from the chainPromises
 * it will be the same like chainFns that take one promise resolve as the next fn parameter
 * @_param {function} initPromise a function that accept param and resolve result
 * @_param {array} promises array of function pass that resolve promises
 * @_return {promise} resolve the processed result
 */
export function chainProcessPromises(initPromise: Function, ...promises: Array<Function>) {
  return (...args: any[]) => (
      promises.reduce((promiseChain, currentTask) => (
        promiseChain.then((chainResult: any) => (
          currentTask(chainResult)
        )
      )
    ), Reflect.apply(initPromise, null, args))
  )
}
