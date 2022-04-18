const test = require('ava')
const { getPathToFn } = require('../main')
const { join } = require('path')
const { SOCKET_AUTH_NAME } = require('jsonql-constants')

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