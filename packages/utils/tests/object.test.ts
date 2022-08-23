// object operation related
import type { AnyType } from '../src/types'
import test from 'ava'
import {
  arrToObj,
  isPlainObject,
  isClass,
  trueTypeOf
} from '../src'

test('A test of a primitive object checking method not in use here', t => {
  const emptyObj = {}
  const notEmptyObj = {a: 1}
  const _isEmptyObject = (obj: unknown) => trueTypeOf(obj) === 'object' && Object.keys(obj).length === 0

  t.true(_isEmptyObject(emptyObj))
  t.false(_isEmptyObject(notEmptyObj))
  
})


test('Should able to check basic object type', t => {
  t.true(isPlainObject({}), 'Empty Object')

  t.true(isPlainObject({a: 1, b: 2}), 'Object with keys')
})

test('Test to see if its class or plain object', t => {

  const obj = function() {
    this.a = 1;
    this.b = 2;
    this.fn = () => true
  }
  const testObj = new obj()
  t.false(isPlainObject(testObj), 'Init a function object')
  t.true(isClass(testObj))
})

test(`Test the arrToObj method`, t => {
  const testArr = [
    {name: 'a', value: '1'},
    {name: 'b', value: '2'},
    {name: 'c', value: '3'}
  ]

  const processor = (entry: AnyType) => {
    return {[entry.name]: entry.value}
  }

  const obj = arrToObj(testArr, processor)

  t.is(obj.a, '1')
  t.is(obj.c, '3')
})
