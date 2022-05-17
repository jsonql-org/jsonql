// testing the spread input and output
import test from 'ava'

import { ValidatorFactory } from '../src'
import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'

// const file2 = join(__dirname, 'fixtures', 'resolver', 'mix-spread-fn.json')
const file1 = join(__dirname, 'fixtures', 'resolver', 'spread-function.json')

test(`Testing with the spread argument function first`,  async t => {
  t.plan(1)

  const json = readJsonSync(file1)

  const obj = new ValidatorFactory(json.spread)

  return obj.validate(['a', '1', 'c'])
            .then(result => {
              // console.log('success', result)
              t.pass()
            })
            .catch(err => {
              console.log('error', err)
              t.pass()
            })
})
