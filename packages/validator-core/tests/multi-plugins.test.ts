import test from 'ava'
import { ValidatorPlugins } from '../src'
import { JsonqlValidationPlugin } from '../src/types'
import { ValidationError } from '@jsonql/errors'

let plugin: ValidatorPlugins
test.before(()=> {
  plugin = new ValidatorPlugins()
  plugin.registerPlugin('MyCustomPlugin1', {
    main: function(value: string) {
      return value !== 'Hello World!'
    }
  })
})

test(`Should able to add multiple validator and retrieve them later`, async t => {

  plugin.registerPlugin('MyCustomPlugin2', {
    main: function(x: number, value: number) {
      return x !== value
    },
    params: ['x']
  })

  const fn1 = plugin.lookupPlugin({ plugin: 'MyCustomPlugin1'}, 'someArg')
  const fn2 = plugin.lookupPlugin({ plugin: 'MyCustomPlugin2', x: 100}, 'someOtherArg')

  const result2 = await fn2(200, {}, [1,1])

  t.truthy(result2)

  t.truthy(fn1)
  t.truthy(fn2)
})

test('Export should export list of plugins when pass false to export', t => {
  t.plan(4)
  // add one more with async method
  plugin.registerPlugin('MyCustomPlugin3', {
    main: async function(c: number, value: number) {
      return value !== c
    },
    params: ['c']
  })

  const plugins = plugin.export(false)
  const names = ['MyCustomPlugin1', 'MyCustomPlugin2', 'MyCustomPlugin3']

  t.is(plugins.length, 3)

  plugins.forEach((plugin: JsonqlValidationPlugin) => {
    t.true(names.includes(plugin.name))
  })
})

test(`Should able to handle async main function`, async t => {
  const fn3 = plugin.lookupPlugin({ plugin: 'MyCustomPlugin3', c: 1000}, 'dummy')
  t.plan(1)

  return fn3(1000, {}, [1,2])
          .catch((error: ValidationError) => {
            t.deepEqual(error.detail, [1,2])
          })
})
