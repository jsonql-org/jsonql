// define your types here
// @TODO need to fix this from @jsonql/ast firs
import { JsonqlProcessedEntry } from '@jsonql/ast/index'
import { JsonqlError } from '@jsonql/errors'

export type JsonqlContractPublicEntry = {
  name: string
  params: Array<JsonqlProcessedEntry>
}

export type JsonqlContractExtraEntry = {
  route?: string
  method?: string
}

export type JsonqlContractEntry = JsonqlContractExtraEntry & JsonqlContractPublicEntry & {
  file?: string
}

export type JsonqlContractMetaEntry = {
  type?: string
  timestamp?: Array<number>
}

export type JsonqlContractTemplate = {
  data: Array<JsonqlContractEntry | null>
  meta: JsonqlContractMetaEntry
  error?: JsonqlError | null // the public contract dont need the error field
}
