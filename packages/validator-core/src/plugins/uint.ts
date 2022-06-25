import { checkUnsigned } from '../base/number'

const name = "unit"

function main(value: number): boolean {
  return checkUnsigned(value)
}

export default {
  name,
  main,
}
