
import test from 'ava'
import { accessByPath } from '../src/access'
// import { isAsyncFn } from '../src/is-async-fn'
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

/*
test('Test if a function is async or not', t => {

  const asyncArrowFn = async ( value: number ) => value
  const asyncFn = async function() { console.log('die stupid eslint' )}

  t.true(isAsyncFn(asyncArrowFn))
  t.true(isAsyncFn(asyncFn))

  const notAsyncFn = async function() { console.log('Die stupid typescript compiler') }
  const notAsyncArrowFn = (value: number) => value

  t.false(isAsyncFn(notAsyncArrowFn))
  t.false(isAsyncFn(notAsyncFn))

})
*/
