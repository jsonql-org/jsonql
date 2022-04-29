// between
import moreThanEqual from './more-than-equal'
import lessThanEqual from './less-than-equal'

export const name = 'between'

export default function main(value: number, max: number, min: number): boolean {
  return lessThanEqual(value, max) && moreThanEqual(value, min)
}
