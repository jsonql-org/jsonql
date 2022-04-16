const { JsonqlError } = require('../../dist/jsonql-errors.cjs');

/**
 * Throw a generic error here
 */
module.exports = function() {
  throw new JsonqlError('this is a message');
}
