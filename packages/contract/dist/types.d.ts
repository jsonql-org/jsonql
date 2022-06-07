// define your types here
// @TODO need to fix this from @jsonql/ast firs
import type { JsonqlProcessedEntry } from '@jsonql/ast/index'
import type { GeneralException } from '@jsonql/errors'

export type {
  JsonqlValidationPlugin,
  JsonqlPluginConfig,
  JsonqlValidationRule
} from '@jsonql/validators/index'

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
  [key: string]: any
}

export type JsonqlContractTemplate = {
  data: Array<JsonqlContractEntry>
  meta: JsonqlContractMetaEntry
  error?: GeneralException | null // the public contract dont need the error field
}

export type JsonqlRouteForContract = Array<JsonqlContractEntry>

export type { JsonqlProcessedEntry, GeneralException }
