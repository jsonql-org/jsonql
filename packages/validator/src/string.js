// validate string type
import trim from 'lodash-es/trim'
import isString from 'lodash-es/isString'
/**
 * @param {string} value expected value
 * @return {boolean} true if OK
 */
const checkIsString = function(value) {
  return (trim(value) !== '') ? isString(value) : false
}

export default checkIsString
