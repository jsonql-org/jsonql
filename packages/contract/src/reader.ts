// This class received the contract then allow you to query it
import { readOnly } from '@jsonql/utils'
import { JsonqlContractTemplate } from './types'

export class JsonqlContractReader {
  private _contract: JsonqlContractTemplate

  constructor(contract: JsonqlContractTemplate) {
    this._contract = readOnly(contract)
  }




}
