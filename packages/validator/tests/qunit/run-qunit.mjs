// start up for qunit
import { getConfigForQunit } from 'server-io-core/helper.mjs'
import { serverIoCore } from 'server-io-core/index.mjs'
// combine method
async function runQunitSetup (userConfig) {
  return getConfigForQunit(userConfig)
    .then(serverIoCore)
    .catch(err => {
      console.error(err)
    })
}

const config = {
  port: 0,
  webroot: [
    '/home/joel/Projects/jsonql-org/jsonql/packages/validator/tests/qunit/webroot',
    '/home/joel/Projects/jsonql-org/jsonql/packages/validator/tests/qunit/files'
  ],
  open: true,
  reload: true,
  libFilePattern: 'lib/*.lib.js',
  testFilePattern: '*.qunit.js',
  baseDir: '/home/joel/Projects/jsonql-org/jsonql/packages/validator/tests'
}

runQunitSetup(config)
