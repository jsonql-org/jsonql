// define your types here
// @TODO need to fix this from @jsonql/ast firs
// import { JsonqlProcessedEntry } from '@jsonql/ast/types'
export type JsonqlProcessedEntry = {
  name: string
  required: boolean
  type: string
  tstype?: string
  defaultvalue?: any
  types?: any
  typeParams?: any
}

export type JsonqlContractPublicEntry = {
  name: string
  params: Array<JsonqlProcessedEntry>
  route?: string
  method?: string
}

export type JsonqlContractEntry = JsonqlContractPublicEntry & {
  file?: string
}
