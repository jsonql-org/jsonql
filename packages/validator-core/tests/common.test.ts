import test from 'ava'
import { isAsyncFn, paramMatches } from '../src/lib/common'
import { ValidatorPlugins } from '../src'

test('Test if a function is async or not', t => {

  const asyncFn = async ( value: number ) => value

  t.true(isAsyncFn(asyncFn))

  const notAsyncFn = (value: number) => value

  t.false(isAsyncFn(notAsyncFn))

})

test(`Should able to get an internal plugin`, async t => {

  const plugin = new ValidatorPlugins()

  const fn = plugin.lookupPlugin({ plugin: 'moreThan', num: 100}, 'myArg')

  t.true(isAsyncFn(fn))

  const result = await fn(101, {}, [0,1])
  t.truthy(result)
  /*
  const error = await fn(99, {}, [0, 1])
  console.log(error)
  t.deepEqual(error.detail, [0,1])
  */
})


test(`testing paramMatchs to check if the params provide match the required signature`, t => {
  const def = {
    main: function(x: number, y: number, v: number) {
      return (x + y) === v
    },
    params: ['x', 'y']
  }
  const p1 = paramMatches(def)
  t.true(p1)

  def.params = ['y', 'x']
  const p2 = paramMatches(def)
  t.false(p2)

  const def1 = {main: def.main}
  const p3 = paramMatches(def1)
  t.false(p3)

  const p4 = paramMatches({ main: (v: number) => v})
  t.true(p4)

})
