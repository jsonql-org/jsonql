// need to test the promisify results
// due to their strange behavior in our use case
import test from 'ava'
import {
  checkNumber,
  promisify,
  reversePromisifyResult
} from '../src'

test(`Using checkNumber with promisify`, async t => {

  t.plan(1)
  const pCheckNumber = promisify(checkNumber)

  return pCheckNumber(false)
          .then(() => {
            console.log(`Should not see me!`)
          })
          .catch((result: boolean) => {
            t.false(result)
          })
})

test(`Using checkNumber with reversePromisifyResult`, async t => {

  t.plan(1)
  const pCheckNumber1 = reversePromisifyResult(checkNumber)

  return pCheckNumber1(1)
          .catch((result: boolean) => {
            t.true(result)
          })
})
