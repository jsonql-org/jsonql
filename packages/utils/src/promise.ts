// move some of the promise related methods here
import type { AnyType, ProcessAllResult } from './types'
import { merge } from './lodash'

/* looks silly but save a lot of typing in ava async test */
export const promise = async (cb: AnyType) => new Promise(cb)

/**
  This is basically the process chain promises
  the different is even when some failed
  we will not throw it and exit, instead we put that in the
  fail result array
*/
export async function processAll(
  promises: Array<Promise<AnyType>>
): Promise<ProcessAllResult> {

  return promises.reduce((promiseChain, currentTask) => (
    promiseChain.then(chainResults => (
      currentTask
        .then(currentResult => (
          merge(chainResults, {
            done: [...chainResults.done, currentResult]
          })
        ))
        .catch(err => (
          merge(chainResults, {
            fail: [...chainResults.fail, err]
          })
        ))
    ))
  ), Promise.resolve(
    { done: [], fail: [] }
  ))
}
