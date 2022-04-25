// check the options


import { checkConfig } from '../src'
import { appProps, constProps } from './fixtures/default-options'

import test from 'ava'
/*
import {
  JsonqlTypeError,
  JsonqlEnumError,
  JsonqlCheckerError
} from '@jsonql/errors'
*/

const hostname = 'https://some-where-else.com';
// const debug = require('debug')('jsonql-params-validator:check-options')


test('It should able to filter out the non default options', async t => {
  let config = {
    hostname,
    someSillyOption: 'should-not-be-here'
  }

  const result = checkConfig(config, appProps, constProps)

  t.falsy( result.someSillyOption )
  t.is( result.hostname, hostname )

  // debug(result)

})

test('It should preseved the property if its mark as optional', async t => {
  let key = 'optionalProp';

  let config = {[key]: null};
  let result = checkConfig(config, appProps, constProps)
  // @TODO this might be wrong though ...
  t.is( result[key], '' , 'It should not have change the default value because it pass an empty value')

  let value1 = 1;
  let config1 = {[key]: value1};
  let result1 = checkConfig(config1, appProps, constProps)

  t.is( result1[key], value1, 'It should allow to pass NUMBER_TYPE')

  let value2 = 'two';
  let config2 = {[key]: value2};
  let result2 = checkConfig(config2, appProps, constProps)

  t.is(result2[key], value2, 'It should also allow a STRING_TYPE')

})

// throw

test('It should throw error in the catch phrase if the property is in the wrong type', async t => {
  let key = 'jsonqlPath';
  let config = {[key]: 1234};

  let error = t.throws( () => {
    checkConfig(config, appProps, constProps)
  } , null/* JsonqlTypeError */, 'should throw a JsonqlTypeError')

  t.is(error.message, key)

  t.is(error.className, 'JsonqlTypeError')

})

test("It should able to check against the enum map value and throw the custom error", async t => {
  let key = 'enumProp';
  let config = {[key]: 5};

  let error = t.throws( () => {
    checkConfig(config, appProps, constProps)
  }, /*JsonqlEnumError*/ null , 'should throw a JsonqlEnumError')

  t.is(error.message, key)
  t.is(error.className, 'JsonqlEnumError')
})


test("It should able to handle the checker error from within the validator", async t => {
  let key = 'checkerProp';
  let config = {[key] : 'this-is-the-wrong-key'};

  let error = t.throws(() => {
    checkConfig(config, appProps, constProps)
  }, /*JsonqlCheckerError*/ null, 'should throw a JsonqlCheckerError')

  t.is(error.message, key)
  t.is(error.className, 'JsonqlCheckerError')
})
