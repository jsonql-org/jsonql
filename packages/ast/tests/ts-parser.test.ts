import test from 'ava'
import { join } from 'path'
import {
  getParser,
  tsClassParser,
  tsFunctionParser,
  // tsBasicParserSync,
} from '../src/main'
import {
  processClassModuleBody,
  // stripSpan,
} from '../src/lib/processors'
import {
  stripTypeParams
} from '../src/lib/common'
import {
  SPREAD_ARG_TYPE,
  TS_TYPE_NAME
} from '../src/lib/constants'

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

test.only(`Should able to generate AST from a ts class file`, async t => {
  const result = await tsClassParser(tsFile)
  show(result)
  t.truthy(result)
})

test(`Testing the tsFunctionParser`, async t => {
  const result = await tsFunctionParser(tsFuncFile)

  t.truthy(result)
})

test(`Should able to understand the spread arguments`, async t => {
  t.plan(2)
  const result = await tsClassParser(tsFile4)
  // show(result)
  for (const name in result) {
    t.is(result[name][0][TS_TYPE_NAME], SPREAD_ARG_TYPE)
  }
})

test(`Test the strip typeParams method`, async t => {
  const result = await tsClassParser(tsFile)
  const cleanResult = {}
  for (const methodName in result) {
    cleanResult[methodName] = stripTypeParams(result[methodName])
  }
  // show(cleanResult)
  t.truthy(cleanResult)
})
