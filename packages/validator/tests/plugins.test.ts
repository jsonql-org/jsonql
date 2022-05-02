// this will focus on testing the built in plugin
// and develop the different features around it
import test from 'ava'

import { ValidatorFactory } from '../src'
import { context } from './fixtures/resolver/export-ast'

test(`Testing the user define custom plugin`, async t => {
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
              t.truthy(result)
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
                t.truthy(result)
              })
})

test(`Testing the JsonqlObjectValidateInput with built-in plugins that is mis-config`,async t => {
  t.plan(1)
  t.throws(() => {
    const validateObj1 = new ValidatorFactory(context.funcAstInput.resolver)
    validateObj1.createSchema({
      email: { plugin: 'email' },
      age: { plugin: 'moreThan', min: 50}
    })
    return validateObj1.validate(['some@email.com', 65])
              .then(result => {
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
                  // console.log(result)
                  t.truthy(result)
                })
})
