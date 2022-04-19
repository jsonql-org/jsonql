import test from 'ava'
const {
  createQueryStr,
  createMutationStr,
  getQueryFromPayload,
  getMutationFromPayload,
  getQueryFromArgs,
  getMutationFromArgs,
  getNameFromPayload
} = require('../src/params-api')
const { isObjectHasKey } = require('../main')
const {
  PAYLOAD_PARAM_NAME,
  CONDITION_PARAM_NAME,
  RESOLVER_PARAM_NAME,
  TIMESTAMP_PARAM_NAME
} = require('jsonql-constants')
const debug = require('debug')('jsonql:params-api')
import { JsonqlValidationError } from 'jsonql-errors'


test('It should able to construct correct query argument and extract from the other side', t => {

  let name = 'getUser';
  let args = [1];
  const query = createQueryStr(name, args)
  t.true(typeof query === 'string')
  const result = getQueryFromPayload(query)

  debug(result)

  t.is(result[RESOLVER_PARAM_NAME], name)
  t.true(isObjectHasKey(result, TIMESTAMP_PARAM_NAME))
  t.deepEqual(result.args, args)

})

test('It should able to construct correct mutation argument and extract from the other side', t => {

  let name = 'changeSomething'
  let payload = 'whatever'
  let mutation = createMutationStr(name, payload)
  t.true(typeof mutation === 'string')
  const result = getMutationFromPayload(mutation)
  t.is(result[RESOLVER_PARAM_NAME], name)
  t.truthy(result[PAYLOAD_PARAM_NAME])
  t.truthy(result[CONDITION_PARAM_NAME])

  debug(result[TIMESTAMP_PARAM_NAME])

  t.truthy(result[TIMESTAMP_PARAM_NAME])


})

test('Pass wrong param should throw error', t => {
  let fn = () => createQueryStr('whatever', 'xyz')

  let error = t.throws( () => {
    return fn()
  } , null, 'expect the args to be an array')
  // JsonqlValidationError the expect instance doesn't work???
})

test('It should able to use the jsonp option', t => {
  let name = 'whateverResolver'
  let payload = ['whatever']
  let queryPayload = createQueryStr(name, payload, true)

  debug(queryPayload)

  t.false( queryPayload.indexOf(name) > -1)

})
