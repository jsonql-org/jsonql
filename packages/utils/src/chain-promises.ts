// break it out on its own because
// it's building from the lodash-es from scratch
// according to this discussion https://github.com/lodash/lodash/issues/3298
import { isPlainObject, merge } from './lodash'
/**
 * previously we already make sure the order of the namespaces
 * and attach the auth client to it
 */
export function chainPromises(promises: Array<Promise<any>>, asObject: boolean | object = false) {
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
