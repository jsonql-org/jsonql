// bunch of object related methods
import type { AnyType, MapCallback } from './types'
import { inArray } from './array'
import { trueTypeOf } from './truetypeof'

export function isObject (o: AnyType): boolean {
  return trueTypeOf(o) === 'object'
}

// move the isPlainObject method here
export function isPlainObject (o: AnyType): boolean {
  if (isObject(o)) {
    // If has modified constructor
    const constr = o.constructor
    /* this check is pointless even {} has prototype
    if (constr === undefined) {
      return true
    } */
    const prot = constr.prototype
    const nullType = '[Object: null prototype]'
    if (prot.toString().substring(0, nullType.length) === nullType) {
      return true
    }
    // If has modified prototype
    if (isObject(prot) === false) {
      return false
    }

    return Reflect.apply(prot['hasOwnProperty'], prot, ['isPrototypeOf'])
  }
  return false
}

/** short hand of !isPlainObject */
export const isClass = (o: AnyType): boolean => !isPlainObject(o)

/**
 * simple util method to get the value from the config object
 */
export const getConfigValue = (name: string, obj: object) => (
  obj && isPlainObject(obj) ? ( (name in obj) ? obj[name] : undefined ) : undefined
)

/**
 * Shorthand method for Object.assign
 */
export const assign = (...args: unknown[]) => Reflect.apply(Object.assign, Object, args)
export const extend = assign // alias
/**
  Array to object
*/
export const arrToObj = (
  args: unknown[],
  processor: MapCallback,
  initValue = {}
): AnyType => args.map(processor).reduce((a, b) => assign(a,b), initValue)

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
 * Shorthand method to turn config into immutatble (readonly)
 * was call freeze
 */
export const readOnly = (config: object): AnyType => Object.freeze(config)
