import test from 'ava'
import { ValidatorPlugins } from '../src'

test(`Should able to add multiple validator and retrieve them later`, t => {

  const plugin = new ValidatorPlugins()

  plugin.registerPlugin('MyCustomPlugin1', {
    main: function(value: string) {
      return value !== 'Hello World!'
    }
  })

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
  // console.log(fn1.toString())
})
