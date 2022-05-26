// this will focus on testing the built in plugin
// and develop the different features around it
import test from 'ava'

import { Validator, ValidatorPlugins } from '../src'
import { context } from './fixtures/resolver/export-ast'

import { JsonqlValidationError } from '@jsonql/errors'

const pluginInstance = new ValidatorPlugins(1)
const expectedLoginResult = {username: 'John', password: '123456'}
const loginValues = [expectedLoginResult.username, expectedLoginResult.password]

test(`Testing the user define custom plugin`, async t => {
  t.plan(1)
  const validateObj = new Validator(context.funcAstInput.resolver, pluginInstance)
  validateObj.registerPlugin('notEqual', {
    main: (argx: number, value: number) => argx !== value,
    params: ['argx']
  })
  validateObj.addValidationRules({
    age: { plugin: 'notEqual', argx: 50}
  })

  return validateObj.validate(['some@email.com', 51])
            .then(result => {
              t.deepEqual(result, ['some@email.com', 51, false])
            })
})

test('Testing the JsonqlObjectValidateInput with built-in plugins', async t => {
    t.plan(1)
    const validateObj1 = new Validator(context.funcAstInput.resolver, pluginInstance)

    validateObj1.addValidationRules({
      email: { plugin: 'email' },
      age: { plugin: 'moreThan', num: 50}
    })
    const inputValues = ['some@email.com', 65, true]
    return validateObj1.validate(inputValues)
              .then(result => {
                t.deepEqual(result, inputValues)
              })
})

test(`Testing the JsonqlObjectValidateInput with built-in plugins that is mis-config`,async t => {
  t.plan(1)
  // when using throwsAsync it won't work
  /// @TODO need to test it without the t.throws and see if the catch actually catch the error
  t.throws(() => {
    const validateObj1 = new Validator(context.funcAstInput.resolver, pluginInstance)
    validateObj1.addValidationRules({
      email: { plugin: 'email' },
      age: { plugin: 'moreThan', min: 50}
    })
    return validateObj1.validate(['some@email.com', 65])
              .then(result => {
                console.log(result)
              })
  })
})

test.only(`Testing the JsonqlArrayValidateInput with built-in plugins` , async t => {
  t.plan(1)
  const validateObj2 = new Validator(context.funcAstInput.resolver, pluginInstance)
  validateObj2.addValidationRules({
    email: [
      {plugin: 'email'},
      {plugin: 'moreThan', num: 5}
    ]
  })

  return validateObj2.validate(['something@email.com', 51])
                .then(result => {
                  // console.log(result)
                  t.truthy(result)
                })
})

test.skip(`Test again with the automatic rule generated return result`, async t => {
  t.plan(1)
  const validateObj4 = new Validator(context.funcAInput.login, pluginInstance)

  return validateObj4.validate(loginValues)
                    .then(result => {
                      t.deepEqual(result, loginValues)
                    })
})

test.skip(`Testing the plugin with a test case from the velocejs which causing problem (Array input)`, async t => {
  t.plan(1)
  const validateObj3 = new Validator(context.funcAInput.login, pluginInstance)
  validateObj3.addValidationRules({
    username: [
      {plugin: 'lessThan', num: 10},
      {plugin: 'moreThan', num: 5}
    ]}
  )
  return validateObj3.validate(loginValues)
                  .then(result => {
                    t.deepEqual(result, loginValues)
                  })
                  .catch((error: JsonqlValidationError) => {
                    t.deepEqual(error.detail, [0,2])
                  })
})
