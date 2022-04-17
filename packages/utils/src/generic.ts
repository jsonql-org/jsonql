// bunch of generic helpers
// import isArray from 'lodash-es/isArray'
import isPlainObject from 'lodash-es/isPlainObject'
import trim from 'lodash-es/trim'

/**
 * DIY in Array
 * @_param {array} arr to check from
 * @_param {*} value to check against
 * @_return {boolean} true on found
 */
export const inArray = (arr: any[], value: any) => !!arr.filter(a => a === value).length

// quick and dirty to turn non array to array
export const toArray = (arg: any) => Array.isArray(arg) ? arg : [arg]

/**
 * parse string to json or just return the original value if error happened
 * @_param {*} n input
 * @_param {boolean} [t=true] pass through or throw
 * @_return {*} json object on success
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
 * @_param {object} obj for search
 * @_param {string} key target
 * @_return {boolean} true on success
 */
export const isObjectHasKey = (obj: object, key: string | symbol) => {
  try {
    const keys = Object.keys(obj)
    return inArray(keys, key)
  } catch(e) {
    // @_BUG when the obj is not an OBJECT we got some weird output
    return false
  }
}

/**
 * create a event name
 * @_param {string[]} args
 * @_return {string} event name for use
 */
export const createEvtName = (...args: string[]) => args.join('_')

/**
 * simple util method to get the value
 * @_param {string} name of the key
 * @_param {object} obj to take value from
 * @_return {*} the object value id by name or undefined
 */
export const getConfigValue = (name: string, obj: object) => (
  obj && isPlainObject(obj) ? ( (name in obj) ? obj[name] : undefined ) : undefined
)

/**
 * Check several parameter that there is something in the param
 * @_param {*} param input
 * @_return {boolean}
 */
export const isNotEmpty = function(param: any) {
  return param !== undefined && param !== false && param !== null && trim(param) !== ''
}

/**
 * Simple check if the prop is function
 * @_param {*} prop input
 * @_return {boolean} true on success
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
 * @_param {array} args
 * @_return {object} merge together object by key
 */
export const assign = (...args: any[]) => Reflect.apply(Object.assign, Object, args)

/**
 * generic placeholder function
 * @_return {boolean} false
 */
export const nil = () => false

/**
 * generic turn config into immutatble
 */
export const freeze = (config: object): void => {
  Object.freeze(config)
}
