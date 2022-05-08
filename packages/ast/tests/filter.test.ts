// need to re-test the filter in the first step
import test from 'ava'
import {
  tsBasicParserSync,
  processClassModuleBody
} from '../src'
import { join } from 'node:path'

const fixture = join(__dirname, 'fixtures')
const tsFile = join(fixture, 'test-file-x.ts')

test(`test the new tsBasicParserSync`, t => {
  const result = tsBasicParserSync(tsFile)

  const body = processClassModuleBody(result, false)

  console.dir(body, { depth: null })
  t.truthy(result)
})
