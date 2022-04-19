const test = require('ava')
const { join } = require('path')
const { inspect } = require('util')
const debug = require('debug')('jsonql-params-validator:combine-test')
// import the test subject
const { validateSync, normalizeArgs } = require('../index')
// get some data to test
const fsx = require('fs-extra')
const contractJson = fsx.readJsonSync(join(__dirname, 'fixtures', 'contract.json'))

test("It should able to skip checking when the call require no argument", t => {
  t.deepEqual([], validateSync(undefined, contractJson.query.helloWorld.params))
})

test('It should able to handle optional parameters', t => {
  // This one param3 and param4 are optional without default value
  let params = contractJson.query.getSomething.params;

  let args1 = ['stock string'];
  t.deepEqual([], validateSync(args1, params), 'Calling function with the only require argument')

  let args2 = ['stock string', 'not a number']
  let result2 = validateSync(args2, params)
  t.is(1, result2[0].index, 'Calling function with a wrong argument')

  let args3 = ['stock string', 12, null, 10]
  let result3 = validateSync(args3, params)
  t.deepEqual([], result3, 'Calling function with a null value to skip the parameter')

  let args4 = ['stock string', null, null, 'not a number']
  let result4 = validateSync(args4, params)
  t.is(3, result4[0].index, 'where there is one argument from the optional is incorret')
  // when there is nothing right in the entire argument
  let args5 = [true, null, null, 'not a number']
  let result5 = validateSync(args5, params)
  t.deepEqual([0, 3], [result5[0].index, result5[1].index], 'When there is nothing right in the entire argument')
  // test when there is noting pass to the function
  let result6 = validateSync([], params)
  t.true(result6.length > 0, 'where there is nothing pass to the function')

})

test('Test a standard input that will pass (query.getOthers)', t => {
  let params = contractJson.query.getOthers.params;
  let args = ['I am string', 123, 'something else']
  t.deepEqual([], validateSync(args, params))
  // take one off the args and it should fail
  t.is(2, validateSync(args.filter(a => a!==123), params)[0].index)
})

test('Test an object with keys specify (mutation.setDetailObj)', t => {
  let params = contractJson.mutation.setDetailObj.params;
  let args = [{
    key: 'stringKey',
    update: 'Some content for update'
  }, {
    id: [1,2,3]
  }]
  t.deepEqual([], validateSync(args, params))
})

test('Test an input with variable=true AKA unknown number of input (query.getAnything)', t => {
  let params = contractJson.query.getAnything.params;
  let argsFail = ['1', '2', 3]
  t.notDeepEqual([],validateSync(argsFail, params))

  let argsPass = ['a', 'b', 'c', 'd']
  t.deepEqual([], validateSync(argsPass, params))
})

test('Test an array with array.<T> pattern (query.arrayOfParams)', t => {
  let params = contractJson.query.arrayOfParams.params;
  let argsPass = [
    [3,2,1]
  ]
  t.deepEqual([], validateSync(argsPass, params))
  let argsFail = [
    [3,2,'abc']
  ]
  const result = validateSync(argsFail, params)
  // debug('test array<number> result', result);
  // the reason it's 0 because this is the index of params in the array
  // not within which value failed
  t.is(0, result[0].index)
})

// This failed again?
test('Test an array with array.<T|A> pattern', t => {
  let args = [1, 2, 3, 'a', 'b']
  const params = [{
    type: ['array.<number|string>'],
    name: 'dummy',
    description: 'Array of number or string'
  }]
  t.deepEqual([], validateSync([args], params))
  // this one is problematic
  const failArgs = args.concat([{msg: 'should not be here'}])
  const result = validateSync([failArgs], params)

  debug('test failed array.<number|string> result', result)

  t.notDeepEqual([], result)

})
