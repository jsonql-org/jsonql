import test from 'ava'
import { ValidatorPlugins } from '../src/validator-plugins'
import { join } from 'node:path'

const pluginPath = join(__dirname, 'fixtures', 'external-plugin')

let plugin: ValidatorPlugins

test.before(() => {

  plugin = new ValidatorPlugins(1)
})


test(`Should able to use the ValidatorPlugin class to perform the same task`, t => {

  const result  = plugin.lookupPlugin({ plugin: 'int' }, 'someKey')

  t.true(typeof result === 'function')

})


test(`Test the load external methods`, async t => {
  t.plan(1)
  return import([pluginPath, 'js'].join('.'))
            .then(module => {
              // console.log(module)
              t.truthy(module.default)
            })
})

test(`Testing the idx options`, t => {

  t.is(plugin.$version, 1)

  const anotherPlugin = new ValidatorPlugins(2)

  t.is(anotherPlugin.$version, 2)
})
