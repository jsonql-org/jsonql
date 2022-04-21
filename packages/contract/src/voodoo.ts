
/** Voodoo magic */
export function magic(search?: string) {
  let stacks = new Error().stack?.split('\n')

  console.log(stacks)

  stacks = search ? stacks.filter(line => line.indexOf(search) > -1) : stacks
  const where = stacks ? stacks[stacks.length - 1].split('(')[1].split(':')[0] : ''

return where
}
