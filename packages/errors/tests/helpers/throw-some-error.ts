// just throw some error from within
import { JsonqlError } from '../../src'

function base() {
  return Promise.resolve(123)
}

export default async function throwSomeError() {

  return base()
    .then(num => {
      throw new JsonqlError('Just throw it', num)
    })
}
