// re-test the return result as object 
import test from 'ava'
import MultiApi from './fixtures/multi-api'
import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'
import { Validators } from '../src'
/// import ValidationError from '@jsonql/errors/dist/validation-error'
import { RETURN_AS_OBJ } from '../src'
import type { JsonqlGenericObject } from '../src/types'

let api: MultiApi
let validators: Validators
test.before(() => {
  const astMap = readJsonSync(join(__dirname, 'fixtures', 'multi-api-map.json'))

  api = new MultiApi()
  validators = new Validators(astMap)
})

test(`Should able to get a validator by name and pass the validation`, async t => {
  t.plan(1)

  const V = validators.getValidator('archive')

  return V.validate([1], RETURN_AS_OBJ)
      .then((result: JsonqlGenericObject) => {
        t.deepEqual(result, {id: 1} )        
      })
})