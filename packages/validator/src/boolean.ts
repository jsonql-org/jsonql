// check for boolean

/**
 * @param {boolean} value expected
 * @return {boolean} true if OK
 */
const checkIsBoolean = function(value) {
  return value !== null && value !== undefined && typeof value === 'boolean'
}

export default checkIsBoolean
