// test for float
import { checkFloat } from '../base/number'

export const name = 'float'

function main(value: number): boolean {
  return checkFloat(value)
}

export default {
  name,
  main,
}
