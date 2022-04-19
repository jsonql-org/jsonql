const test = require('ava')
const contractJson = require('./fixtures/contract.json')
const {
  checkIsAny,
  checkIsArray,
  checkIsBoolean,
  checkIsNumber,
  checkIsObject,
  checkIsString,
  notEmpty
} = require('../src')

const debug = require('debug')('jsonql-params-validator:test:primitive-type')

test('checking if a value consider empty or not', t => {

  t.falsy( notEmpty(null) )
  t.falsy( notEmpty(undefined) )
  t.falsy( notEmpty('') )
  t.falsy( notEmpty(' ') )

  t.truthy( notEmpty(123) )
  t.truthy( notEmpty('abc') )
  t.truthy( notEmpty({}) )
  t.truthy( notEmpty([]) )

})


test('Should able to check any type', t => {
  t.true(checkIsAny('string'), 'Pass a string')
  t.false(checkIsAny(' '), 'Pass a space and this should not be allow')
  t.false(checkIsAny(null), 'Pass a null')
})

test('Should able to check string type', t => {
  t.true(checkIsString('string'), 'Pass a string')
  t.false(checkIsString(' '), 'Pass a space')
  t.false(checkIsString(1), 'Pass a number')
})

test('Should able to check number type', t => {
  t.true(checkIsNumber(1), 'Pass an integer')
  t.true(checkIsNumber(2.1), 'Pass a float')
  t.false(checkIsNumber(' '), 'Pass a space')
})

test('Should able to check boolean type', t => {
  t.true(checkIsBoolean(true), 'Pass true')
  t.true(checkIsBoolean(false), 'Pass false')
  t.false(checkIsBoolean(1), 'Pass 1 integer')
  t.false(checkIsBoolean(0), 'Pass a 0')
})

test('Should able to check basic array type', t => {
  t.true(checkIsArray([]), 'Empy array')
  t.true(checkIsArray([1,2,3]), 'Array of number')
  t.false(checkIsArray({}), 'Pass empty object')
})

test('Should able to check basic object type', t => {
  t.true(checkIsObject({}), 'Empty Object')
  t.true(checkIsObject({a: 1, b: 2}), 'Object with keys')
  const obj = function() {
    this.a = 1;
    this.b = 2;
  }
  t.false(checkIsObject(new obj()), 'Init a function object')
})
