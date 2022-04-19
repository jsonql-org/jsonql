// just general test to make sure all the functions are presented before publish
import test from 'ava'
const utilFns = require('../main')
const { merge } = require('lodash-es')
const debug = require('debug')('jsonql-utils:test:ns')
const { NSP_GROUP, PUBLIC_NAMESPACE } = require('jsonql-constants')
const { groupByNamespace, getNspInfoByConfig } = utilFns
const { join } = require('path')
const fsx = require('fs-extra')

const contract = fsx.readJsonSync(join(__dirname, 'fixtures', 'contract.json'))
const publicOnlyContract = fsx.readJsonSync(join(__dirname, 'fixtures', 'public-only-contract.json'))

test.before(t => {

  t.context.opts = {name: 'some name'}
  t.context.constProps = {contract: {query: {}, mutation: {}}}
  t.context.checkOptionsFn = (a, b, c) => merge({}, a, b, c)
})

test(`It should have certain functions in the export`, t => {
  t.truthy(utilFns.isFunc, 'There should be a isFunc method exported')
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
