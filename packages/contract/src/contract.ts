// We now use an object style to generate contract
// this is for the Velocejs FastApi
import { join } from 'node:path'
import { writeJson } from 'fs-extra'
import {
  stripAllTypeParams
} from '@jsonql/ast'
import {
  // readOnly,
  // isEmptyObj,
  chainPromises,
  assign,
} from '@jsonql/utils'
import {
  JsonqlError
} from '@jsonql/errors'
import {
  REST_NAME,
  DATA_KEY,
  META_KEY,
  ERROR_KEY,
  // DEFAULT_CONTRACT_DIR,
  DEFAULT_CONTRACT_FILE_NAME,
  PUBLIC_CONTRACT_FILE_NAME,
  // JSONQL_NAME,
} from '@jsonql/constants'
import { getObjValue } from './common'
// main
export class JsonqlContract {
  // form the basic structure
  private _contract = {
    [DATA_KEY]: {},
    [META_KEY]: {},
    [ERROR_KEY]: {}
  }

  /** instead of run the parser again we just load the ast map */
  constructor(astMap: any, type = REST_NAME) {
    //we are going to add props to it
    this._contract[META_KEY] = { type }
    // @TODO jsonql
    switch (type) {
      case REST_NAME:
        const cleanObj = stripAllTypeParams(astMap)
        this._contract[DATA_KEY] = getObjValue(cleanObj)
        break
      default:
        // @TODO
    }
  }

  /** insert extrac data */
  public data(name: string, value: any): void {
    const contract = assign({}, this._contract) // work on the copy
    this._contract = contract.map((c: any) => {
      if (c.name === name) {
        return assign(c, value)
      }
      return c
    })
  }

  /** this will always overwrite the last one */
  public error(error: JsonqlError): void {
    this._contract[ERROR_KEY] = error
  }

  /** always make sure it's immutable */
  public meta(entry: any): void {
    this._contract[META_KEY] = assign({}, this._contract[META_KEY], entry)
  }

  /** generate the contract pub false then just the raw output for server use */
  public output(pub = true): any {
    const contract = this._contract
    if (pub) {
      // @TODO what info we need to strip out
    }
    return contract
  }

  /** we output several different contracts all at once */
  public async write(outDir: string): Promise<any> {

    return chainPromises([
      [DEFAULT_CONTRACT_FILE_NAME, this.output(false)], // server contract
      [PUBLIC_CONTRACT_FILE_NAME, this.output()] // public contract
    ].map(([file, contract]) =>
      writeJson(join(outDir, file), contract, { spaces: 2})
    ))
  }

}
