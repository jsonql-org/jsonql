// validator numbers
// import { NUMBER_TYPES } from './constants';
import { isString, isNaN } from '../lib/lodash'

/**
 * @2015-05-04 found a problem if the value is a number like string
 * it will pass, so add a check if it's string before we pass to next
 */
export function checkNumber(value: number) {
  return isString(value) ? false : !isNaN( parseFloat(value + '') )
}

// Add more number type / value checking
export function checkInteger(value: any) {
  console.log(`@TODO checkInteger`, value)
}

export function checkFloat(value: any) {
  console.log(`@TODO checkFloat`, value)
}

export function checkUnsigned(value: any) {
  console.log(`@TODO check unsigned`, value)
}
