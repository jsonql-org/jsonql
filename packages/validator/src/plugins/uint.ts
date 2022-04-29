

export const name = "unit"

export function main(value: number): boolean {
  return Number.isInteger(value) && value >= 0
}
