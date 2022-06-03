// define your types here
// @TODO need to fix this from @jsonql/ast firs
import { JsonqlProcessedEntry } from '@jsonql/ast/index'
import { JsonqlError } from '@jsonql/errors'

export type JsonqlContractEntry = {
  name?: string,
  params?: Array<JsonqlProcessedEntry>
  route?: string
  method?: string
  file?: string
  [key: string]: any
}

export type JsonqlContractMetaEntry = {
  type?: string
  timestamp?: Array<number>
}

export type JsonqlContractTemplate = {
  data: Array<JsonqlContractEntry>
  meta: JsonqlContractMetaEntry
  error?: JsonqlError | null // the public contract dont need the error field
}

export { JsonqlProcessedEntry, JsonqlError }
