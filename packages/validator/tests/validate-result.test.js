// testing the withResult flag changing the output
const test = require('ava')
const { join } = require('path')
const fsx = require('fs-extra')
const { DATA_KEY, ERROR_KEY, HELLO } = require('jsonql-constants')
const contract = fsx.readJsonSync(join(__dirname, 'fixtures', 'contract.json'))
const { 
  validateSync, 
  validateAsync
} = require('../dist/jsonql-params-validator.cjs')

const debug = require('debug')('jsonql-params-validator:test:validate-result')

test.before(t => {
  t.context.contract = contract
  t.context.params = contract.query.getSomethingElse.params
})

test('It should able to return the full argument even some of them are not pass', t => {
  let result = validateSync(['A'], t.context.params, true)
  debug('DATA_KEY', result[DATA_KEY])
  t.true(result[DATA_KEY].length === 2)
  let failResult = validateSync([], t.context.params, true)
  debug('ERROR_KEY', failResult[ERROR_KEY])
  t.true(failResult[ERROR_KEY].length === 1)
})

test.cb('It should able to do the same with validate async but just resolve the correct data', t => {
  t.plan(2)

  validateAsync(['B'], t.context.params, true)
    .then(result => {
      debug('result', result)
      t.true(result.length === 2)
    })

  validateAsync([], t.context.params, true)
    .catch(error => {
      debug(error)
      t.true(error.length === 1)
      t.end()
    })
})

