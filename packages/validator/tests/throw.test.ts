// testing if it throws or not
import test from 'ava'
import { validateSync } from '../src'
// const debug = require('debug')('jsonql-params-validator:test:throw')
// const result = validateSync(['1'], [{type: ['number'], name: 'id'}]);
import { JsonqlValidationError } from '@jsonql/errors'


const fn = () => {
  const result = validateSync(['1'], [{type: ['number'], name: 'id'}])
  if (result.length) {
    throw new JsonqlValidationError('Failed!')
  }
  return true
}

test('It should able to throw an error', t => {
  const error = t.throws( () => {
    fn();
  } , null /*JsonqlValidationError*/, 'pass a string that expected number')
  t.is(error.message, 'Failed!')
})
