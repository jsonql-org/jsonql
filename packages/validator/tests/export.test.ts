// TBD for export validation map
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

test(`Should able to generate a validaton map for contract to use`, t => {

  const schema = api.export()

  // console.dir(schema, { depth: null })
  t.truthy(schema)
})
