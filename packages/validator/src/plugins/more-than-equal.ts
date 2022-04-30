
const name = 'moreThanEqual'

function main(value: number, arg: number): boolean {
  return value >= arg
}

export default {
  name,
  main,
  params: ['arg']
}
