// define your types here
// @TODO need to fix this from @jsonql/ast firs
import { JsonqlProcessedEntry } from '@jsonql/ast/types'

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
  type: string
  timestamp?: Array<number>
}

export type JsonqlContractTemplate = {
  data: Array<JsonqlContractEntry>
  meta: any
  error: any
}
