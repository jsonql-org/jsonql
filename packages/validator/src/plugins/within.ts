import moreThan from './more-than'
import lessThan from './less-than'

const name = 'main'

function main(value: number, max: number, min: number): boolean {
  return lessThan.main(value, max) && moreThan.main(value, min)
}

export default {
  name,
  main,
  params: ['max', 'min']
}
