// test the ValidatorBase standalone
import test from 'ava'

import { join } from 'node:path'
import { readJsonSync } from 'fs-extra'
import { ValidatorBase } from '../base'
import { JsonqlValidationError } from '@jsonql/errors'

const astFile = join(__dirname, 'fixtures', 'resolver', 'baseline-fn.json')
let json: any
let vb: ValidatorBase

test.before(() => {
  json = readJsonSync(astFile)
  vb = new ValidatorBase(json.baselineFn)
})


test(`ValidatorBase should able to validate without the plugin system`, async t => {
  t.plan(1)

  return vb.validate(['Hello', 123])
            .then((result: {[key:string]: unknown}) => {
              t.truthy(result)
            })

})

test('Should able to use addValidationRules inline function', async t => {
  t.plan(1)

  vb.addValidationRules({
    value2: {
      validate: function(value: number) {
        return value !== 100
      }
    }
  })

  return vb.validate(['World', 321])
          .then((result: {[key:string]: unknown}) => {
            t.truthy(result)
          })
})

test('When try to use plugin and it should fail with a NO_PLUGIN_DUMMY_FUNCTION', async t => {
  t.plan(1)
  // this becomes the index 2 rules because we add one before
  vb.addValidationRules({
    value2: { plugin: 'lessThan', num: 200 }
  })

  return vb.validate(['Again', 201])
      .catch((error: JsonqlValidationError) => {

        t.deepEqual(error.message, 'NO_PLUGIN_DUMMY_FUNCTION')
      })

})
