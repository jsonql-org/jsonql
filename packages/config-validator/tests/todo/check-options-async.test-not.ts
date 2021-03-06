// check the options
import test from 'ava'
import {
  JsonqlTypeError,
  JsonqlEnumError,
  JsonqlCheckerError
} from '@jsonql/errors'
import { checkOptionsAsync } from '../src'
import { appProps, constProps } from './fixtures/default-options'
const hostname = 'https://some-where-else.com'

const dummyCallback = (...args: any[]) => {
  console.log('dummy callback', args)
  return args
}

// const debug = require('debug')('jsonql-params-validator:check-options-async')
// @NOTE strange behavior this one can use cb but not the other other two???
// is it because of the plan is greater than 1?
test('It should able to filter out the non default options', async t => {
  let config = {
    hostname,
    someSillyOption: 'should-not-be-here'
  }
  // t.plan(2);
  checkOptionsAsync(config, appProps, constProps, dummyCallback)
    .then(result => {
      t.true( result.someSillyOption === undefined)
      t.true( result.hostname === hostname)
      // t.end();
    })
})

test('It should throw error in the catch phrase if the property is in the wrong type', async t => {
  let key = 'jsonqlPath';
  let config = {[key]: 1234};
  checkOptionsAsync(config, appProps, constProps, dummyCallback).catch(error => {
    // debug('--- error ---', error);
    t.true(error instanceof JsonqlTypeError)
    t.is(error.message, key)
  })
})

test('It should preseved the propperty if its mark as optional', async t => {
  let key = 'optionalProp';
  let config = {[key]: null};
  checkOptionsAsync(config, appProps, constProps, dummyCallback).then(result => {
    t.true( result[key] === config[key] )
  })
})

test("It should able to check against the enum map value and throw the custom error", async t => {
  let key = 'enumProp';
  let config = {[key]: 5};
  checkOptionsAsync(config, appProps, constProps, dummyCallback).catch(error => {
    t.true(error instanceof JsonqlEnumError)
    t.is(error.message, key)
  })
})

test("It should able to handle the checker error from within the validator", async t => {
  let key = 'checkerProp';
  let config = {[key] : 'this-is-the-wrong-key', 'hostname': 'https://localhost:8899'};
  checkOptionsAsync(config, appProps, constProps, dummyCallback).catch(error => {
    t.true(error instanceof JsonqlCheckerError)
    t.is(error.message, key)
  })

})
