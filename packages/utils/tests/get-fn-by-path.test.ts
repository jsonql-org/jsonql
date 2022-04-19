import test from 'ava'

import { getPathToFn } from '../src/node'
import { join } from 'path'
import { SOCKET_AUTH_NAME } from '@jsonql/constants'


test(`It should able to find the fn just by searching path`, t => {
  const resolverDir = join(__dirname, 'fixtures', 'resolvers')

  const name = 'testNn'

  t.truthy( getPathToFn(name, 'query', { resolverDir }) )

})


test(`Testing the combine search for a function`, t => {

  const resolverDir = join(__dirname, 'fixtures', 'socket')
  const target = join(resolverDir, 'socket', 'auth', 'disconnect.js')

  const config = {
    resolverDir,
    contract: {}
  }

  const result = getPathToFn('disconnect', SOCKET_AUTH_NAME, config)

  t.is(result, target)

})
