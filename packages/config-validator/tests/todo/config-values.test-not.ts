// testing different config check methods

import test from  'ava'

import {
  mapAliasConfigKeys,
  preservePristineValues,
  // sprocessConfigAction,
  prepareArgsForValidation,
  runValidation
} from  './fixtures/utils'
import { validateSync } from  '../src'

import { appProps } from  './fixtures/default-options'
import debugFn from 'debug'
const debug = debugFn('jsonql-params-validator:test:config-values')

// props for testing
const value = 'some value'
let configValues = {otherName: value, enableTimeout: true, keyDontExist: 'whatever', useLocalstorage: false}

test('It should able to just map the alias values', t => {

  let result = mapAliasConfigKeys(configValues, appProps)

  t.is(result.aliasProp, value)
  t.is(result.keyDontExist, 'whatever')
})

test('It should able to take the pristine value out', t => {

  const result1 = preservePristineValues(configValues, appProps)

  t.truthy(result1.pristineValues)
  t.truthy(result1.checkAgainstAppProps)

  t.falsy(result1.keyDontExist)
})

test('It should able to return the correct mapped key and check the authentication', t => {

  let result2 = prepareArgsForValidation(configValues, appProps)

  // debug('result2', result2)

  t.true(result2.length === 2)

  let finalResult = runValidation(result2, validateSync)

  debug(finalResult)

  t.is(finalResult.aliasProp, value)
})

test('It should able to throw error for wrong value for an alias', t => {
  const key = 'enableTimeout'
  const fn = () => {
    const wrongValues = Object.assign(configValues, {[key]: 123456})
    let r3 = prepareArgsForValidation(wrongValues, appProps)
    return runValidation(r3, validateSync)
  }

  const error = t.throws(() => {
    fn()
  }, null, 'It should throw error if we pass the wrong value')

  t.is(error.message, key)

})
