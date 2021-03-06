import test from 'ava'

import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'
import { Validators } from '../src'

let validators: Validators
test.before(() => {
  const astMap = readJsonSync(join(__dirname, 'fixtures', 'multi-api-map.json'))

  validators = new Validators(astMap)
})

test(`test the prepareArgValues`, t => {
  const validator = validators.getValidator('someThingRandom')

  const result = validator.prepareArgValues([1,2,3,4,5])

  t.deepEqual(result, {args: [1,2,3,4,5]})
})


test(`Test out the export method and develop the file export`, async t => {

  // register plugins
  validators.registerPlugin('MyTestPlugin', {
    main(key: string, value: string) {
      return value !== key
    },
    params: ['key']
  })

  const validator = validators.getValidator('posts')
  // add rules
  validator.addValidationRules({
    arg1: [
      function HolaTest(value: string) {
        return value.indexOf('Hola') > -1
      },
      {
        validate: function(v: string) {
          return v.substring(0,1) === 'a'
        },
      }
    ],
    // try different style
    arg2: function(value: number) {
      return value > 5
    }
  })

  validator.addValidationRules({ name: 'arg2', plugin: 'lessThan', num: 10 })
  validator.addValidationRules({ arg2: { plugin: 'between', max: 6, min: 9 }})

  const schema = validators.export()

  // console.dir(schema, {depth: null})

  t.truthy(schema.plugins)

})
