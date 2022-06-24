// validator numbers
// import { NUMBER_TYPES } from './constants';
import { trueTypeOf } from '@jsonql/utils/dist/truetypeof'
/**
 * @2015-05-04 found a problem if the value is a number like string
 * it will pass, so add a check if it's string before we pass to next
 */
export function checkNumber(value: number) {
  return trueTypeOf(value) !== 'number' ? false : !isNaN( parseFloat(value + '') )
}

// Add more number type / value checking
export function checkInteger(value: unknown) {
  console.log(`@TODO checkInteger`, value)
}

export function checkFloat(value: unknown) {
  console.log(`@TODO checkFloat`, value)
}

export function checkUnsigned(value: unknown) {
  console.log(`@TODO check unsigned`, value)
}
