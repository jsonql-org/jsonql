import test from 'ava'
import { join } from 'node:path'
import { readJsonSync } from 'fs-extra'
import {
  JsonqlContractReader,
  DEFAULT_CONTRACT_FILE_NAME
} from '../dist'
const contractFile = join(__dirname, 'fixtures', 'contracts', DEFAULT_CONTRACT_FILE_NAME)
let reader: JsonqlContractReader

test.before(() => {
  const json = readJsonSync(contractFile)
  reader = new JsonqlContractReader(json)
})

test(`Testing the JsonqlContractReader`, t => {
  const data = reader.data('1.name')
  // console.dir(data, { depth: null })
  t.is(data, 'someEndpoint')

  const meta = reader.meta('type')

  t.is(meta, 'rest')

  const error = reader.error()

  t.falsy(error)

})
