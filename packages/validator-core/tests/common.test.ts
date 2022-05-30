import test from 'ava'
import { paramMatches, extractFnArgs } from '../src/lib/common'
import { ValidatorPlugins } from '../src'


test(`Should able to get an internal plugin`, async t => {

  const plugin = new ValidatorPlugins()

  const fn = plugin.lookupPlugin({ plugin: 'moreThan', num: 100}, 'myArg')

  // t.true(isAsyncFn(fn))

  const result = await fn(101, {}, [0,1])
  t.truthy(result)
  /*
  const error = await fn(99, {}, [0, 1])
  console.log(error)
  t.deepEqual(error.detail, [0,1])
  */
})

test('Test the extractFnArgs in different situtation', t => {

  const fn1 = function(x: number, y: number, v: number) {
    return x + y + v
  }
  const fn2 = (x: number, y: number, v: number) => x + y + v
  const fn3 = function add(x: number, y: number, v: number) {
    return x + y + v
  }
  const fn4 = async function(x: number, y: number, v: number) {
    return x + y + v
  }
  const fn5 = async (x: number, y: number, v: number) => x + y + v

  const expected = ['x', 'y', 'v']

  const r1 = extractFnArgs(fn1.toString())
  const r2 = extractFnArgs(fn2.toString())
  const r3 = extractFnArgs(fn3.toString())
  const r4 = extractFnArgs(fn4.toString())
  const r5 = extractFnArgs(fn5.toString())

  t.deepEqual(r1, expected)
  t.deepEqual(r2, expected)
  t.deepEqual(r3, expected)
  t.deepEqual(r4, expected)
  t.deepEqual(r5, expected)
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
