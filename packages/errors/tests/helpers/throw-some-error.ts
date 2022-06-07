// just throw some error from within
import { GeneralException } from '../../src'

function base() {
  return Promise.resolve(123)
}

export default async function throwSomeError() {

  return base()
    .then(num => {
      throw new GeneralException('Just throw it', num)
    })
}
