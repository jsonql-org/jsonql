// validator numbers
// import { NUMBER_TYPES } from './constants';
import { trueTypeOf } from '@jsonql/utils/dist/truetypeof'
const expected = 'number'
/**
 * Historical library
 * @2015-05-04 found a problem if the value is a number like string
 * it will pass, so add a check if it's string before we pass to next
 * @2022 completely rewritten from ground up
 */
export function checkNumber(value: number) {
  return trueTypeOf(value) !== expected ? false : !isNaN(parseFloat(value + ''))
}

// Add more number type / value checking
export function checkInteger(value: unknown) {
  return trueTypeOf(value) === expected && Number.isInteger(value as number)
}

export function checkFloat(value: unknown) {
  return trueTypeOf(value) === expected
    && !isNaN(value as number)
    && !Number.isInteger(value as number)
}

export function checkUnsigned(value: unknown) {
  return checkInteger(value) && (value as number) >= 0
}
