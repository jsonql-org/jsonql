// new test for testing the ValidatorFactory and associate methods
import test from 'ava'
import * as fs from 'fs-extra'
import { join } from 'path'
import { showDeep } from '@jsonql/utils'
import {
  createAutomaticRules
} from '../src/class/engine'
import {
  ValidatorFactory
} from '../src'

const fixtures = join(__dirname, 'fixtures', 'resolver')
const classAst = join(fixtures, 'class-style.json')
const funcAst = join(fixtures, 'function-style.json')

let context: any = {}
test.before(() => {
  context = {
    classAstInput: fs.readJsonSync(classAst),
    funcAstInput: fs.readJsonSync(funcAst)
  }
})


test(`Should able to generate automatic validation rule from ast map`, t => {
  // @ts-ignore
  const rules = createAutomaticRules(context.classAstInput.main)
  showDeep(rules)
  t.truthy(rules)
})

test.only(`It should able validate`, async t => {
  // arg1: string, arg2: string | number, arg3?: boolea
  const values = ['hello', 234, "shit"]
  const validator = new ValidatorFactory(context.funcAstInput.resolver)

  const result = await validator.validate(values)

  showDeep(result)

  t.truthy(result)
})
