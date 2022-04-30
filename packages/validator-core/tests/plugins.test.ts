import test from 'ava'

import { curry } from '@jsonql/utils'
import { plugins } from '../src'

test(`test the plugins with curry`, t => {

  const between = plugins[0].main
  const lessThan = plugins[4].main

  console.log(between.toString())

  t.true(between(100, 10, 50))

  const betweenFn = curry(between)(100, 10)
  const lessThanFn = curry(lessThan)(50)

  console.log(between.toString())

  t.true(betweenFn(50))
  t.false(betweenFn(200))

  t.true(lessThanFn(10))
  t.false(lessThanFn(51))

})
