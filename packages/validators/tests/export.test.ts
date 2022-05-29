import test from 'ava'

import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'
import { Validators } from '../src'


let validators: Validators
test.before(() => {
  const astMap = readJsonSync(join(__dirname, 'fixtures', 'multi-api-map.json'))

  validators = new Validators(astMap)
})

test(`Test out the export method and develop the file export`, async t => {

  const validator = validators.getValidator('posts')

  validator.addValidationRules({
    arg1: [
      {
        main: function(value: string) {
          return value.indexOf('Hola') > -1
        }
      },
      {
        main: function(s: string, e: string, v: string) {
          return v.substring(0,1) === s && v.substring(-1) === e
        },
        params: ['s', 'e']
      }
    ],
    // try different style
    arg2: function(value: number) {
      return value > 5
    }
  })

  const schema = validators.export()

  console.dir(schema, { depth: null })

  t.truthy(schema)

})
