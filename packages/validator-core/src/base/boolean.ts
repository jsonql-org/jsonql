// check for boolean
import { trueTypeOf } from '@jsonql/utils/dist/truetypeof'
/**
 * if something is a boolean
 */
export function checkBoolean(value: unknown): boolean {
  return trueTypeOf(value) === 'boolean'
}
