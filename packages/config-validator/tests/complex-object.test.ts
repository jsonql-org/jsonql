// break out the test complex array and object test
import test from 'ava'
import { join } from 'path'
// import { inspect } from 'util'
// import debug from 'debug')('jsonql-params-validator:combine-test')
import {
  checkArray,
  checkObject
} from '../src/base'
import * as fsx from 'fs-extra'

const contractJson = fsx.readJsonSync(join(__dirname, 'fixtures', 'contracts', 'contract.json'))
const keys = contractJson.mutation.setDetailObj.params[0].keys

test('Test with a complex array type check', t => {
  t.true(checkArray([1,2,3], 'number'), 'Pass an array of numbers')
  t.false(checkArray(['1',2,'3'], 'string'), 'Pass an array of mixed values')

  t.true(checkArray(keys), 'Pass the keys for payload from contract.json')
  t.false(checkArray(contractJson.mutation.setDetailObj.params.keys), 'Pass the wrong keys and suppose to fail')

})

test('Test with complex object type check', t => {
  t.true(
    checkObject({key: 'this is string', update: 'This is anything'}, keys),
    'Check with optional keys'
  )
})

test('Test with complex object with wrong value', t => {
  t.false(
    checkObject({key: 1, update: 'something'}, keys),
    'Check with a wrong value for type in properties'
  )

  t.false(
    checkObject({key: 'this is key'}, keys),
    'Check with missing key in properties'
  )

})
