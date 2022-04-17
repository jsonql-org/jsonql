// use this to test out the individual functions exports
import test from 'ava'
import {
  JsonqlAuthorisationError,
  JsonqlContractAuthError,
  JsonqlResolverAppError,
  JsonqlResolverNotFoundError,
  getErrorNameByInstance
} from '../src/index.mjs'


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
