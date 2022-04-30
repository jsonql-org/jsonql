// this will focus on testing the built in plugin
// and develop the different features around it
import test from 'ava'

import { ValidatorFactory } from '../src'
import { context } from './fixtures/resolver/export-ast'

test(`Testing the JsonqlObjectValidateInput with built-in plugins`, async t => {

  const validateObj1 = new ValidatorFactory(context.funcAstInput)

  


})

test.todo(`Testing the JsonqlArrayValidateInput with built-in plugins`
/*, async t => {

}*/)
