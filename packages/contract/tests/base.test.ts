import test from 'ava'
import { join } from 'node:path'
import { tsClassParserSync } from '@jsonql/ast'
import {
  JsonqlContractEntry
} from '../src/types'
import { JsonqlContract } from '../src/contract'
const targetFile = join(__dirname, 'fixtures', 'velocejs', 'test-class.ts')

const show = (code: any) => console.dir(code, { depth: null })

let astMap: any
let contractInstance: JsonqlContract

test.before(() => {
  astMap = tsClassParserSync(targetFile)
  contractInstance = new JsonqlContract(astMap)
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
  contractInstance.data(name, { route: '/posts/:month/:year:/:day' })

  const c = contractInstance.output()
  show(c)
  const found = c.data.filter((data: JsonqlContractEntry) => data.name === name && data.route !== undefined)

  t.true(!!found.length)
})

test.todo(`Test the write file output method`)
