// testing the writer with valdiations combine output
import test from 'ava'
import { join } from 'node:path'
import { tsClassParserSync } from '@jsonql/ast'
import * as fs from 'fs-extra'
import {
  VALIDATION_KEY
  // DEFAULT_CONTRACT_FILE_NAME,
  // PUBLIC_CONTRACT_FILE_NAME,
} from '../src/constants'
/*
import {
  JsonqlContractEntry
} from '../src/types'
*/
import { Validators } from '@jsonql/validators'

import { JsonqlContractWriter } from '../dist'
const targetFile = join(__dirname, 'fixtures', 'velocejs', 'test-class.ts')
const dest = join(__dirname, 'fixtures', 'tmp')

let astMap: any
let contractInstance: JsonqlContractWriter
let validators: Validators
test.before(() => {
  astMap = tsClassParserSync(targetFile)
  contractInstance = new JsonqlContractWriter(astMap)
  // setup validators
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
    name: 'year', plugin: 'YearCompare', x: 2000
  })
  const val2 = validators.getValidator('login')
  val2.addValidationRules({
    name: 'password', plugin: 'checkPassword'
  })

})

test.after(() => {
  // @TODO remove the test files
  fs.removeSync(dest)
})

test(`Should able to have a contract with validation info`, t => {
  const schema = validators.export()

  contractInstance.data(VALIDATION_KEY, rules)

})
