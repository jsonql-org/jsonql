// this will test the final feature of the validator
// using a validate / validateAsync function directly in the validationRuleEntry
import test from 'ava'
import { ValidatorFactory } from '../src'
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
let api: ValidatorFactory
test.before(() => {
  api = new ValidatorFactory(baseLineFnAst.baselineFn)
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
