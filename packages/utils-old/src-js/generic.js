// bunch of generic helpers

import isArray from 'lodash-es/isArray'
import isPlainObject from 'lodash-es/isPlainObject'
import trim from 'lodash-es/trim'

/**
 * DIY in Array
 * @param {array} arr to check from
 * @param {*} value to check against
 * @return {boolean} true on found
 */
export const inArray = (arr, value) => !!arr.filter(a => a === value).length

// quick and dirty to turn non array to array
export const toArray = (arg) => isArray(arg) ? arg : [arg]

/**
 * parse string to json or just return the original value if error happened
 * @param {*} n input
 * @param {boolean} [t=true] or throw
 * @return {*} json object on success
 */
export const parseJson = function(n, t=true) {
  try {
    return JSON.parse(n)
  } catch(e) {
    if (t) {
      return n
    }
    throw new Error(e)
  }
}

/**
 * @param {object} obj for search
 * @param {string} key target
 * @return {boolean} true on success
 */
export const isObjectHasKey = function(obj, key) {
  try {
    const keys = Object.keys(obj)
    return inArray(keys, key)
  } catch(e) {
    // @BUG when the obj is not an OBJECT we got some weird output
    return false
  }
}

/**
 * create a event name
 * @param {string[]} args
 * @return {string} event name for use
 */
export const createEvt = (...args) => args.join('_')

/**
 * simple util method to get the value
 * @param {string} name of the key
 * @param {object} obj to take value from
 * @return {*} the object value id by name or undefined
 */
export const getConfigValue = (name, obj) => (
  obj && isPlainObject(obj) ? ( (name in obj) ? obj[name] : undefined ) : undefined
)

/**
 * small util to make sure the return value is valid JSON object
 * @param {*} n input
 * @return {object} correct JSON object
 */
export const toJson = n => {
  if (typeof n === 'string') {
    return parseJson(n)
  }
  return parseJson(JSON.stringify(n))
}

/**
 * Check several parameter that there is something in the param
 * @param {*} param input
 * @return {boolean}
 */
export const isNotEmpty = function(param) {
  return param !== undefined && param !== false && param !== null && trim(param) !== ''
}

/**
 * Simple check if the prop is function
 * @param {*} prop input
 * @return {boolean} true on success
 */
export const isFunc = prop => {
  if (typeof prop === 'function') {
    return true;
  }
  console.error(`Expect to be Function type! Got ${typeof prop}`)
}

/**
 * Shorthand method for Object.assign 
 * @param {array} args 
 * @return {object} merge together object by key 
 */
export const assign = (...args) => Reflect.apply(Object.assign, Object, args)
  
/** 
 * generic placeholder function
 * @return {boolean} false 
 */
export const nil = () => false

/**
 * generic turn config into immutatble 
 */
export const freeze = config => Object.freeze(config)