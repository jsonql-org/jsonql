// testing and develop the promise methods
import test from 'ava'
import { promise, processAll } from '../src/promise'

declare type Callback = (arg: boolean) => void

test('Try out the array of promises with all passed', async t => {
  const tasks = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
  ]
  t.plan(2)
  return promise((resolve: Callback) => {
    processAll(tasks)
      .then(result => {
        t.is(result[0].length, 3)
        t.is(result[1].length, 0)
        resolve(true)
      })
  })
})

test('Try out the array of promises with some failed', async t => {
  const tasks = [
    Promise.resolve(1),
    Promise.reject(2),
    Promise.resolve(3)
  ]
  t.plan(2)
  return promise((resolve: Callback) => {
    processAll(tasks)
      .then(result => {
        t.is(result[0].length, 2)
        t.is(result[1].length, 1)
        resolve(true)
      })
  })
})
