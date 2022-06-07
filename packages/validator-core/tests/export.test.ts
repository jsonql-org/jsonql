// testing the export function
import test from 'ava'
import { ValidatorPlugins } from '../src/validator-plugins'


let vp1: ValidatorPlugins
let vp2: ValidatorPlugins

test.before(() => {
  vp1 = new ValidatorPlugins()
  vp2 = new ValidatorPlugins()
})

test(`test isBuiltIn method`, t => {

  t.true(vp1.isBuiltIn('moreThan'))

  t.false(vp1.isBuiltIn('myDummy'))
})

test(`Faking register plugin and external plugins`, t => {
  

})
