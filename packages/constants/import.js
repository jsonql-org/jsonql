
/**
 * Ported from jsonql-resolver
 * Try to use the esm module to require the module directly
 * @param {string} pathToResolver path to resolver from contract
 * @return {*} resolver function on success
 */
function requireEsModule(pathToResolver) {
  let oldRequire
  try {
    oldRequire = require
    require = require("esm")(module/*, options*/)
    const obj = require(pathToResolver)
    // console.error('requireEsModule', obj)
    if ((typeof obj === 'function' || typeof obj === 'object') && !obj.default)  {
      return obj
    } else if (obj.default && (typeof obj.default === 'object' || typeof obj.default === 'function')) {
      return obj.default
    } 
    console.error('ERROR', typeof obj, typeof obj.default, obj)
    throw new Error(`Unable to import ES module!`)
  } catch (e) {
    throw new Error(e)
  } finally {
    // reset the require here
    require = oldRequire
  }
}

module.exports = requireEsModule