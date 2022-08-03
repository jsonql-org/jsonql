// TBD for tracer
import test from 'ava'
import { join } from 'node:path'

import { tracer } from '../src/tracer'

const mainFile = join(__dirname, 'fixtures', 'index.ts')


test(`Should able to return an ast file`, t => {
  const ast = tracer(mainFile, { target: 'ES6'})

  console.dir(ast, { depth: null })

  t.pass()
})
