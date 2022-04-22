import test from 'ava'
import { join } from 'path'
import { getParser, tsClassParser } from '../src/main'

const show = (s: any) => console.dir(s, { depth: null })

const tsFile = join(__dirname, 'fixtures', 'test-file-1.ts')

test(`Should able to get the correct parser`, async t => {

  const parser = getParser('ts')

  const result = await parser(tsFile)

  show(result)

  t.truthy(result)
})


test.skip(`Should able to generate AST from a ts file`, async t => {

  const result = await tsClassParser(tsFile)

  show(result)

  t.truthy(result)
})
