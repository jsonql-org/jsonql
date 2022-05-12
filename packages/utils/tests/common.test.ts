// combine test for many small functions
import test from 'ava'
import {
  isNaN,
  strToNum,
  strToBool,

} from '../src'


test(`Test how the isNaN works first`, t => {
  const input = '100'
  t.false(isNaN(input))
  const input1 = parseFloat('ab20')
  t.true(isNaN(input1))
})
