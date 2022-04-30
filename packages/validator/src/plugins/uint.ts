

const name = "unit"

function main(value: number): boolean {
  return Number.isInteger(value) && value >= 0
}

export default {
  name,
  main, 
}
