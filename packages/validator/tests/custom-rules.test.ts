import test from 'ava'

import { ValidatorFactory } from '../dist'
import { context } from './fixtures/resolver/export-ast'

test(`Testing custom rules to validate`, async t => {
  t.plan(1)
  const obj = new ValidatorFactory(context.funcAstInput.resolver)

  obj.addValidationRules({
    age: {
      validate: (value: number) => value >= 18
    }
  })
  const inputValues = ['john@email.com', 19, true]
  return obj.validate(inputValues)
        .then(result => {
          t.deepEqual(result, inputValues)
        })
})
