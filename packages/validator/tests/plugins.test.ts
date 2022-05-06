// this will focus on testing the built in plugin
// and develop the different features around it
import test from 'ava'

import { ValidatorFactory } from '../src'
import { context } from './fixtures/resolver/export-ast'

const expectedLoginResult = {username: 'John', password: '123456'}
const loginValues = [expectedLoginResult.username, expectedLoginResult.password]

test.only(`Testing the user define custom plugin`, async t => {
  t.plan(1)
  const validateObj = new ValidatorFactory(context.funcAstInput.resolver)
  validateObj.registerPlugin('notEqual', {
    main: (argx: number, value: number) => argx !== value,
    params: ['argx']
  })
  validateObj.createSchema({
    age: { plugin: 'notEqual', argx: 50}
  })

  return validateObj.validate(['some@email', 51])
            .then(result => {
              t.deepEqual(result, {email: 'some@email', age: 51, arg3: false})
            })
})

test('Testing the JsonqlObjectValidateInput with built-in plugins', async t => {
    t.plan(1)
    const validateObj1 = new ValidatorFactory(context.funcAstInput.resolver)
    validateObj1.createSchema({
      email: { plugin: 'email' },
      age: { plugin: 'moreThan', num: 50}
    })
    return validateObj1.validate(['some@email.com', 65])
              .then(result => {
                console.log(result)
                t.truthy(result)
              })
})

test(`Testing the JsonqlObjectValidateInput with built-in plugins that is mis-config`,async t => {
  t.plan(1)
  // when using throwsAsync it won't work
  t.throws(() => {
    const validateObj1 = new ValidatorFactory(context.funcAstInput.resolver)
    validateObj1.createSchema({
      email: { plugin: 'email' },
      age: { plugin: 'moreThan', min: 50}
    })
    return validateObj1.validate(['some@email.com', 65])
              .then(result => {
                console.log(result)
                t.truthy(result)
              })
  })
})

test(`Testing the JsonqlArrayValidateInput with built-in plugins` , async t => {
  t.plan(1)
  const validateObj2 = new ValidatorFactory(context.funcAstInput.resolver)
  validateObj2.createSchema([
    {plugin: 'email'},
    {plugin: 'moreThan', num: 50},
  ])

  return validateObj2.validate(['something@email.com', 51])
                .then(result => {
                  console.log(result)
                  t.truthy(result)
                })
})

test(`Test again with the automatic rule generated return result`, async t => {
  t.plan(1)
  const validateObj4 = new ValidatorFactory(context.funcAInput.login)

  return validateObj4.validate(loginValues)
                    .then(result => {
                      t.deepEqual(result, expectedLoginResult)
                    })
})

test(`Testing the plugin with a test case from the velocejs which causing problem (Array input)`, async t => {
  t.plan(1)
  const validateObj3 = new ValidatorFactory(context.funcAInput.login)
  validateObj3.createSchema([
    {plugin: 'lessThan', num: 10},
    {plugin: 'moreThan', num: 5}
  ])
  return validateObj3.validate(loginValues)
                  .then(result => {
                    t.deepEqual(result, expectedLoginResult)
                  })
})

test(`Testing the plugin with a test case from the velocejs which causing problem (Object input)`, async t => {
  t.plan(1)
  const validateObj3 = new ValidatorFactory(context.funcAInput.login)
  validateObj3.createSchema({
    username: {plugin: 'lessThan', num: 10},
    password: {plugin: 'moreThan', num: 5}
  })
  return validateObj3.validate(loginValues)
                  .then(result => {
                    t.deepEqual(result, expectedLoginResult)
                  })
})
