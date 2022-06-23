// combine test for many small functions
import test from 'ava'
import {
  strToNum,
  strToBool,
  isFunction,
  cloneDeep,
  flatMap,
  merge,
  curry,
  isEqual,
  trueTypeOf
} from '../src'

test('test the trueTypeOf method', t => {
  const a1 = trueTypeOf(true)
  t.is(a1, 'boolean')
  const a2 = trueTypeOf('a')
  t.is(a2, 'string')
  const a3 = trueTypeOf(100)
  t.is(a3, 'number')
  const a4 = trueTypeOf(100.02)
  t.is(a4, 'number')
  const a5 = trueTypeOf({a: 1})
  t.is(a5, 'object')
  const a6 = trueTypeOf([1,2])
  t.is(a6, 'array')
  const a7 = trueTypeOf(undefined)
  t.is(a7, 'undefined')
  const a8 = trueTypeOf(null)
  t.is(a8, 'null')
  const a9 = trueTypeOf(() => true)
  t.is(a9, 'function')
  const a10 = trueTypeOf(async () => false)
  t.is(a10, 'asyncfunction')
})

test('Test our DIY curry method', t => {
  const fn = (a: number, b: number, c: number) => a + b + c
  const cFn = curry(fn, 1)
  t.true(typeof cFn === 'function')
  const result = cFn(2, 3)
  t.is(result, 6)
})

test('testing our DIY merge method, also test the isEqual with object value', t => {
  const a = {a: 1, b: {c: 2}}
  const b = {x: {y: 10, z: [1,2,3]}}

  const c = merge(a, b)

  t.true(isEqual({a: 1, b: {c: 2}, x: {y: 10, z: [1,2,3]}}, c))
})


test('Testing the DIY flatMap method also test isEqual with array value', t => {
  const arr = [[1,2], [3, 4]]
  const newArr = flatMap(arr)

  t.true(isEqual(newArr, [1,2,3,4]))
})

test(`Test the clone object which should detach from the original`, t => {
  const obj = {a: 1, b: { c: 2} }
  const clone = cloneDeep(obj)
  const obj1 = Object.assign({}, obj)

  obj1.b.c = 3
  obj1.a = 4

  t.is(obj.b.c, 3)
  t.is(obj.a, 1)

  t.is(clone.b.c, 2)
})

test("testing the problem with isFunction sometime report a [Function name] as object", t => {
  const fn1 = () => true
  t.true(isFunction(fn1))
  const fn1s = async () => false
  t.true(isFunction(fn1s))
  function fn2() { return true }
  t.true(isFunction(fn2))
  const obj = {
    validate(something: string) {
      return something + ' na na'
    }
  }
  t.true(isFunction(obj.validate))
  const arr = [
    function someFunc() {
      return false
    }
  ]
  t.true(isFunction(arr[0]))
})

test(`Test how the isNaN works first`, t => {
  const input = '100'
  t.false(isNaN(input as unknown as number))
  const input1 = parseFloat('ab20')
  t.true(isNaN(input1))
})

test(`Should able to convert some of the props to number`, t => {
  const parts = 'a.1.b'.split('.').map((p: string) => strToNum(p))
  t.is(parts[0], 'a')
  t.is(parts[1], 1)
})

test(`Should able to convert string to boolean`, t => {
  t.true(strToBool('True'))
  t.false(strToBool('FALSE'))
})
