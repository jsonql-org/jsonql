// object operation related
import test from 'ava'
import {
  arrToObj
} from '../src'


test(`Test the arrToObj method`, t => {
  const testArr = [
    {name: 'a', value: '1'},
    {name: 'b', value: '2'},
    {name: 'c', value: '3'}
  ]

  const processor = (entry) => {
    return {[entry.name]: entry.value}
  }

  const obj = arrToObj(testArr, processor)

  t.is(obj.a, '1')
  t.is(obj.c, '3')
})
