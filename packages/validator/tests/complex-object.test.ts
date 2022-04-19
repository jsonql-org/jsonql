// break out the test complex array and object test
const test = require('ava')
const { join } = require('path')
const { inspect } = require('util')
const debug = require('debug')('jsonql-params-validator:combine-test')
const {
  checkIsArray,
  checkIsObject
} = require('../src')
const fsx = require('fs-extra')

const contractJson = fsx.readJsonSync(join(__dirname, 'fixtures', 'contract.json'))
const keys = contractJson.mutation.setDetailObj.params[0].keys;

test('Test with a complex array type check', t => {
  t.true(checkIsArray([1,2,3], 'number'), 'Pass an array of numbers')
  t.false(checkIsArray(['1',2,'3'], 'string'), 'Pass an array of mixed values')

  t.true(checkIsArray(keys), 'Pass the keys for payload from contract.json')
  t.false(checkIsArray(contractJson.mutation.setDetailObj.params.keys), 'Pass the wrong keys and suppose to fail')

})

test('Test with complex object type check', t => {
  t.true(
    checkIsObject({key: 'this is string', update: 'This is anything'}, keys),
    'Check with optional keys'
  )
})

test('Test with complex object with wrong value', t => {
  t.false(
    checkIsObject({key: 1, update: 'something'}, keys),
    'Check with a wrong value for type in properties'
  )

  t.false(
    checkIsObject({key: 'this is key'}, keys),
    'Check with missing key in properties'
  )

})
