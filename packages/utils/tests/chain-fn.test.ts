// need to test the chain-fns because of the way we change the lodash import

import debugFn from 'debug'
const debug = debugFn('jsonql-utils:test:chain-fn')

import test from 'ava'
import { chainFns, chainPromises, chainProcessPromises } from '../src'



test('It should able to accept more than one functions after the first one', t => {
  const baseFn = (num) => num * 10;
  const add1 = (num) => num + 1;
  const add2 = (num) => num + 2;

  const fn = chainFns(baseFn, add1, add2)
  const result = fn(10)
  t.is(103, result)
})

test(`It should able to accept the last array return as spread input`, t => {
  const baseFn = (num, base) => {
    return [num + base, base]
  }
  const add1 = (num, base) => {
    debug(num, base)
    return [num*base, base]
  }
  const add2 = (num, base) => {
    debug(num, base)
    return num - base;
  }
  const fn = chainFns(baseFn, add1, add2)
  const result = fn(1, 10)
  t.is(result, 100)
})

test(`It should able to merge the promise result together as one object`, async t => {
  let ps = []
  for (let i = 0; i < 3; ++i) {
    ps.push(Promise.resolve({['key' + i]: i}))
  }
  const result = await chainPromises(ps, {x: 'y'})

  debug(result)

  t.truthy( result['key1'] )
  t.true( result.x === 'y' )
})

test(`It should able to take one promise result as the next promise result parameter and return one result`, async t => {
  // init function
  const fn = (x, y) => {
    return Promise.resolve({x, y})
  }

  // expect an object
  const fn1 = ({x, y}) => {
    debug('x', x, 'y', y)
    return Promise.resolve({x: ++x, y: ++y, z: 1})
  }

  const fn2 = ({x, y, z}) => {
    debug('x', x, 'y', y, 'z', z)
    return Promise.resolve(x + y + z)
  }

  const executor = chainProcessPromises(fn, fn1, fn2)
  const result = await executor(1,2)

  t.is(result, 6)

})
