// testing the writer with valdiations combine output
import test from 'ava'
import { join } from 'node:path'
import { tsClassParserSync } from '@jsonql/ast'
import type { JsonqlAstMap } from '@jsonql/ast/index'
// import * as fs from 'fs-extra'
/*
import {
  JsonqlContractEntry
} from '../src/types'
*/
import { Validators } from '@jsonql/validators'

import { JsonqlContractWriter } from '../src'
const targetFile = join(__dirname, 'fixtures', 'velocejs', 'test-class.ts')
// const dest = join(__dirname, 'fixtures', 'tmp')

let astMap: JsonqlAstMap
let contractInstance: JsonqlContractWriter
let validators: Validators
test.before(() => {
  astMap = tsClassParserSync(targetFile)

  contractInstance = new JsonqlContractWriter(astMap)

  validators = new Validators(astMap)

  validators.registerPlugin('YearCompare', {
    main(x: number, v: string) {
      return parseInt(v) > x
    }
  })
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
    year: { plugin: 'YearCompare', x: 2000 }
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
/*
test.after(() => {
  // @TODO remove the test files
  fs.removeSync(dest)
})
*/
test(`Should able to have a contract with validation info`, t => {
  const { schema } = validators.export()
  // console.dir( schema, { depth: null })
  contractInstance.appendValidations( schema )
  const contract = contractInstance.output()
  // console.log('-----------------------------------------------------')
  // console.dir(contract, { depth: null })
  t.truthy(contract)
})
