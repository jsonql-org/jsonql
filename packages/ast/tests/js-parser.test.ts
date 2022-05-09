// test js parser
import test from 'ava'
import { jsParser, jsFileParser } from '../src/js-main'
import { join } from 'node:path'

const jsFile = join(__dirname, 'fixtures', 'test-js.js')


test(`Test the infile js parser`, t => {

  const astMap = jsParser(jsFile)

  console.dir(astMap, { depth: null })

  t.truthy(astMap)

})

test.todo(`Test the js code parser`)
