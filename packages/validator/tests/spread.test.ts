// testing the spread input and output
import test from 'ava'

import { Validator } from '../src'
import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'

const file1 = join(__dirname, 'fixtures', 'resolver', 'spread-function.json')
const file2 = join(__dirname, 'fixtures', 'resolver', 'mix-spread-fn.json')

let obj1: Validator
let obj2: Validator

test.before(() => {
  const json1 = readJsonSync(file1)
  obj1 = new Validator(json1.spread)

  const json2 = readJsonSync(file2)
  obj2 = new Validator(json2.mixSpread)
})

test(`Testing with the spread argument function first`,  async t => {
  t.plan(1)
  const params = ['a', '1', 'c']
  return obj1.validate(params)
            .then((result: any) => {
              // console.log('success', result)
              t.deepEqual(result, params)
            })
})

test(`Should able to get back the spread values with the name key with prepareArgValues`, t => {

  const result = obj1.prepareArgValues(['b','2', 'd'])
  t.deepEqual(result, {args: ['b','2','d']})
})


test(`Test a function with normal argument with spread argument`, async t => {
  t.plan(1)
  return obj2.validate([100, 'a', 'b', 'c'])
            .then(result => {
              t.truthy(result)
            })
})

test(`Test a function with spread argument and return as object result`, async t => {
  t.plan(1)
  return obj2.validate([100, 'a', 'b', 'c'], 'object')
            .then(result => {
              t.truthy(result)
            })
})

test(`Should able to get values back with mix spread style function with prepareArgValues`, t => {

  const result2 = obj2.prepareArgValues([200, 'd', 'e', 'f'])

  // console.log('spread result', result2)

  // t.pass()
  t.is(result2.arg1, 200)
  t.deepEqual(result2.arg2, ['d', 'e', 'f'])
})
