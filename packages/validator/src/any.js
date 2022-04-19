// validate any thing only check if there is something

import trim from 'lodash-es/trim'

/**
 * @param {*} value the value
 * @param {boolean} [checkNull=true] strict check if there is null value
 * @return {boolean} true is OK
 */
const checkIsAny = function(value, checkNull = true) {
  if (value !== undefined && value !== '' && trim(value) !== '') {
    if (checkNull === false || (checkNull === true && value !== null)) {
      return true;
    }
  }
  return false;
}

export default checkIsAny
