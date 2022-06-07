// testing the export function
import test from 'ava'
import { ValidatorPlugins } from '../src/validator-plugins'
import type {
  JsonqlValidationPlugin,
} from '../src/types'

class VP2 extends ValidatorPlugins {
  registerExternalPlugin(
    name: string,
    pluginConfig: JsonqlValidationPlugin
  ) {
    this._registerExternalPlugin(name, pluginConfig)
  }
}

let vp1: ValidatorPlugins
let vp2: VP2

test.before(() => {
  vp1 = new ValidatorPlugins()
  vp2 = new VP2()
})

test(`test isBuiltIn method`, t => {

  t.true(vp1.isBuiltIn('moreThan'))

  t.false(vp1.isBuiltIn('myDummy'))
})

test(`Faking register plugin and external plugins`, t => {

  vp2.registerPlugin('myDummy', {
    main(value: string) {
      return value !== 'dummy'
    }
  })

  vp2.registerExternalPlugin('NotMyDummy', {
    main(value: string) {
      return value !== 'not dummy'
    }
  })

  const list = vp2.export()

  t.truthy(list.filter(config => config.name === 'NotMyDummy').length)

})
