// test js parser
import test from 'ava'
import { jsParser, jsFileParser } from '../src/js-main'
import { join } from 'node:path'

const jsFile = join(__dirname, 'fixtures', 'test-js.js')

test(`Test the infile js parser`, t => {
  const astMap = jsParser(jsFile)
  t.truthy(astMap)
})
/** one interesting discover althought we dont get any type but we can tell if it's async or not */
const something = async (input: string) => {
  return `input is ${input}`
}

test(`Test the js code parser`, t => {

  const astMap = jsFileParser(something.toString())
  // console.dir(astMap, { depth: null })
  t.truthy(astMap)
})
