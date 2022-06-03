import test from 'ava'
import { ValidatorPlugins } from '../src/validator-plugins'
import { join } from 'node:path'

const pluginPath = join(__dirname, 'fixtures', 'external-plugin')

let plugin: ValidatorPlugins

test.before(() => {

  plugin = new ValidatorPlugins(1)
})


test(`Should able to use the ValidatorPlugin class to perform the same task`, t => {

  const result1 = plugin.lookupPlugin({ plugin: 'int' }, 'someKey')

  t.true(typeof result1 === 'function')

  const result2 = plugin.lookupPlugin({ plugin: 'moreThan', num: 100}, 'SomeValue')

  t.true(typeof result2 === 'function')

})

test('registerPlugin should able to auto create the params', async t => {

  plugin.registerPlugin('myCoolPlugin', {
    main(x: number, y: number, v: number) {
      return (x + y) > v
    }
  })

  const validateFn = plugin.lookupPlugin({ plugin: 'myCoolPlugin', x: 10, y: 20}, 'someInput')

  const result = await validateFn(5, undefined, [0,2])

  t.truthy(result)
})

test(`Search for non-existing plugin should throw error`, t => {

  t.throws(() => {
    return plugin.lookupPlugin({ plugin: 'nonExistPlugin', x: 10, y: 20}, 'someInput')
  })

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
