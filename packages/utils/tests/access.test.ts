
import test from 'ava'
import { accessByPath } from '../src/access'


const obj = {
  prop1: {
    params: [],
    deeper: {
      something: 1
    }
  },
  prop2: {
    params: [{ x: 1 }]
  }
}

test(`Testing the accessByPath method`, t => {

  const result = accessByPath(obj, 'prop1.params')

  t.deepEqual(result, [])

  const result2 = accessByPath(obj, 'prop1.deeper.something')

  t.is(result2 , 1)
  
})