import test from 'ava'

import { ValidatorFactory } from '../dist'
import { context } from './fixtures/resolver/export-ast'

test(`Testing custom rules to validate`, async t => {
  t.plan(1)
  const obj = new ValidatorFactory(context.funcAstInput.resolver)

  obj.createSchema({
    age: {
      validate: (value: number) => value >= 18
    }
  })

  return obj.validate(['john@email.com', 19, true])
        .then(result => {
          t.deepEqual(result, {email: 'john@email.com', age: 19, arg3: true})
        })
})
