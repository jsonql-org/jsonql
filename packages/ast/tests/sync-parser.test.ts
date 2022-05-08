import test from 'ava'
import { tsClassParserSync } from '../src'
import { join } from 'node:path'

const targetFile = join(__dirname, 'fixtures', 'velocejs', 'test-class.ts')

test(`Should able to perform the same task like async version`, t => {

  const obj = tsClassParserSync(targetFile)

  console.dir(obj, { depth: null })

  t.truthy(obj)
})
