import type { AnyType, AnyTypeArr, JsonqlPromiseChainFn } from './types'
// break it out on its own because
// it's building from the lodash-es from scratch
// according to this discussion https://github.com/lodash/lodash/issues/3298
import { isPlainObject, merge, flatMap } from './lodash'
/**
 * previously we already make sure the order of the namespaces
 * and attach the auth client to it
 */
export function chainPromises(
  promises: Array<Promise<AnyType>>,
  asObject: boolean | object = false
) {
  return promises.reduce((promiseChain, currentTask) => (
    promiseChain.then(chainResults => (
      currentTask.then(currentResult => (
        asObject === false ?
          [...chainResults, currentResult] :
          merge(chainResults, currentResult)
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
export function chainProcessPromises(
  initPromise: JsonqlPromiseChainFn,
  ...promises: Array<JsonqlPromiseChainFn>
) {
  return (...args: AnyTypeArr) => (
      promises.reduce((promiseChain, currentTask) => (
        promiseChain.then((chainResult: AnyType) => (
          currentTask(chainResult)
        )
      )
    ), Reflect.apply(initPromise, null, args))
  )
}

/**
 * This is a combine method to run the above chain process
 * cos sometime we don't want to have the process separate (see validator)
 */
export function queuePromisesProcess(
  queue: Array<JsonqlPromiseChainFn>,
  ...initValue: AnyTypeArr
) {
  // we need to make sure the Array is actually flat array
  const q = flatMap(queue)
  const ex = Reflect.apply(chainProcessPromises, null, q)

  return Reflect.apply(ex, null, initValue)
}
