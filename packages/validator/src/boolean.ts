// check for boolean

/**
 * if something is a boolean
 */
export default function checkIsBoolean(value: any): boolean {
  return value !== null && value !== undefined && typeof value === 'boolean'
}
