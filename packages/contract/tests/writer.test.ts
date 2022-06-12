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

import { ContractWriter } from '../src'
const targetFile = join(__dirname, 'fixtures', 'velocejs', 'test-class.ts')
// const dest = join(__dirname, 'fixtures', 'tmp')

let astMap: JsonqlAstMap
let contractInstance: ContractWriter
let validators: Validators
test.before(() => {
  astMap = tsClassParserSync(targetFile)

  contractInstance = new ContractWriter(
    ContractWriter.prepare(astMap)
  )

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

test(`Should able to have a contract with validation info and auto insert validate key`, t => {

  const contract = contractInstance.outputPublic(validators)
  const someEndpoint = contract.data.filter((entry) => entry.name === 'someEndpoint')[0]

  t.false(someEndpoint.validate)
  // t.truthy(contract)
})

test(`Should able to excluded some of the api from validation`, t => {

  contractInstance.$excludeValidation.add('login')
  const contract = contractInstance.outputPublic(validators)
  // console.dir(contract, { depth: null })
  const login = contract.data.filter((entry) => entry.name === 'login')[0]

  t.false(login.validate)
})
