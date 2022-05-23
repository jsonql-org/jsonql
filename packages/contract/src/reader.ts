// This class received the contract then allow you to query it
import { readOnly, accessByPath } from '@jsonql/utils'
import { JsonqlContractTemplate } from './types'
import { DATA_KEY, META_KEY, ERROR_KEY } from '@jsonql/constants'
// @TODO add protobuf 

export class JsonqlContractReader {
  private _contract: JsonqlContractTemplate

  constructor(contract: JsonqlContractTemplate) {
    this._contract = readOnly(contract)
  }

  private _access(key: string, path?: string) {
    const d = this._contract[key]
    if (path) {
      return accessByPath(d, path)
    }
    return d
  }

  data(path?: string) {
    return this._access(DATA_KEY, path)
  }

  meta(path?: string) {
    return this._access(META_KEY, path)
  }

  error(path?: string) {
    return this._access(ERROR_KEY, path)
  }

}
