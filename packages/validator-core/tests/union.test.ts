// move the union test out because we need to further develop this
import test from  'ava'
import {
  checkUnion,
  checkUnionSync
} from  '../dist'

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
            .then(() => {
              console.log(`should not see me here`)
            })
            .catch((type: string) => {
              // console.log('failed type', type)
              t.is(type, 'string', 'Failed Type is String')
            })
})

test(`Test the checkUnionSync`, t => {
  const types = ['number', 'string']

  const result1 = checkUnionSync(1, types)

  t.true(result1)

  const result2 = checkUnionSync(false, types)

  t.false(result2)

})
