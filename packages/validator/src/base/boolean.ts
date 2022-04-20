// check for boolean

/**
 * if something is a boolean
 */
export function checkBoolean(value: any): boolean {
  return value !== null && value !== undefined && typeof value === 'boolean'
}
