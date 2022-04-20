// just general test to make sure all the functions are presented before publish
import test from 'ava'

import * as utilFns from '../src'
import { merge } from '../src/lodash'
import debugFn from 'debug'
import * as fsx from 'fs-extra'
import { join } from 'path'
import { NSP_GROUP, PUBLIC_NAMESPACE } from '@jsonql/constants'
const { groupByNamespace, getNspInfoByConfig } = utilFns

const debug = debugFn('jsonql-utils:test:ns')

const contract = fsx.readJsonSync(join(__dirname, 'fixtures', 'contract.json'))
const publicOnlyContract = fsx.readJsonSync(join(__dirname, 'fixtures', 'public-only-contract.json'))

test.before(t => {
  // @ts-ignore
  t.context.opts = {name: 'some name'}
  // @ts-ignore
  t.context.constProps = {contract: {query: {}, mutation: {}}}
  // @ts-ignore
  t.context.checkOptionsFn = (a: object, b: object, c: object) => merge({}, a, b, c)
})

test(`It should have certain functions in the export`, t => {
  t.truthy(utilFns.isFunction, 'There should be a isFunc method exported')
  t.true(utilFns.isFunction(() => {}))
  t.truthy(utilFns.toArray, 'There should be a toArray method exported')
  t.false(utilFns.isNotEmpty('  '), 'isNotEmpty should able to check empty spaces')
})


test('It should able to give me two list from the contract', t => {
  const { size, publicNamespace } = groupByNamespace(contract)
  t.is(size, 2)
  t.is(publicNamespace, 'jsonql/public')
})

test('Should able to create nspGroup from config even when its public only', t => {
  const config = {enableAuth: false, contract: publicOnlyContract}

  const nspInfo = getNspInfoByConfig(config)

  t.truthy(nspInfo[NSP_GROUP])
  t.truthy(nspInfo[PUBLIC_NAMESPACE])

  t.truthy(nspInfo.namespaces)

  debug(nspInfo[NSP_GROUP], nspInfo.namespaces)

  t.is(nspInfo.size, 1)
})
