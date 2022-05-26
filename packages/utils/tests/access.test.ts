
import test from 'ava'
import { accessByPath } from '../src/access'
import { isAsyncFn } from '../src/is-async-fn'

const obj = {
  prop1: {
    params: ['a', 'b', 'c'],
    deeper: {
      something: 1
    }
  },
  prop2: {
    params: [{ x: 1 }]
  }
}

test(`Testing the accessByPath method`, t => {

  const result = accessByPath(obj, 'prop1.params.2')

  t.is(result, 'c')

  const result2 = accessByPath(obj, 'prop1.deeper.something')

  t.is(result2 , 1)

})

test('Test if a function is async or not', t => {

  const asyncFn = async ( value: number ) => value

  t.true(isAsyncFn(asyncFn))

  const notAsyncFn = (value: number) => value

  t.false(isAsyncFn(notAsyncFn))

})
