// testing and develop further for the return check methods
import test from 'ava'
import { join } from 'path'
import * as fsx from 'fs-extra'
import {
  QUERY_NAME,
  DATA_KEY,
  ERROR_KEY
} from '@jsonql/constants'
import {
  checkResolverReturns,
  checkResolverReturnsAsync
} from '../src'
import debugFn from 'debug'
const debug = debugFn('jsonql-params-validator:test:return')

test.before(t => {
  t.context = {
    contract:  fsx.readJsonSync(join(__dirname, 'fixtures', 'contract.json'))
  }
})

test(`Test the checkResolverReturns`, t => {

  const value = 1 //'whatever'

  // debug('toArray', [...value])

  const result = checkResolverReturns(QUERY_NAME, 'getAnything', t.context.contract, value)

  debug('result', result)

  t.truthy(result[ERROR_KEY].length)
})

test.cb(`test the checkResolverReturnsAsync`, t => {
  const value = 'whatever'
  t.plan(1)
  checkResolverReturnsAsync(QUERY_NAME, 'getAnything', t.context.contract, value)
    .then(result => {
      t.truthy(result[DATA_KEY].length)
      t.end()
    })
})
