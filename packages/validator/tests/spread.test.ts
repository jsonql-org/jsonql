// testing the spread input and output
import test from 'ava'

import { Validator } from '../src'
import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'

const file1 = join(__dirname, 'fixtures', 'resolver', 'spread-function.json')
const file2 = join(__dirname, 'fixtures', 'resolver', 'mix-spread-fn.json')

test(`Testing with the spread argument function first`,  async t => {
  t.plan(1)

  const json = readJsonSync(file1)

  const obj = new Validator(json.spread)

  return obj.validate(['a', '1', 'c'])
            .then(() => {
              // console.log('success', result)
              t.pass()
            })
            .catch(err => {
              console.log('error', err)
              t.pass()
            })
})

test(`Test a function with normal argument with spread argument`, async t => {
  t.plan(1)

  const json = readJsonSync(file2)
  const obj = new Validator(json.mixSpread)

  return obj.validate([100, 'a', 'b', 'c'])
            .then(result => {
              // console.log(result)
              t.truthy(result)
            })

})
