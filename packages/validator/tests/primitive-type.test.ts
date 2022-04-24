import test from  'ava'
// import contractJson from  './fixtures/contract.json'
import {
  checkAny,
  checkArray,
  checkBoolean,
  checkNumber,
  checkObject,
  checkString,
} from  '../src/base'
import { notEmpty } from '@jsonql/utils'
import debugFn from 'debug'
const debug = debugFn('jsonql-params-validator:test:primitive-type')

test('checking if a value consider empty or not', t => {

  t.falsy( notEmpty(null) )
  t.falsy( notEmpty(undefined) )
  t.falsy( notEmpty('') )
  t.falsy( notEmpty(' ') )

  t.truthy( notEmpty(123) )
  t.truthy( notEmpty('abc') )
  // this two change their behavior now
  t.falsy( notEmpty({}) )
  t.falsy( notEmpty([]) )

})


test('Should able to check any type', t => {
  t.true(checkAny('string'), 'Pass a string')
  t.false(checkAny(' '), 'Pass a space and this should not be allow')
  t.false(checkAny(null), 'Pass a null')
})

test('Should able to check string type', t => {
  t.true(checkString('string'), 'Pass a string')
  t.false(checkString(' '), 'Pass a space')
  t.false(checkString(1), 'Pass a number')
})

test('Should able to check number type', t => {
  t.true(checkNumber(1), 'Pass an integer')
  t.true(checkNumber(2.1), 'Pass a float')
  t.false(checkNumber(' '), 'Pass a space')
})

test('Should able to check boolean type', t => {
  t.true(checkBoolean(true), 'Pass true')
  t.true(checkBoolean(false), 'Pass false')
  t.false(checkBoolean(1), 'Pass 1 integer')
  t.false(checkBoolean(0), 'Pass a 0')
})

test.only('Should able to check basic array type', t => {
  t.true(checkArray([]), 'Empy array')
  t.true(checkArray([1,2,3], 'number'), 'Array of number')
  t.false(checkArray({}), 'Pass empty object')
})

/*
test(`Test a Array union type`, t => {

})
*/

test('Should able to check basic object type', t => {
  t.true(checkObject({}), 'Empty Object')
  t.true(checkObject({a: 1, b: 2}), 'Object with keys')
  const obj = function() {
    this.a = 1;
    this.b = 2;
  }
  t.false(checkObject(new obj()), 'Init a function object')
})
