// just try and get it
const getBaseName = () => {
  try { // browser
    return window.DEBUG_BASE_NAME
  } catch(e) {
    // ignore it
  }
  try { // node
    if (global.DEBUG_BASE_NAME) {
      return global.DEBUG_BASE_NAME
    } else if (process.env.DEBUG_BASE_NAME) {
      return process.env.DEBUG_BASE_NAME
    }
  } catch(e) {
    // ignore it
  }
  return 'jsonql' // just a stock one
}

/**
 * Try to normalize it to use between browser and node
 * @param {string} name for the debug output
 * @return {function} debug
 */
const getDebug = (name) => {
  const BASE_NAME = getBaseName()
  try {
    if (window.debug) { // the global browser object
      return window.debug(BASE_NAME).extend(name)
    }
  } catch(e) {
    // ignore this
  }
  try {
    if (global.debug) {
      return global.debug(BASE_NAME).extend(name)
    }
  } catch(e) {
    // ignore this
  }
  // just a stock one
  return (...args) => {
    console.info.apply(null, [BASE_NAME, name].concat(args))
  }
}
try {
  if (window && window.localStorage) {
    localStorage.setItem('DEBUG', getBaseName() + '*')
  }
} catch(e) {}
// export it
export default getDebug;
