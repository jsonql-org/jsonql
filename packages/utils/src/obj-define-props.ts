import {
  JsonqlResolver,
  JsonqlAsyncResolver
} from './types'

/**
 * this is essentially the same as the injectToFn
 * but this will not allow overwrite and set the setter and getter
 */
export function objDefineProps(obj: any, name: string, setter: any, getter = null) {
  if (Object.getOwnPropertyDescriptor(obj, name) === undefined) {
    Object.defineProperty(obj, name, {
      set: setter,
      get: getter === null ? function() { return null; } : getter
    })
  }

  return obj
}

/**
 * check if the object has name property
 */
export function objHasProp(obj: any, name: string) {
  const prop = Object.getOwnPropertyDescriptor(obj, name)

  return prop !== undefined && prop.value ? prop.value : prop
}

/**
 * After the user login we will use this Object.define add a new property
 * to the resolver with the decoded user data
 */
export function injectToFn(
  resolver: JsonqlResolver | JsonqlAsyncResolver, 
  name: string,
  data: any,
  overwrite = false
) {
  const check = objHasProp(resolver, name)
  if (overwrite === false && check !== undefined) {
    // console.info(`NOT INJECTED`)
    return resolver
  }
  /* this will throw error! @TODO how to remove props?
  if (overwrite === true && check !== undefined) {
    delete resolver[name] // delete this property
  }
  */
  // console.info(`INJECTED`)
  Object.defineProperty(resolver, name, {
    value: data,
    writable: overwrite // if its set to true then we should able to overwrite it
  })

  return resolver
}
