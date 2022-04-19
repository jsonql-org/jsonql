// check the options
const test = require('ava')
const {
  JsonqlTypeError,
  JsonqlEnumError,
  JsonqlCheckerError
} = require('jsonql-errors')
const debug = require('debug')('jsonql-params-validator:check-node-client-async')
const nodeClientCheckConfig = require('./fixtures/node-client-config')
const { join, resolve } = require('path')
const contractDir = resolve(join(__dirname, 'fixtures'))
const hostname = 'https://some-where-else.com';
const contractKey = '12345678'
// @NOTE strange behavior this one can use cb but not the other other two???
// is it because of the plan is greater than 1?
test('It should able to apply the default options', async t => {
  const opt = await nodeClientCheckConfig({
    hostname,
    contractDir,
    contractKey
  });
  t.is(opt.hostname, hostname)
})

test("It should able to handle the checker error from within the validator", async t => {
  nodeClientCheckConfig({
    hostname,
    contractKey,
    contractDir: '/directory/does/not/exist'
  }).catch(error => {
    t.true(error instanceof JsonqlCheckerError)
    t.is(error.message, 'contractDir')
  })
})
