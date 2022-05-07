import test from 'ava'
// import { JsonqlContract } from '../src'
import { join } from 'node:path'
import { tsParserSync } from '../src/lib/common'
const testClassFile = join(__dirname, 'fixtures', 'velocejs', 'test-class.ts')

test(`Test the new base parser sync`, async t => {

  const astMap = tsParserSync(testClassFile)

  // console.dir(astMap, { depth: null })

  t.truthy(astMap)

})
