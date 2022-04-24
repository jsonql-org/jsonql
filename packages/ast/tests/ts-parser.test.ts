import test from 'ava'
import { join } from 'path'
import {
  getParser,
  tsClassParser,
  tsFunctionParser
} from '../src/main'
import {
  processClassModuleBody,
  // stripSpan,
} from '../src/processors'

const show = (s: any) => console.dir(s, { depth: null })
const tsFile = join(__dirname, 'fixtures', 'test-file-1.ts')
const tsFuncFile = join(__dirname, 'fixtures', 'test-file-2.ts')

test(`Should able to get the correct parser`, async t => {
  const parser = getParser('ts')
  const result = await parser(tsFile)
  const body = processClassModuleBody(result)
  t.truthy(body)
})

test.only(`Should able to generate AST from a ts file`, async t => {
  const result = await tsClassParser(tsFile)
  show(result)
  t.truthy(result)
})

test(`Testing the tsFunctionParser`, async t => {
  const result = await tsFunctionParser(tsFuncFile)
  // show(result)
  t.truthy(result)
})
