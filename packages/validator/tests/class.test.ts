// new test for testing the ValidatorFactory and associate methods
import test from 'ava'
import * as fs from 'fs-extra'
import { join } from 'path'

const fixtures = join(__dirname, 'fixtures', 'resolver')
const classAst = join(fixtures, 'class-style.json')
const funcAst = join(fixtures, 'function-style.json')

test.before(t => {
  t.context = {
    classAstInput: fs.readJsonSync(classAst),
    funcAstInput: fs.readJsonSync(funcAst)
  }
})


test(`It should able to transform array style input into the standard`, t => {
  const input1 = [
    [], // skip
    '_', // skip
    '_', // skip
    
  ]



})
