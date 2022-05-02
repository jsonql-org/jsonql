import { len } from '../lib/len'

const name = 'moreThan'

function main(
  num: number,
  value: number | string
): boolean {

  return len(value) > num
}

export default {
  name,
  main,
  params: ['num']
}
