// test for integer
import { checkInteger } from '../base/number'

export const name = 'int'

function main(value: number): boolean {
  return checkInteger(value)
}

export default {
  name,
  main,
}
