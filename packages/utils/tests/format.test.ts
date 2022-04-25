// testing the regex functions
import test from 'ava'

import { formatString, formatStr } from '../src'

test(`formatString formatStr should work as expected`, t => {

  const txt = 'Something wrong with the arg {0} on pos {1}'
  const expected = 'Something wrong with the arg something on pos 1'
  const result1 = formatString(txt, 'something', 1)

  t.is(result1, expected)

  const fn = formatStr(txt)

  t.true(typeof fn === 'function')

  const result2 = fn('something', 1)

  t.is(result2, expected)
})
