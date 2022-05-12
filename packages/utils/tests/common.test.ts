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

test(`Should able to convert some of the props to number`, t => {

  const parts = 'a.1.b'.split('.').map((p: string) => strToNum(p))
  t.is(parts[0], 'a')
  t.is(parts[1], 1)
})

test(`Should able to conert string to boolean`, t => {

  t.true(strToBool('True'))
  t.false(strToBool('FALSE'))
})
