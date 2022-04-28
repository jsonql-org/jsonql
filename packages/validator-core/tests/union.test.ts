// move the union test out because we need to further develop this
import test from  'ava'
import {
  checkUnion,
} from  '../src'

test(`Testing the union type check`, async t => {
  t.plan(1)
  return checkUnion(1, ['number', 'string'])
    .then(result => {
      t.true(result)
      // console.log('result', result)
    })
})

test(`Throw wrong data to expect to fail`, async t => {
  t.plan(1)

  return checkUnion(false, ['number', 'string'])
            .catch((type: string) => {
              console.log('failed type', type)
              t.truthy(type)
            })
})
