// test the ValidatorBase standalone
import test from 'ava'

import { join } from 'node:path'
import { readJsonSync } from 'fs-extra'
import { ValidatorBase } from '../base'
import { ValidationError } from '@jsonql/errors'

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
              // console.log(result)
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
      .catch((error: ValidationError) => {

        t.deepEqual(error.message, 'NO_PLUGIN_DUMMY_FUNCTION')
      })

})

test(`Testing another situation when we pass a async method as validator method`, async t => {
  t.plan(1)

  const valFn = async function(value: string) {
    if (value === 'hello' || value === 'world') {
      return Promise.reject(false)
    }
    return Promise.resolve(true)
  }

  vb.addValidationRules({
    value1: valFn
  })
  // @NOTE we didn't catch an error but not the valdiation error we want
  // instead complain about the function pass is not a function but an object
  return vb.validate(['hello', 100])
           .catch((error: ValidationError) => {
             // console.log(error)
             t.truthy(error.detail)
           })

})


