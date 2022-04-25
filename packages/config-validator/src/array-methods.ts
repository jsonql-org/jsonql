import {
  ARRAY_TYPE_LFT,
  ARRAY_TYPE_RGT,
  ARRAY_TS_TYPE_LFT,
  // ARRAY_TYPE,
  // OBJECT_TYPE,
  OR_SEPERATOR
} from '@jsonql/constants'
const STYLES = {ts: ARRAY_TS_TYPE_LFT, jsdoc: ARRAY_TYPE_LFT}
/** Take the string type like array.<T> or Array<T> apart */
function destructArrayStr(type: string, syntax = 'ts'): Array<string> | boolean {
  const left = STYLES[syntax]
  if (!left) {
    throw new Error(`Syntax not supported! ${Object.keys(STYLES)}`)
  }
  if (type.indexOf(left) > -1 && type.indexOf(ARRAY_TYPE_RGT) > -1) {
    const _type = type.replace(left, '').replace(ARRAY_TYPE_RGT, '')
    if (_type.indexOf(OR_SEPERATOR)) {
      // return as array
      return _type.split(OR_SEPERATOR)
    }
    // return as array
    return [_type]
  }

  return false
}

/**
 * check if it matches the array.<T> pattern
 * This method will be deprecated soon - we are not using the jsdoc to get the type any more
 * @TODO 2022-04-23 Instead of deprecated this we need to expand this method to use the swc generated map
 * also make it compatible between the array.<T> and the array<T> style (jsdoc or ts)
 */
export function isArrayLike(type: string): boolean | string[] {
  // debugFn(type)
  // check ts first
  const check1 = destructArrayStr(type)
  if (!check1) {
    return destructArrayStr(type, 'jsdoc')
  }
  /**
  Todo read the swc generate map here

  **/
  return false
}

/**
 * we might encounter something like array.<T> then we need to take it apart
 @deprecated This method is no longer needed here
 */
export function arrayTypeHandler(p: any, type: any[]): boolean {
  const { arg } = p
  // need a special case to handle the OR type
  // we need to test the args instead of the type(s)
  if (type.length > 1) {
    return !arg.filter((v: any) => (
      !(type.length > type.filter((t: any) => !combineCheck(t)(v)).length)
    )).length
  }
  // type is array so this will be or!
  return type.length > type.filter((t: any) => !checkArray(arg, t)).length
}
