import test from 'ava'
import { ValidatorsServer } from '../src/validators-server'
import { join } from 'node:path'
import { readJsonSync } from 'fs-extra'
let validators: ValidatorsServer
test.before(() => {
  const astMap = readJsonSync(join(__dirname, 'fixtures', 'multi-api-map.json'))
  validators = new ValidatorsServer(astMap)
})


test(`Should able to read and import list of plugins js files`, async t => {

  const result = await validators.loadExternalPlugins(join(__dirname, 'fixtures', 'plugins'))


  t.true(result.filter((result: any) => result.external).length > 0)
})
