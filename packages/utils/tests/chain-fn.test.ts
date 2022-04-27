// need to test the chain-fns because of the way we change the lodash import

import debugFn from 'debug'
const debug = debugFn('jsonql:utils:test:chain-fn')

import test from 'ava'
import {
  chainFns,
  chainPromises,
  chainProcessPromises,
  queuePromisesProcess,
  // showDeep
} from '../src'

declare type testNumFn = (num: number) => number
declare type testArrNumFn = (num: number, base: number) => number[]

test(`Test the chainPromises and see if one fail and what happen`, async t => {
  t.plan(1)

  const errorMsg = 'FAIL AND EXIT'
  const afn = async (x: any) => {
    return Promise.resolve(x)
  }
  // expect an object
  const afn1 = async (x) => {
    debug('x', x)
    return Promise.reject(errorMsg)
    // return Promise.resolve({x: ++x, y: ++y, z: 1})
  }
  const afn2 = async () => {
    console.log(`Should never see me (but I still run ...)`)
    return Promise.resolve(2)
  }

  return chainPromises([afn(1), afn1(1), afn2()])
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      t.pass()
    })
})

test(`Test to see if one of the promise fail and it should exit with queuePromisesProcess`, async t => {

  const errorMsg = 'FAIL AND EXIT'
  const fn = async (x: any) => {
    return Promise.resolve(x)
  }
  // expect an object
  const fn1 = async (x) => {
    debug('x', x)
    return Promise.reject(errorMsg)
    // return Promise.resolve({x: ++x, y: ++y, z: 1})
  }
  const fn2 = async ({x, y, z}) => {
    console.log(`Should never see me run`)
    debug('x', x, 'y', y, 'z', z)
    return Promise.resolve(x + y + z)
  }

  return queuePromisesProcess([fn, fn1, fn2], 1)
            .then((result: number) => {
              console.log(result)
            })
            .catch((error: string) => {
              t.is(error, errorMsg)
            })
})


test('It should able to accept more than one functions after the first one', t => {
  const baseFn: testNumFn = (num) => num * 10;
  const add1: testNumFn = (num) => num + 1;
  const add2: testNumFn = (num) => num + 2;

  const fn = chainFns(baseFn, add1, add2)
  const result = fn(10)
  t.is(103, result)
})

test(`It should able to accept the last array return as spread input`, t => {
  const baseFn: testArrNumFn = (num, base) => {
    return [num + base, base]
  }
  const add1: testArrNumFn = (num, base) => {
    debug(num, base)
    return [num*base, base]
  }
  const add2: (a: number, b: number) => number = (num, base) => {
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
  // debug(result)
  t.truthy( result['key1'] )
  t.true( result.x === 'y' )
})

test(`It should able to take one promise result as the next promise result parameter and return one result`, async t => {
  // init function
  const fn = async (x: any, y: any) => {
    return Promise.resolve({x, y})
  }
  // expect an object
  const fn1 = async ({x, y}) => {
    debug('x', x, 'y', y)
    return Promise.resolve({x: ++x, y: ++y, z: 1})
  }
  const fn2 = async ({x, y, z}) => {
    debug('x', x, 'y', y, 'z', z)
    return Promise.resolve(x + y + z)
  }
  const executor = chainProcessPromises(fn, fn1, fn2)
  const result = await executor(1,2)

  t.is(result, 6)
})
