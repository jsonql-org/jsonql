// just throw some error from within
const { JsonqlError } = require('../../dist/jsonql-errors.cjs');

const base = function() {
  return Promise.resolve(123);
}

module.exports = function() {
  return base()
    .then(num => {
      throw new JsonqlError('Just throw it', num);
    })
}
