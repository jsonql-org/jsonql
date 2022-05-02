// testing the regex functions
import test from 'ava'

import { formatStr } from '../src'

test(`formatString formatStr should work as expected`, t => {

  const txt = 'Something wrong with the arg {0} on pos {1}'
  const expected = 'Something wrong with the arg something on pos 1'
  const result1 = formatStr(txt, 'something', 1)

  t.is(result1, expected)
})
