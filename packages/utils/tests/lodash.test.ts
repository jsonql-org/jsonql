import test from 'ava'

import { isEqual } from '../src/lodash'


test(`Testing the lodash isEqual method`, t => {

  const obj1 = { plugin: 'lowerThan', num: 20, name: 'arg1'}
  const obj2 = { plugin: 'lowerThan', num: 20, name: 'arg1'}

  t.true(isEqual(obj1, obj2))

})

test(`Testing the lodash isEqual method with extra array prop`, t => {

  const obj3 = { plugin: 'lowerThan', num: 20, name: 'arg1', rules: ['a']}
  const obj4 = { plugin: 'lowerThan', num: 20, name: 'arg1', rules: ['a']}

  t.true(isEqual(obj3, obj4))

})

test(`Testing the lodash isEqual method with different array prop`, t => {

  const obj3 = { plugin: 'lowerThan', num: 20, name: 'arg1', rules: ['a']}
  const obj4 = { plugin: 'lowerThan', num: 20, name: 'arg1', rules: ['b']}

  t.false(isEqual(obj3, obj4))

})
