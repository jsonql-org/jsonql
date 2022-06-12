// this will test the final feature of the validator
// using a validate / validateAsync function directly in the validationRuleEntry
import test from 'ava'
import { Validator } from '../src'
const baseLineFnAst = {
  "baselineFn": [
    {
      "name": "value1",
      "required": true,
      "type": "string"
    },
    {
      "name": "value2",
      "required": true,
      "type": "number"
    },
    {
      "name": "value3",
      "required": true,
      "type": "boolean",
      "defaultvalue": false
    }
  ]
}
let api: Validator
test.before(() => {
  api = new Validator(baseLineFnAst.baselineFn)
})

test(`It should allow to add validate method directly to the validate rules`, async t => {

  api.addValidationRules({
    value2: [
      {
        name: 'customRule1',
        validate: function(value: number) {
          // console.log('call with value', value)
          return value > 10000
        }
      }
    ]
  })

  return api.validate(['ABC', 123456])
            .then((result: Array<string|number|boolean>) => {
              // console.log('result', result)
              t.true(Array.isArray(result))
            })
})

test(`should able to just get back formatted values using prepareArgValues for normal function`, t => {
  // this is the standard situation
  const result1 = api.prepareArgValues(['XYZ', 98765, true])

  t.deepEqual(result1, {value1: 'XYZ', value2: 98765, value3: true})

  // this is the situation 2 where we need to take the defaultvalue
  const result = api.prepareArgValues(['DEF', 345678])

  t.deepEqual(result, {value1: 'DEF', value2: 345678, value3: false})
})
