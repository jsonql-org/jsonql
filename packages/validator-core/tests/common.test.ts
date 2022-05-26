import test from 'ava'
import { isAsyncFn } from '../src/lib/common'
import { ValidatorPlugins } from '../src'

test('Test if a function is async or not', t => {

  const asyncFn = async ( value: number ) => value

  t.true(isAsyncFn(asyncFn))

  const notAsyncFn = (value: number) => value

  t.false(isAsyncFn(notAsyncFn))

})

test(`Should able to get an internal plugin`, t => {

  const plugin = new ValidatorPlugins()

  const fn = plugin.lookupPlugin({ plugin: 'moreThan', num: 100}, 'myArg')

  t.true(isAsyncFn(fn))
})
