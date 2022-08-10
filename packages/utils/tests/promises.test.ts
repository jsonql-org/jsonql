// testing and develop the promise methods
import test from 'ava'
import { promise, processAll } from '../src/promise'

test('Try out the array of promises', async t => {
  const tasks = [
    Promise.resolve(1),
    Promise.reject(2),
    Promise.resolve(3)
  ]
  t.plan(2)
  return promise(resolve => {
    processAll(tasks)
      .then(result => {
        t.is(result[0].length, 2)
        t.is(result[1].length, 1)
        resolve(true)
      })
  })
})
