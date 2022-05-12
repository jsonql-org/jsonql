import test from 'ava'
import { join } from 'node:path'
import { readJsonSync } from 'fs-extra'
import {
  JsonqlContractReader,
  DEFAULT_CONTRACT_FILE_NAME
} from '../src'
const contractFile = join(__dirname, 'fixtures', 'contracts', DEFAULT_CONTRACT_FILE_NAME)
let reader: JsonqlContractReader

test.before(() => {
  const json = readJsonSync(contractFile)
  reader = new JsonqlContractReader(json)
})

test(`Testing the JsonqlContractReader`, t => {
  const data = reader.data()
  console.dir(data, { depth: null })
  t.truthy(data)
})
