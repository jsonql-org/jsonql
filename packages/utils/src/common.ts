// bunch of generic helpers
// import isArray from 'lodash-es/isArray'
import { isPlainObject, isString } from './lodash'
/**
 * DIY in Array
 */
export const inArray = (arr: any[], value: any) => !!arr.filter(a => a === value).length

// quick and dirty to turn non array to array
export const toArray = (arg: any) => Array.isArray(arg) ? arg : [arg]

// check if an obj is empty, ported from Velocejs
export const isEmptyObj = (obj: any): boolean => (
  obj && Object.keys(obj).length === 0 && obj.constructor === Object
)

/**
 * parse string to json or just return the original value if error happened
 */
export const parseJson = (n: any, t=true) => {
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
 * check if the key existing in an object
 */
export const objectHasKey = (obj: object, key: string): boolean => {
  try {
    const keys = Object.keys(obj)

    return inArray(keys, key)
  } catch(e) {
    // @_BUG when the obj is not an OBJECT we got some weird output
    return false
  }
}

/**
 * create an event name
 */
export const createEvtName = (...args: string[]) => args.join('_')

/**
 * simple util method to get the value from the config object
 */
export const getConfigValue = (name: string, obj: object) => (
  obj && isPlainObject(obj) ? ( (name in obj) ? obj[name] : undefined ) : undefined
)

/**
 * Check several parameter that there is something in the param
 */
export const isNotEmpty = (param: any): boolean => (
  param !== undefined &&
  // param !== false &&
  param !== null &&
  (param+'').trim() !== ''
)

/**
 * Check several parameter that there is something in the param
 this is problematic should rename to isNotEmptyParam
 and we should check if its array is it empty array
 if it's object then if its empty object
 */
export function notEmpty(a: any, valueCheck = false): boolean {
  if (Array.isArray(a)) {
    // @NOTE we now check if its an empty array as well
    return valueCheck ? !!a.length : false
  }
  if (isPlainObject(a)) {

    return valueCheck ? !isEmptyObj(a) : false
  }

  return isNotEmpty(a)
}

// just not to make my head hurt
export const isEmpty = (value: any, valueCheck?: boolean) => !notEmpty(value, valueCheck)

/**
 * Simple check if the prop is function
 */
export const isFunction = (prop: any) => {
  if (typeof prop === 'function') {
    return true
  }
  console.error(`Expect to be Function type! Got ${typeof prop}`)
  return false
}

/**
 * Shorthand method for Object.assign
 */
export const assign = (...args: any[]) => Reflect.apply(Object.assign, Object, args)

/**
 * generic placeholder function
 */
export const nil = () => false

/**
 * Shorthand method to turn config into immutatble (readonly)
 * was call freeze
 */
export const readOnly = (config: object): any => Object.freeze(config)

/** handy method to show deep json structure */
export const showDeep = (code: any): void => {
  console.dir(code, { depth: null })
}

/** from https://www.tutorialstonight.com/javascript-string-format.php
  change to a normal function
*/
export function formatStr(str: string, ...args: any[]) {
  return str.replace(/{([0-9]+)}/g, (match: string, index: number) => (
    typeof args[index] === 'undefined' ? match : args[index]
  ))
}
