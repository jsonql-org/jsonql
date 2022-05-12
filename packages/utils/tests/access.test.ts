
import test from 'ava'
import { accessByPath } from '../src/access'


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
