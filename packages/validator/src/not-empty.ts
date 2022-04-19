import trim from 'lodash-es/trim'
import isArray from 'lodash-es/isArray'
/**
 * Check several parameter that there is something in the param
 * @param {*} param input
 * @return {boolean}
 */
 const isNotEmpty = a => {
  if (isArray(a)) {
    return true;
  }
  return a !== undefined && a !== null && trim(a) !== ''
}

export default isNotEmpty
