// check for boolean

/**
 * if something is a boolean
 */
export function checkBoolean(value: unknown): boolean {
  return value !== null && value !== undefined && typeof value === 'boolean'
}
