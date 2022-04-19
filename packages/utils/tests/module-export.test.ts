// the import module keep complaining some of the module is not exported by the module.js ?
import test from 'ava'
const { urlParams, cacheBurstUrl } = require('../module')

test(`It should able to create an url using the params`, t => {

  const url = urlParams('http://localhost', {key1: 1, key2: 2})

  t.truthy(url.indexOf('?') > -1)

  const url1 = cacheBurstUrl(url)

  t.truthy(url1.indexOf('_cb') > -1)

})
