// just to throw a few and test them out
import test from 'ava'
import {
  JsonqlResolverAppError,
  JsonqlResolverNotFoundError,
  JsonqlError,
  finalCatch
} from '../src'

import resolver from './fixtures/resolver'

// import debug from 'debug'
import justThrow from './helpers/throw-some-error'

// const debugFn = debug('jsonql-errors:test:main')


const isObjectHasKey = (obj: any, key: string) => {
  const keys = Object.keys(obj)
  return !!keys.filter(k => key === k).length
}


test('Just need to test this isObjectHasKey function', t => {
  let obj = {error: false};
  t.is(true, isObjectHasKey(obj, 'error'))
})


test('It should throw a resolver application error', t => {

  const error: JsonqlResolverAppError = t.throws( () => {
    return resolver()
  } , undefined , 'Throw a dummy error')

  t.is('JsonqlResolverAppError', error.className)
  t.is(error.className, 'JsonqlResolverAppError')
  t.true(typeof error.detail === 'object')
  t.is(error.message, 'Dummy')
})

test('It should throw a JsonqlResolverNotFoundError with the wrong name', t => {
  const name = 'wrongName'
  const fn = () => {
    try {
      const contract = {query: {whatever: {public: true}}}
      const type = 'queryx'
      return contract[type][name]
    } catch(e) {
      throw new JsonqlResolverNotFoundError(name, e)
    }
  }
  const error: JsonqlResolverNotFoundError = t.throws(() => {
    fn()
  }, undefined, 'It should throw a JsonqlResolverNotFoundError')

  // t.is(error.where, 'node')

  t.is('JsonqlResolverNotFoundError', error.className)

  t.is(error.message, name)
})

test("Very dummy test to test the test Error instance", async t => {

  let error: JsonqlError = await t.throwsAsync(async () => {
    return await justThrow().catch(finalCatch)
  }, undefined , 'just throw a JsonqlError')

  t.is('JsonqlError', error.className)

})
