// testing several situation adding rules or setting up plugins
import test from 'ava'
import { Validators } from '../src'
// import MultiApi from './fixtures/multi-api'
import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'
import { JsonqlValidationError } from '@jsonql/errors'

// let api: MultiApi
let validators: Validators
test.before(() => {
  const astMap = readJsonSync(join(__dirname, 'fixtures', 'multi-api-map.json'))

  //  api = new MultiApi()
  validators = new Validators(astMap)
})

test(`Try to call a non-exist plugin and it should not throw error`, async t => {

  const validator = validators.getValidator('archive')

  validator.addValidationRules({
    id: {
      plugin: 'someSillyPlugin'
    }
  })

  return validator.validate([101])
                  .catch((error: JsonqlValidationError) => {
                    
                    t.is(error.message, 'NO_PLUGIN_DUMMY_FUNCTION')
                  })
})
