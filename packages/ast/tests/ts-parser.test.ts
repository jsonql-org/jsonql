import test from 'ava'
import { join } from 'path'
import {
  getParser,
  tsClassParser,
} from '../src/main'
import {
  processClassModuleBody,
  stripSpan,
} from '../src/processors'

const show = (s: any) => console.dir(s, { depth: null })

const tsFile = join(__dirname, 'fixtures', 'test-file-1.ts')

test.only(`Should able to get the correct parser`, async t => {

  const parser = getParser('ts')

  const result = await parser(tsFile)

  const body = processClassModuleBody(result)

  show(body)

  t.truthy(body)
})
/*TsTypeReference
test.only(`Should able to strip out all the span props`, t => {
  const obj = {
      name: 'arg3',
      required: false,
      types: {
        type: 'TsArrayType',
        span: { start: 142, end: 147, ctxt: 0 },
        elemType: {
          type: 'TsKeywordType',
          span: { start: 142, end: 145, ctxt: 0 },
          kind: 'any'
        }
      }
    }
  const result = stripSpan(obj)
  // show(result)
  t.truthy(result)
})
*/

test(`Should able to generate AST from a ts file`, async t => {

  const result = await tsClassParser(tsFile)

  show(result)

  t.truthy(result)
})
