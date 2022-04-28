// move the union test out because we need to further develop this
import test from  'ava'
import {
  checkUnion,
} from  '../dist'

test(`Testing the union type check`, async t => {
  t.plan(1)
  return checkUnion(1, ['number', 'string'])
    .then(result => {
      t.true(result)
      // console.log('result', result)
    })
    /*
    .catch(err => {
      // console.log('err', err)
    })
    .finally(() => {
      t.pass()
    })
    */
})
