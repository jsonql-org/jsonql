

/**
 * this is essentially the same as the injectToFn
 * but this will not allow overwrite and set the setter and getter
 * @param {object} obj to get injected
 * @param {string} name of the property
 * @param {function} setter for set
 * @param {function} [getter=null] for get default return null fn
 * @return {object} the injected obj
 */
export function objDefineProps(obj, name, setter, getter = null) {
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
 * @param {object} obj the object to check
 * @param {string} name the prop name
 * @return {*} the value or undefined
 */
export function objHasProp(obj, name) {
  const prop = Object.getOwnPropertyDescriptor(obj, name)
  return prop !== undefined && prop.value ? prop.value : prop
}

/**
 * After the user login we will use this Object.define add a new property
 * to the resolver with the decoded user data
 * @param {function} resolver target resolver
 * @param {string} name the name of the object to get inject also for checking
 * @param {object} data to inject into the function static interface
 * @param {boolean} [overwrite=false] if we want to overwrite the existing data
 * @return {function} added property resolver
 */
export function injectToFn(resolver, name, data, overwrite = false) {
  let check = objHasProp(resolver, name)
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
