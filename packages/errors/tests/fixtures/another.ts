import { JsonqlError } from '../../src'

/**
 * Throw a generic error here
 */
export default function() {
  throw new JsonqlError('this is a message')
}
