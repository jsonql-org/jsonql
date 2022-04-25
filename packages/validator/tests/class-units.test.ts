// new test for testing the ValidatorFactory and associate methods
import test from 'ava'
import * as fs from 'fs-extra'
import { join } from 'path'
import { showDeep } from '@jsonql/utils'
import {
  createAutomaticRules
} from '../src/class/engine'


const fixtures = join(__dirname, 'fixtures', 'resolver')
const classAst = join(fixtures, 'class-style.json')
const funcAst = join(fixtures, 'function-style.json')

test.before(t => {
  t.context = {
    classAstInput: fs.readJsonSync(classAst),
    funcAstInput: fs.readJsonSync(funcAst)
  }
})

test(`Should able to generate automatic validation rule from ast map`, t => {
  // @ts-ignore
  const rules = createAutomaticRules(t.context.classAstInput.main)

  showDeep(rules)

  t.truthy(rules)
})


test.skip(`It should able to transform array style input into the standard`, t => {
  const input1 = [
    [], // skip
    '_', // skip
    '_', // skip
    {key: 'hello'}, // as object and check if key exist

  ]



})
