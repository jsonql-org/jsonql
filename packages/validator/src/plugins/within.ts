import moreThan from './more-than'
import lessThan from './less-than'

export const name = 'main'

export default function main(value: number, max: number, min: number): boolean {
  return lessThan(value, max) && moreThan(value, min)
}
