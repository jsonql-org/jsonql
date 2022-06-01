// combine test for many small functions
import test from 'ava'
import {
  isNaN,
  strToNum,
  strToBool,
  isFunction,
  cloneDeep,
} from '../src'

test(`Test the clone object which should detach from the original`, t => {
  const obj = {a: 1, b: { c: 2} }

  const clone = cloneDeep(obj)

  const obj1 = Object.assign({}, obj)

  obj1.b.c = 3
  obj1.a = 4

  t.is(obj.b.c, 3)
  t.is(obj.a, 1)
  // console.log('a', obj.a)
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
  t.false(isNaN(input))
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
