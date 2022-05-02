// testing the client utils methods
import test from 'ava'
import { chainPromises, isEmptyObj, dasherize } from '../src'

/*
import { join } from 'path'
import * as fsx from 'fs-extra'
const pkg = fsx.readJsonSync(join(__dirname, '..', 'package.json'))

test(`It should have the version field`, t => {
  t.is(VERSION, pkg.version)
})
*/

test(`Should able to tell if any object is empty`, t => {

  t.true(isEmptyObj({}))

  t.false(isEmptyObj({a: '1'}))
})

test(`Dasherize should able to handle different situation`, t => {

  const a1 = dasherize('I am a boy')
  const a2 = dasherize(' I am not a boy')
  t.is(a1, 'i-am-a-boy')
  t.is(a2, 'i-am-not-a-boy')

})


test('The promises should be resolve one after the other even the early one resolve in a timer', async (t) => {
  t.plan(3)
  const results = ['first', 'second', 'third']

  const p1 = () => new Promise(resolver => {
    setTimeout(() => {
      resolver(results[0])
    }, 1000)
  })
  const p2 = () => new Promise(resolver => {
    setTimeout(() => {
      resolver(results[1])
    }, 300)
  })
  const p3 = () => new Promise(resolver => {
    resolver(results[2])
  })

  return chainPromises([p1(), p2(), p3()])
    .then(res => {
      res.forEach((r: any, i: number) => {
        t.is(r, results[i])
      })
    })
})
