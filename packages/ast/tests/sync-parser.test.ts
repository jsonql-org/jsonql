import test from 'ava'
import { tsClassParserSync, tsClassParser } from '../src'
import { join } from 'node:path'

const targetFile = join(__dirname, 'fixtures', 'velocejs', 'test-class.ts')


test(`Should able to perform the same task like async parser version`, t => {

  const obj = tsClassParserSync(targetFile)

  // console.dir(obj, { depth: null })

  t.truthy(obj)
})
