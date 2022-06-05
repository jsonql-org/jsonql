
import test from 'ava'
import { ExternalPluginLoader } from '../src/external-plugin-loader'
import dummy from './fixtures/plugins/dummy'

let loader: ExternalPluginLoader
test.before(() => {

  loader = new ExternalPluginLoader()

  loader.registerPlugin('local', {
    main(value: number) {
      return value > 0
    }
  })

  loader.registerExternalPlugin('dummy', dummy)

})


test(`Should have an external field in the plugin config`, t => {

  const list = loader.export()

  const found = list.filter((l: any) => l.external === true)

  t.is(found.length, 1)
})
