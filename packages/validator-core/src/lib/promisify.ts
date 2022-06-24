// create our own promisify method here
// because there are many situation we want the validating method to be async
/// also this define here because the result is in reverse not suitable
// for general purpose use

import type { AnyType, AnyTypeArr } from '@jsonql/utils/index'

/** it's quite annoying Typescript Function type is useless */
export function promisify(fn: AnyType) {

  return async (...args: AnyTypeArr): Promise<boolean> => {
    const result = await Reflect.apply(fn, null, args)

    return result ? Promise.resolve(result) : Promise.reject(result)
  }
}

/** When the result is true get rejected and vice vesa */
export function reversePromisifyResult(fn: AnyType) {

  return async (...args: AnyTypeArr): Promise<boolean> => {
    const result = await Reflect.apply(fn, null, args)

    return result ? Promise.reject(result) : Promise.resolve(result)
  }
}
