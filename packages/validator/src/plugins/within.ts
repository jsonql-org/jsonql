import { main as moreThan } from './more-than'
import { main as lessThan } from './less-than'

export const name = 'main'

export function main(value: number, max: number, min: number): boolean {
  return lessThan(value, max) && moreThan(value, min)
}
