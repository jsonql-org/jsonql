// testing when passing a js function
import test from 'ava'

import { ValidatorFactory } from '../dist'
import { tsFileParser } from '@jsonql/ast'

function login(username: string, password: string) {
  return { username, password }
}

let astMap = {}
test.before(async () => {

  astMap = await tsFileParser(login.toString())
})


test(`Should able to generate minimum valdiation rule when pass function without type info`, async t => {
  t.plan(1)

  const obj = new ValidatorFactory(astMap['login'])

  return obj.validate(['john'])
      .catch(err => {
        t.true(Array.isArray(err.detail))
      })
})

test(`Should able to apply additional rule just like a normal ts function`, async t => {
  t.plan(1)
  const obj = new ValidatorFactory(astMap['login'])
  obj.createSchema({
    username: {plugin: 'between', max: 20, min: 5}
  })

  return obj.validate(['john', '12345'])
            .catch(err => {
              t.deepEqual(err.detail, [0,1])
            })
})

test.todo(`Should able to apply override rules`)
