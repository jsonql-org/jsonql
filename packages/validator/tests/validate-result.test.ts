// testing the withResult flag changing the output
import test from 'ava'
import { join } from 'path'
import * as fsx from 'fs-extra'
import { DATA_KEY, ERROR_KEY } from '@jsonql/constants'

const contract = fsx.readJsonSync(join(__dirname, 'fixtures', 'contract.json'))
import {
  validateSync,
  validateAsync
} from '../src'
import debugFn from 'debug'
const debug = debugFn('jsonql-params-validator:test:validate-result')

test.before(t => {
  t.context = {
    contract,
    params: contract.query.getSomethingElse.params
  }
})

test('It should able to return the full argument even some of them are not pass', t => {
  let result = validateSync(['A'], t.context.params, true)
  debug('DATA_KEY', result[DATA_KEY])
  t.true(result[DATA_KEY].length === 2)
  let failResult = validateSync([], t.context.params, true)
  debug('ERROR_KEY', failResult[ERROR_KEY])
  t.true(failResult[ERROR_KEY].length === 1)
})

test('It should able to do the same with validate async but just resolve the correct data', t => {
  t.plan(1)

  return validateAsync(['B'], t.context.params, true)
    .then(result => {
      debug('result', result)
      t.true(result.length === 2)
    })
})

test(`Break out from the last test there is no more cb test in ava`, t => {
  t.plan(1)

  return validateAsync([], t.context.params, true)
    .catch(error => {
      debug(error)
      t.true(error.length === 1)
    })
})
