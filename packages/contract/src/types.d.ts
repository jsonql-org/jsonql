// define your types here
// @TODO need to fix this from @jsonql/ast firs
import type { JsonqlProcessedEntry } from '@jsonql/ast/index'
import type { GeneralException } from '@jsonql/errors'

export type {
  JsonqlValidationPlugin,
  JsonqlPluginConfig,
  JsonqlValidationRule
} from '@jsonql/validators/index'

export type GenericKeyValue = {
  [key: string]: any
}

export type JsonqlContractEntry = Partial<{
  name: string
  params: Array<JsonqlProcessedEntry>
  route: string
  method: string
  file: string
}> & GenericKeyValue

export type JsonqlContractMetaEntry = {
  type?: string
  timestamp?: Array<number>
} & GenericKeyValue

export type JsonqlContractTemplate = {
  data: Array<JsonqlContractEntry> // | GenericKeyValue | string
  meta: JsonqlContractMetaEntry | null
  error?: GeneralException | null // the public contract dont need the error field
}

export type JsonqlRouteForContract = Array<JsonqlContractEntry>

// just fake one here
export type Validators = GenericKeyValue

export type { JsonqlProcessedEntry, GeneralException }


