// bunch of generic helpers
import type { AnyType, AnyTypeArr } from './types'
import { isString } from './lodash'
/**
 * DIY in Array
 */
export const inArray = (arr: AnyTypeArr, value: AnyType) => !!arr.filter(a => a === value).length

// quick and dirty to turn non array to array
export const toArray = (arg: AnyType) => Array.isArray(arg) ? arg : [arg]

/**
 * parse string to json or just return the original value if error happened
 */
export const parseJson = (n: AnyType, t = true) => {
  try {
    return isString(n) ?
      JSON.parse(n) :
      JSON.parse(JSON.stringify(n))
  } catch(e) {
    if (t) {
      return n
    }
    throw e // just rethrow it
  }
}

/**
 * create an event name
 */
export const createEvtName = (...args: string[]) => args.join('_')

/**
 * generic placeholder function
 */
export const nil = () => false

/** handy method to show deep json structure */
export const showDeep = (code: unknown): void => {
  console.dir(code, { depth: null })
}

/** from https://www.tutorialstonight.com/javascript-string-format.php
  change to a standard function instead of prototype pollution
*/
export function formatStr(str: string, ...args: AnyTypeArr) {
  return str.replace(/{([0-9]+)}/g, (match: string, index: number) => (
    typeof args[index] === 'undefined' ? match : args[index]
  ))
}
