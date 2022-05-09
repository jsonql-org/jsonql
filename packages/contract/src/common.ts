
/** return the first value */
export function getObjValue(obj: any) {
  for (const _ in obj) {
    return obj
  }
  throw new Error(`If you see me then check your input object!`)
}
