// use this to test out the individual functions exports

const test = require('ava')

const {
  JsonqlAuthorisationError,
  JsonqlContractAuthError,
  JsonqlResolverAppError,
  JsonqlResolverNotFoundError,
  getErrorNameByInstance
} = require('../index')


test(`It should able to grab the error and return its name`, t => {
  try {
    throw new JsonqlResolverAppError(`This is the error!`)
  } catch(e) {
    const result = getErrorNameByInstance([
      JsonqlAuthorisationError,
      JsonqlContractAuthError,
      JsonqlResolverAppError,
      JsonqlResolverNotFoundError
    ], e)
    t.is(result, 'JsonqlResolverAppError')
  }
})
