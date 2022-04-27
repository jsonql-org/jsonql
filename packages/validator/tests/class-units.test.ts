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
import {
  chainProcessPromises
} from '@jsonql/utils'

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
// ------------------------------------------- //
declare type CBFunc = () => Promise<boolean>
const truthy: CBFunc = async () => true
const falsy: CBFunc = async () => false
const wrapper = async (fn: CBFunc, i: number) => {
  return fn().then((result: boolean) => {
    if (!result) {
      throw new Error(i+'')
    }
    return result
  })
}
// ------------------ START TEST ---------------- //
test(`Testing the multi level of Throw promies`, async t => {
  t.plan(1)

  const queue = [
    [() => wrapper(truthy, 0)],
    [() => wrapper(falsy, 1)],
    [() => wrapper(truthy, 0)]
  ].map(q => {

    const x = Reflect.apply(chainProcessPromises, null, q)
    return () => x()
  })

  const main = Reflect.apply(chainProcessPromises, null, queue)

  return main(null)
            .then(result => {
              console.log('------ RESULT -------')
              showDeep(result)
            })
            .catch(err => {
              console.log('------- ERROR ------')
              showDeep(err)
            })
            .finally(() => {
              t.pass()
            })
})



test(`Should able to generate automatic validation rule from ast map`, t => {
  // @ts-ignore
  const rules = createAutomaticRules(context.classAstInput.main)
  showDeep(rules)
  t.truthy(rules)
})

test(`It should able validate`, async t => {
  t.plan(1)
  // arg1: string, arg2: string | number, arg3?: boolea
  const values = ['hello', true, "shit"]
  const validator = new ValidatorFactory(context.funcAstInput.resolver)

  return validator.validate(values)
                  .then(result => {
                    console.log('result')
                    showDeep(result)
                  })
                  .catch(err => {
                    console.log('err')
                    showDeep(err)
                  })
                  .finally(() => {
                    t.pass()
                  })

})
