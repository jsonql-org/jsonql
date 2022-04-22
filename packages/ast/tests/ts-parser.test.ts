import test from 'ava'
import { join } from 'path'
import { tsClassParser } from '../src'

const tsFile = join(__dirname, 'fixtures', 'test-file-1.ts')


test(`Should able to generate AST from a ts file`, async t => {

  const result = await tsClassParser(tsFile)

  console.dir(result, { depth: null })

  t.truthy(result)
})
