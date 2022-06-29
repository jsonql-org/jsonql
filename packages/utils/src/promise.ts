// move some of the promise related methods here
import type { AnyType } from './types'

/* looks silly but save a lot of typing */
export const promise = async (cb: AnyType) => new Promise(cb)
