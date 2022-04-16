// use this to test out the individual functions exports
import test from 'ava'
import {
  JsonqlAuthorisationError,
  JsonqlContractAuthError,
  JsonqlResolverAppError,
  JsonqlResolverNotFoundError,
} from '../src/index.mjs'
import {
  getErrorNameByInstance
} from '../src/get-error-name-by-instance.mjs'


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
