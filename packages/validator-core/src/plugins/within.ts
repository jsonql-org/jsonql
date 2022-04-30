

import moreThanEqual from './more-than-equal'
import lessThanEqual from './less-than-equal'

const name = 'main'

function main(max: number, min: number, value: number): boolean {
  return lessThanEqual.main(max, value) && moreThanEqual.main(min, value)
}

export default {
  name,
  main,
  params: ['max', 'min']
}
