import test from 'ava'

import { curry } from '@jsonql/utils'
import {
  plugins,
  curryPlugin,
} from '../dist'

test(`Test with our custom plugin defintion`, t => {

  const config = {
    name: 'notTheSame',
    main: (arg1: number, value: number) => arg1 !== value,
    params: ['arg1']
  }

  const input = {
    plugin: 'notTheSame',
    arg1: 100
  }
  const notTheSame = curryPlugin(input, config)
  t.true(notTheSame(101))
  t.false(notTheSame(100))
})

test.only(`Provide wrong data and expect the curryPlugin to throw`, t => {
  const config = {
    name: 'notTheSame',
    main: (arg1: number, value: number) => arg1 !== value,
    params: ['arg1']
  }
  const input = {
    plugin: 'notTheSame',
    max: 100
  }
  t.throws(() => curryPlugin(input, config))
})

test(`Just testing the email plugin`, t => {
  const email1 = 'some@email.com'
  const email2 = 'something#isnothgemail.com'

  const fn = plugins[1].main

  const result1 = Reflect.apply(fn, null , [email1])
  const result2 = Reflect.apply(fn, null, [email2])

  t.true(result1)
  t.false(result2)
})

test(`test the plugins with curry`, t => {

  const between = plugins[0].main
  const lessThan = plugins[4].main

  const betweenFn = curry(between)(10, 1)
  const lessThanFn = curry(lessThan)(50)

  t.true(betweenFn(5))
  t.false(betweenFn(20))
  // also test the string vesion
  t.true(betweenFn('fox'))
  t.false(betweenFn('jumping fox over the fence'))

  t.true(lessThanFn(10))
  t.false(lessThanFn(51))
})
