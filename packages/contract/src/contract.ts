// We now use an object style to generate contract
// this is for the Velocejs FastApi
import { join } from 'node:path'
import { outputJson } from 'fs-extra'
import {
  stripAllTypeParams,
} from '@jsonql/ast'
import {
  chainPromises,
  assign,
} from '@jsonql/utils'
import {
  JsonqlError,
  templateErrorObject
} from '@jsonql/errors'
import {
  REST_NAME,
  DATA_KEY,
  META_KEY,
  ERROR_KEY,
  DEFAULT_CONTRACT_FILE_NAME,
  PUBLIC_CONTRACT_FILE_NAME,
} from '@jsonql/constants'
import { getObjValue } from './common'
import {
  JsonqlContractEntry,
  JsonqlContractTemplate,
  JsonqlContractMetaEntry,
  JsonqlContractExtraEntry,
} from './types'
// main
export class JsonqlContract {
  // form the basic structure
  private _contract: JsonqlContractTemplate = {
    [DATA_KEY]: [],
    [META_KEY]: { type: ''},
    [ERROR_KEY]: templateErrorObject
  }

  /** instead of run the parser again we just load the ast map */
  constructor(astMap: any, type = REST_NAME) {
    //we are going to add props to it
    this._contract[META_KEY] = { type }
    // @TODO jsonql
    switch (type) {
      case REST_NAME:
        this._contract[DATA_KEY] = this._prepareData(astMap)
        break
      default:
        // @TODO
    }
  }

  /**
   * need to change the format for our use
   */
  private _prepareData(astMap: any) {
    const cleanObj = stripAllTypeParams(astMap)
    const c = getObjValue(cleanObj)
    const l: Array<JsonqlContractEntry> = []
    for (const methodName in c) {
      l.push({
        name: methodName,
        params: c[methodName]
      })
    }

    return l
  }

  /** insert extra data */
  public data(name: string, value: JsonqlContractExtraEntry): void {
    const contractData = this._contract[DATA_KEY] as Array<JsonqlContractEntry>
    this._contract[DATA_KEY] = contractData.map((c: JsonqlContractEntry) => (
       c.name === name ? assign(c, value) : c
    ))
  }

  /** this will always overwrite the last one */
  public error(error: JsonqlError): void {
    this._contract[ERROR_KEY] = error
  }

  /** always make sure it's immutable */
  public meta(entry: JsonqlContractMetaEntry): void {
    this._contract[META_KEY] = assign({}, this._contract[META_KEY], entry)
  }

  /** generate the contract pub false then just the raw output for server use */
  public output(pub = true): JsonqlContractTemplate {
    const contract = this._contract
    if (pub) {
      // @TODO what info we need to strip out
    }
    return contract
  }

  /** we output several different contracts all at once */
  public async write(outDir: string): Promise<string> {

    return chainPromises([
      [DEFAULT_CONTRACT_FILE_NAME, this.output(false)], // server contract
      [PUBLIC_CONTRACT_FILE_NAME, this.output()] // public contract
    ].map(async ([file, contract]) => {
      const dest = join(outDir, file as unknown as string)
      return outputJson(dest, contract, { spaces: 2})
                .then(() => dest)
    }))
  }

}
