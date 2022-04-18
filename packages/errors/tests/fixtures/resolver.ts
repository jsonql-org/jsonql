
import { JsonqlResolverAppError } from '../../src'

export default function() {
  throw new JsonqlResolverAppError('Dummy', {'data': "something"})
}
