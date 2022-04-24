// this is ported back from jsonql-params-validator
import test from 'ava'
import { isContract, objectHasKey, assign, readOnly } from '../src'
import debugFn from 'debug'

const debug = debugFn('jsonql-utils:construct')

test("It should able to check if an object is contract or not", t => {
    // @ts-ignore
    t.false(isContract('contract'))
    // @ts-ignore
    t.false(isContract([]))
    t.false(isContract({}))
    const contract = {query: {getSomething: {}}}
    t.deepEqual(isContract(contract), contract)
})

test("Test objectHasKey is exported or not", t => {
  const client = {query: {}, mutation: false, socket: null};
  t.true(objectHasKey(client, 'mutation'))
  t.true(objectHasKey(client, 'socket'))
  t.false(objectHasKey(client, 'auth'))
})

test(`Testing the assign method`, t => {
  const keys = ['a', 'b', 'c']
  const result = [1,2,3]
                  .map((num, i) => ({ [keys[i]]: num }))
                  .reduce(assign, {})
  t.is(result['a'], 1)
  t.is(result['b'], 2)
  t.is(result['c'], 3)
})

test(`Testing the freeze method`, t => {
  let obj = {name: 'Joel', id: 1}
  obj = readOnly(obj)
  const check = Object.isFrozen(obj)
  t.true(check, 'isFreeze')
  obj.name = 'Jack'
  t.is(obj.name, 'Joel', 'Can not change the property')
  obj = readOnly(obj)
  debug(`freeze it again make no different`, obj)
})
