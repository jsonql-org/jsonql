// setup a baseline test to observe the validator internals
import test from 'ava'
import { join } from 'node:path'
import { readJsonSync } from 'fs-extra'
import { Validator } from '../src'

const astFile = join(__dirname, 'fixtures', 'resolver', 'baseline-fn.json')
let json: any
let val: Validator
let valx: Validator
test.before(() => {
  json = readJsonSync(astFile)
  val = new Validator(json.baselineFn)
  // create a new instance to work with
  valx = new Validator(json.baselineFn)
  valx.addValidationRules({
    value2: { plugin: 'moreThan', num: 1}
  })
})

test.only(`Just to observe about the baseline function internal to see the different against a spread`, async t => {
  t.plan(1)

  return val.validate(['hello', 12345])
           .then((result: any) => {
             t.deepEqual(result, {value1: "hello", value2: 12345, value3: false})
           })
})

test.skip(`This is going to test and fix the duplicate return value due to the spread argument`, async t => {
  t.plan(1)

  return valx.validate(['world', 12346, true])
             .then((result: any) => {

               t.deepEqual(result, ['world', 12346, true])
             })
})
