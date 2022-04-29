import test from 'ava'

import { getPlugin } from '../src/plugins'


test(`Test the import plugin method`, async t => {

  const fn = await getPlugin('email')

  console.log(fn)

  t.truthy(fn)

})
