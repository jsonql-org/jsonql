
import { JsonqlResolverAppError } from '../../src/index.mjs'

export default function() {
  throw new JsonqlResolverAppError('Dummy', {'data': "something"})
}
