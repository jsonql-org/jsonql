// debugging the input where there is a default value
import test from 'ava'
import { join } from 'path'
const fnFile = join(__dirname, 'fixtures', 'function-style.ts')
import { tsFunctionParser } from '../src'



test(`It should able to take the default value and apply to the astMap`, async t => {

  const astMap = await tsFunctionParser(fnFile)

  console.dir(astMap, { depth: null })

  t.truthy(astMap)
})
