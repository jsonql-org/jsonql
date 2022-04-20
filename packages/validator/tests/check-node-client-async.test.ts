// check the options
import test from 'ava'
import {
  // JsonqlTypeError,
  // JsonqlEnumError,
  JsonqlCheckerError
} from '@jsonql/errors'
// import debugFn from 'debug'
import nodeClientCheckConfig from './fixtures/node-client-config'
import { join, resolve } from 'path'
// const debug = debugFn('jsonql-params-validator:check-node-client-async')
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
  })
  t.is(opt.hostname, hostname)
})

test("It should able to handle the checker error from within the validator", async t => {
  nodeClientCheckConfig({
    hostname,
    contractKey,
    contractDir: '/directory/does/not/exist'
  }).catch((error: Error) => {
    t.true(error instanceof JsonqlCheckerError)
    t.is(error.message, 'contractDir')
  })
})
