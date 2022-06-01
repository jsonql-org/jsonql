// We now use an object style to generate contract
// this is for the Velocejs FastApi
// @TODO add protobuf
import { join } from 'node:path'
import {
  outputJson,
  readJsonSync,
  existsSync,
} from 'fs-extra'
import {
  JsonqlAstMap
} from '@jsonql/ast/index'
import {
  chainPromises,
  assign,
} from '@jsonql/utils'
import {
  JsonqlError,
} from '@jsonql/errors'
import {
  REST_NAME,
  DATA_KEY,
  META_KEY,
  ERROR_KEY,
  DEFAULT_CONTRACT_FILE_NAME,
  PUBLIC_CONTRACT_FILE_NAME,
} from './constants'
import {
  JsonqlContractEntry,
  JsonqlContractTemplate,
  JsonqlContractMetaEntry,
} from './types'
import debugFn from 'debug'
const debug = debugFn(`jsonql:contract:class`)

// main
export class JsonqlContractWriter {
  // form the basic structure
  private _contract: JsonqlContractTemplate = {
    [DATA_KEY]: [],
    [META_KEY]: { type: ''},
    // [ERROR_KEY]: null // templateErrorObject
  }

  /** instead of run the parser again we just load the ast map */
  constructor(astMap: JsonqlAstMap, type: string = REST_NAME) {
    debug('astMap', astMap)
    //we are going to add props to it
    this.meta({ type })
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
  private _prepareData(astMap: JsonqlAstMap) {
    // const c = stripAllTypeParams(astMap)
    const l: Array<JsonqlContractEntry> = []
    for (const methodName in astMap) {
      let entry: JsonqlContractEntry = { name: methodName, params: [] }
      const params = astMap[methodName]
      if (Array.isArray(params)) {
        entry.params = params
      } else if (typeof params === 'object') {
        entry = assign(entry, params)
      }
      l.push(entry)
    }
    debug('prepared data', l)
    return l
  }

  /** insert extra data into node by name */
  public data(propertyName: string, value: JsonqlContractEntry): void {
    const contractData = this._contract[DATA_KEY] as Array<JsonqlContractEntry>
    // first to see if the name actually exist, we might want to add new entry
    const existed = contractData.filter((c: JsonqlContractEntry) => c.name === propertyName)
    if (existed.length) {
      this._contract[DATA_KEY] = contractData.map((c: JsonqlContractEntry) => (
        c.name === propertyName ? assign(c, value) : c
      ))
    } else { // add new entry
      this._contract[DATA_KEY].push(value as JsonqlContractEntry)
    }
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

  /** serving up the public contract */
  public async serve(cacheDir: string) {
    const jsonFile = join(cacheDir, PUBLIC_CONTRACT_FILE_NAME)
    if (!existsSync(jsonFile)) {
      await this.write(cacheDir)
    }

    return readJsonSync(jsonFile)
  }

  /** serve up the dynamic generated contract during transport */
  // @TODO

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
