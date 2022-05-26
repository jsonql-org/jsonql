import test from 'ava'
import { ValidatorPlugins } from '../src'
import { JsonqlValidationPlugin } from '../src/types'

let plugin: ValidatorPlugins
test.before(()=> {
  plugin = new ValidatorPlugins()
  plugin.registerPlugin('MyCustomPlugin1', {
    main: function(value: string) {
      return value !== 'Hello World!'
    }
  })
})

test(`Should able to add multiple validator and retrieve them later`, t => {

  plugin.registerPlugin('MyCustomPlugin2', {
    main: function(x: number, value: number) {
      return x !== value
    },
    params: ['x']
  })

  const fn1 = plugin.lookupPlugin({ plugin: 'MyCustomPlugin1'}, 'someArg')
  const fn2 = plugin.lookupPlugin({ plugin: 'MyCustomPlugin2', x: 100}, 'someOtherArg')

  t.truthy(fn1)
  t.truthy(fn2)

})

test('Export should export list of external register plugins', t => {
  t.plan(3)
  const plugins = plugin.export()
  const names = ['MyCustomPlugin1', 'MyCustomPlugin2']

  t.is(plugins.length, 2)

  plugins.forEach((plugin: JsonqlValidationPlugin) => {
    t.true(names.includes(plugin.name))
  })
})
