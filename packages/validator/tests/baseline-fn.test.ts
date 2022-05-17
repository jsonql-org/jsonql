// setup a baseline test to observe the validator internals
import test from 'ava'
import { join } from 'node:path'
import { readJsonSync } from 'fs-extra'
import { ValidatorFactory } from '../src'

const astFile = join(__dirname, 'fixtures', 'resolver', 'baseline-fn.json')
let json: any
let val: ValidatorFactory

test.before(() => {
  json = readJsonSync(astFile)
  val = new ValidatorFactory(json.baselineFn)
})


test(`Just to observe about the baseline function internal to see the different against a spread`, async t => {
  t.plan(1)

  return val.validate(['hello', 12345])
           .then(result => {
             t.deepEqual(result, {value1: "hello", value2: 12345, value3: false})
           })
})
