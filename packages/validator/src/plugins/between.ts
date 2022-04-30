// between
import moreThanEqual from './more-than-equal'
import lessThanEqual from './less-than-equal'

const name = 'between'

function main(value: number, max: number, min: number): boolean {
  return lessThanEqual.main(value, max) && moreThanEqual.main(value, min)
}

// so when we register it, we know what param we should expect
export default {
  main,
  name,
  params: ['max', 'min']
}
