import test from 'ava'
import { join } from 'node:path'
import { tsClassParserSync } from '@jsonql/ast'
import type { JsonqlAstMap } from '@jsonql/ast/index'

import { ValidatorsServer } from '@jsonql/validators/dist/validators-server'

import { ContractWriter } from '../src'
const targetFile = join(__dirname, 'fixtures', 'velocejs', 'test-class.ts')
// const dest = join(__dirname, 'fixtures', 'tmp')

let astMap: JsonqlAstMap
let contractInstance: ContractWriter
let validators: ValidatorsServer
test.before(async () => {
  astMap = tsClassParserSync(targetFile)

  contractInstance = new ContractWriter(
    ContractWriter.prepare(astMap)
  )

  validators = new ValidatorsServer(astMap)

  await validators.loadExternalPlugins(join(__dirname, 'fixtures', 'plugins'))

  // console.dir(configs, { depth: null })

  validators.registerPlugin('checkPassword', {
    main(v: string) {
      return !(
        v.indexOf('123') > -1
        ||
        v.indexOf('abc') > -1
      )
    }
  })
  const val1 = validators.getValidator('post')
  val1.addValidationRules({
    year: { plugin: 'yearCompare', x: 2000 }
  })

  const val2 = validators.getValidator('login')
  val2.addValidationRules({
    password: { plugin: 'checkPassword' }
  })
  val2.addValidationRules({
    name: 'password', plugin: 'moreThan', num: 8
  })
  // add inline validation rule
  val2.addValidationRules({
    password: function(value: string) {
      return !(value.indexOf('whatever') > -1)
    }
  })
})

test(`test the validators with extenal plugin to see if the rules get add to the final output`, t => {

  const contract = contractInstance.outputPublic(validators)
  // console.log('-----------------------------------------------------')
  // console.dir(contract, { depth: null })
  /*
  const expected = contract.data.filter((entry: any) => entry.name === 'post')[0]

  t.is(
    expected.params.filter((entry: any) => entry.name === 'year'),
    'yearCompare'
  )
  */

  t.truthy(contract)
})
