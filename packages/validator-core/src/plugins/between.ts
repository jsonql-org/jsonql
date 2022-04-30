// between
import moreThan from './more-than'
import lessThan from './less-than'

const name = 'between'

function main(max: number, min: number, value: number): boolean {
  return lessThan.main(max, value) && moreThan.main(min, value)
}

// so when we register it, we know what param we should expect
export default {
  main,
  name,
  params: ['max', 'min']
}
