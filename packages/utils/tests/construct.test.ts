// this is ported back from jsonql-params-validator
const test = require('ava')
const { isContract, isObjectHasKey, assign, freeze } = require('../main')
const debug = require('debug')('jsonql-utils:construct')

test("It should able to check if an object is contract or not", t => {

    t.false(isContract('contract'))
    t.false(isContract([]))
    t.false(isContract({}))

    const contract = {query: {getSomething: {}}}

    t.deepEqual(isContract(contract), contract)
})

test("Test isObjectHasKey is exported or not", t => {
  const client = {query: {}, mutation: false, socket: null};

  t.true(isObjectHasKey(client, 'mutation'))
  t.true(isObjectHasKey(client, 'socket'))

  t.false(isObjectHasKey(client, 'auth'))

})

test(`Testing the assign method`, t => {
  const keys = ['a', 'b', 'c']
  const result = [1,2,3]
    .map((num, i) => {
      debug(i, num)
      return {
        [keys[i]]: num 
      }
    })
    .reduce(assign, {})

  debug('assign result', result)

  t.is(result['a'], 1)
  t.is(result['b'], 2)
  t.is(result['c'], 3)

})


test(`Testing the freeze method`, t => {

  let obj = {name: 'Joel', id: 1}

  obj = freeze(obj)

  const check = Object.isFrozen(obj)

  t.true(check, 'isFreeze')

  obj.name = 'Jack'

  t.is(obj.name, 'Joel', 'Can not change the property')

  obj = freeze(obj)

  debug(`freeze it again make no different`, obj)

})