
const name = 'moreThanEqual'

function main(arg: number, value: number): boolean {
  return value >= arg
}

export default {
  name,
  main,
  params: ['arg']
}
