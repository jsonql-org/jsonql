import test from 'ava'
import { ValidatorPlugins } from '../src/validator-plugins'
import { join } from 'node:path'

const pluginPath = join(__dirname, 'fixtures', 'external-plugin')

let plugin: ValidatorPlugins

test.before(() => {

  plugin = new ValidatorPlugins()
})


test(`Should able to use the ValidatorPlugin class to perform the same task`, t => {

  const result  = plugin.lookupPlugin({ plugin: 'int' }, 'someKey')

  t.true(typeof result === 'function')

  const names = plugin.getPluginNames()
  t.true(names.length > 0)
})


test(`Test the load external methods`, async t => {
  t.plan(1)

  return import([pluginPath, 'js'].join('.'))
            .then(module => {
              // console.log(module)
              t.truthy(module.default)
            })
})
