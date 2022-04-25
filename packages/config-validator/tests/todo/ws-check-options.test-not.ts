// fix the regression bug in the checkConfig with a real configuration file from ws
const test = require('ava')
const { join } = require('path')
const fsx = require('fs-extra')

const baseDir = join(__dirname, 'fixtures')
const contract = fsx.readJsonSync(join(baseDir, 'contract.json'))
const resolverDir = join(baseDir, 'html')

const wsServerConfig = require('./fixtures/ws-server-check-options')
const debug = require('debug')('jsonql-params-validator:test:ws-check-options')

test.cb('This test is for testing the ws server configuration setup', t => {
  t.plan(1)

  let config = {
    contractDir: baseDir,
    resolverDir,
    contract,
    serverType: 'ws',
    enableAuth: true,
    keysDir: join(__dirname, 'fixtures', 'keys')
 }

 wsServerConfig(config)
  .then(opts => {
    debug('opts', opts)
    t.pass()
    t.end()
  })
  .catch( err => {
    debug('err', err)
    t.fail()
    t.end()
  })

})
