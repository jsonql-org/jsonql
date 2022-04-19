// need to test the two new object define property methods

import test from 'ava'
import { injectToFn, objDefineProps, objHasProp } from '../src'


test(`It should able to overwrite with the flag`, t => {
  // just a dummy for injection
  let baseFn = () => 'I am fine'
  let key = 'someProps'
  let value = 'I am not fine'
  // we need to set the flag from the beginning
  let injectedFn1 = injectToFn(baseFn, key, value, true)
  t.is(injectedFn1[key], value)
  let value2 = 'I am OK now'
  let injectedFn2 = injectToFn(injectedFn1, key, value2, true)
  // t.not(injectedFn2[key], value2)
  // let injectedFn3 = injectToFn(injectedFn1, key, value2, true)
  t.is(injectedFn2[key], value2)
})

test(`It should never allow to overwrite the setter or getter`, t => {
  let baseFn = () => 'that is cool'
  let key = 'seriousProp'
  let setter = (value: any) => {
    console.info(value)
  }
  let fn1 = objDefineProps(baseFn, key, setter)
  t.is(fn1[key], null)
})

test(`It should able to check the property using objHasProp`, t => {
  let baseObj = {}
  let key = 'some-property-name'
  let value = 1234
  let result1 = objHasProp(baseObj, key)
  t.falsy(result1)
  // @ts-ignore
  baseObj = injectToFn(baseObj, key, value)
  let result2 = objHasProp(baseObj, key)

  t.is(result2, value)

})


test(`Testing a new concept about setting a property for internal use`, t => {

  function someFunction(...args) {
    // console.log(someFunction.max)
    if (someFunction.max > -1) {
      let values = args.filter((arg, i) => i < someFunction.max)
      return values.length
    }
    return args.length
  }

  someFunction = injectToFn(someFunction, 'container', -1, true)

  someFunction = objDefineProps(someFunction, 'max', function setter(value) {
    someFunction.container = value
    // console.log(someFunction.container, value)
  }, function getter() {
    return someFunction.container
  })

  t.is(someFunction.max, -1, 'Check if the default value is set')

  someFunction.max = 2
  const result = someFunction(1,2,3,4,5)

  t.is(result, 2, 'Test if the max value change the return result')

})

/*
test(`Test another concept about chaining function`, t   => {

  function chainFunction(...args) {
    return args.length
  }

  chainFunction = injectToFn(someFunction, 'value', -1, true)

  chainFunction = objDefineProps(chainFunction, 'max', function(value) {
    chainFunction.value = value
  }, function getter() {
    return function applyValue(value) {
      chainFunction.value = value
    }
  })

  chainFunction.max(2)

})
*/
