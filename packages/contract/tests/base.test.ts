import test from 'ava'
import { join } from 'node:path'
import { tsClassParserSync } from '@jsonql/ast'
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

  t.truthy(c.data)
  t.is(c.meta.type, 'rest')
})
