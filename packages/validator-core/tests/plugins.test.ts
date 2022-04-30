import test from 'ava'

import { curry } from '@jsonql/utils'
import { plugins, curryPlugin } from '../src'

test(`test the plugins with curry`, t => {

  const between = plugins[0].main
  const lessThan = plugins[4].main

  const betweenFn = curry(between)(100, 10)
  const lessThanFn = curry(lessThan)(50)

  t.true(betweenFn(50))
  t.false(betweenFn(200))

  t.true(lessThanFn(10))
  t.false(lessThanFn(51))
})

test(`Test a plugin that can not be curry`, t => {
  const plugin = 'email'
  t.throws(
    () => curryPlugin({ plugin }),
    undefined,
    `This plugin ${plugin} can not be curry`
  )
})


test(`Test the curryPlugin`, t => {

  const curryFn = curryPlugin({plugin: 'between', max: 100, min: 10})

  t.true(curryFn(50))
  t.false(curryFn(101))
  t.false(curryFn(9))
})
