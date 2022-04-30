// this will focus on testing the built in plugin
// and develop the different features around it
import test from 'ava'

import { ValidatorFactory } from '../src'
import { context } from './fixtures/resolver/export-ast'

test(`Testing the JsonqlObjectValidateInput with built-in plugins`, async t => {
  t.plan(1)

  const validateObj1 = new ValidatorFactory(context.funcAstInput.resolver)

  validateObj1.createSchema({
    email: { plugin: 'email' }
  })

  return validateObj1.validate(['some@email.com', 65])
              .then(result => {
                console.log(result)
                t.truthy(result)
              })

})

test.todo(`Testing the JsonqlArrayValidateInput with built-in plugins`
/*, async t => {

}*/)
