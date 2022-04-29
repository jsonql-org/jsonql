

export const name = "unit"

export default function main(value: number): boolean {
  return Number.isInteger(value) && value >= 0
}
