

export function len(value: number | string): number {
  return typeof value === 'string' ? value.length : value
}
