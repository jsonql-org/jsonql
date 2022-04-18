// just throw some error from within
import { JsonqlError } from '../../src/index.mjs'

function base() {
  return Promise.resolve(123)
}

export default function() {

  return base()
    .then(num => {
      throw new JsonqlError('Just throw it', num)
    })
}
