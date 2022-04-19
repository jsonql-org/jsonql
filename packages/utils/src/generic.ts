// bunch of generic helpers
// import isArray from 'lodash-es/isArray'
import { isPlainObject } from './lodash'

/**
 * DIY in Array
 */
export const inArray = (arr: any[], value: any) => !!arr.filter(a => a === value).length

// quick and dirty to turn non array to array
export const toArray = (arg: any) => Array.isArray(arg) ? arg : [arg]

/**
 * parse string to json or just return the original value if error happened
 */
export const parseJson = (n: any, t=true) => {
  try {
    return JSON.parse(JSON.stringify(n))
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
export const isObjectHasKey = (obj: object, key: string): boolean => {
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
export const isNotEmpty = (param: any) => (
  param !== undefined &&
  param !== false &&
  param !== null &&
  (param+'').trim() !== ''
)

/**
 * Simple check if the prop is function
 */
export const isFunc = (prop: any) => {
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
