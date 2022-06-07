import { GeneralException } from '../../src'

/**
 * Throw a generic error here
 */
export default function() {
  throw new GeneralException('this is a message')
}
