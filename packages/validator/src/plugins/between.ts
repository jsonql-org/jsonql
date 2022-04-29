// between
import { main as moreThanEqual } from './more-than-equal'
import { main as lessThanEqual } from './less-than-equal'

export const name = 'between'

export function main(value: number, max: number, min: number): boolean {
  return lessThanEqual(value, max) && moreThanEqual(value, min)
}
