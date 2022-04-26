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
const fixture = join(__dirname, 'fixtures')
const tsFile = join(fixture, 'test-file-1.ts')
const tsFuncFile = join(fixture, 'test-file-2.ts')

const tsFile4 = join(fixture, 'test-file-4-spread.ts')

test(`Should able to get the correct parser`, async t => {
  const parser = getParser('ts')
  const result = await parser(tsFile4)
  const body = processClassModuleBody(result)
  // show(body)
  t.truthy(body)
})

test(`Should able to generate AST from a ts class file`, async t => {
  const result = await tsClassParser(tsFile)
  // show(result)
  t.truthy(result)
})

test(`Testing the tsFunctionParser`, async t => {
  const result = await tsFunctionParser(tsFuncFile)
  // show(result)
  t.truthy(result)
})

test.only(`Should able to understand the spread arguments`, async t => {
  const result = await tsClassParser(tsFile4)
  show(result)
  t.truthy(result)
})
