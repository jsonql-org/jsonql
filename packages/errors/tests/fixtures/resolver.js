
const { JsonqlResolverAppError } = require('../../dist/jsonql-errors.cjs');

module.exports = function() {
  throw new JsonqlResolverAppError('Dummy', {'data': "something"});
}
