import test from 'ava'
import { join } from 'node:path'
import { tsClassParserSync } from '@jsonql/ast'
import * as fs from 'fs-extra'
import {
  DEFAULT_CONTRACT_FILE_NAME,
  PUBLIC_CONTRACT_FILE_NAME,
} from '@jsonql/constants'
import {
  JsonqlContractEntry
} from '../src/types'
import { JsonqlContract } from '../src/contract'
const targetFile = join(__dirname, 'fixtures', 'velocejs', 'test-class.ts')
const dest = join(__dirname, 'fixtures', 'tmp')
// const show = (code: any) => console.dir(code, { depth: null })

let astMap: any
let contractInstance: JsonqlContract

test.before(() => {
  astMap = tsClassParserSync(targetFile)
  contractInstance = new JsonqlContract(astMap)
})

test.after(() => {
  // @TODO remove the test files
  fs.removeSync(dest)
})

test(`Test the basic class init and output the contract`, t => {
  const c = contractInstance.output()
  // show(c)
  t.truthy(c.data)
  t.is(c.meta.type, 'rest')
})

test(`Testing the data method to insert new data to node`, t => {
  t.plan(1)
  const name = 'post'
  contractInstance.data(name, { route: '/posts/:month/:year:/:day', method: 'get' })

  const c = contractInstance.output()
  const found = c.data.filter(
    (data: JsonqlContractEntry) => data.name === name && data.route !== undefined
  )

  t.true(!!found.length)
})

test(`Test the write file output method and the serve method`, async t => {
  t.plan(3)

  const files = [DEFAULT_CONTRACT_FILE_NAME, PUBLIC_CONTRACT_FILE_NAME]
  await contractInstance.write(dest)

  files.forEach((fileName: string) => {
    t.true(fs.existsSync(join(dest, fileName)))
  })

  const contractJson = await contractInstance.serve(dest)
  // console.dir(contractJson, { depth: null })
  t.truthy(contractJson)
})
