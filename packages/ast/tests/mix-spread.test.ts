
import test from 'ava'
import { join } from 'node:path'

import {
  // tsBasicParserSync,
  tsFunctionParser
} from '../src'

// const show = (s: any) => console.dir(s, { depth: null })


const fnFile = join(__dirname, 'fixtures', 'mix-spread-fn.ts')
/*
{
  mixSpread: [
    { name: 'arg1', required: true, type: 'number' },
    {
      name: 'arg2',
      required: true,
      tstype: 'RestElement',
      type: 'array',
      types: 'string',
      typeParams: { elemType: 'TsKeywordType', kind: 'string' }
    }
  ]
}

*/

test(`Test an edge case where mixture of normal argument and spread argument together`, async t => {

  const result = await tsFunctionParser(fnFile)
  // show(result)
  t.truthy(result)
})
