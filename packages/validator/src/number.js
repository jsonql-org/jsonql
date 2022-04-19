// validator numbers
// import { NUMBER_TYPES } from './constants';

import isNaN from 'lodash-es/isNaN'
import isString from 'lodash-es/isString'
/**
 * @2015-05-04 found a problem if the value is a number like string
 * it will pass, so add a chck if it's string before we pass to next
 * @param {number} value expected value
 * @return {boolean} true if OK
 */
const checkIsNumber = function(value) {
  return isString(value) ? false : !isNaN( parseFloat(value) )
}

export default checkIsNumber
