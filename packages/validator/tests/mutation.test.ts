// find the edge case when a mutation only required a payload but no condition
// then the args = [payload, undefined] but the validation failed
import test from  'ava'
import { join } from  'path'
import { validateSync } from  '../src'
import * as fsx from  'fs-extra'
import debugFn from 'debug'

const contract = fsx.readJsonSync(join(__dirname, 'fixtures', 'public-contract.json'))
const debug = debugFn('jsonql-params-validator:test:mutation'

test(`It should able to handle the mutation validation when only payload has been defined`, t => {
  const param = contract.mutation.updateMsService.params;
  const result = validateSync(['test', undefined], param)
  debug('%O', result)
  t.false(!!result.length)
})
