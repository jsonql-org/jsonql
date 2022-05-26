// create our own promisify method here
// because there are many situation we want the validating method to be async
/// also this define here because the result is in reverse not suitable
// for general purpose use

/** it's quite annoying Typescript Function type is useless */
export function promisify(fn: any) {

  return async (...args: any[]): Promise<boolean> => {
    const result = await Reflect.apply(fn, null, args)

    return result ? Promise.resolve(result) : Promise.reject(result)
  }
}

/** When the result is true get rejected and vice vesa */
export function reversePromisifyResult(fn: any) {

  return async (...args: any[]): Promise<boolean> => {
    const result = await Reflect.apply(fn, null, args)

    return result ? Promise.reject(result) : Promise.resolve(result)
  }
}
