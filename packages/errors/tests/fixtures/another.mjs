import { JsonqlError } from '../../src/index.mjs'

/**
 * Throw a generic error here
 */
export default function() {
  throw new JsonqlError('this is a message')
}
