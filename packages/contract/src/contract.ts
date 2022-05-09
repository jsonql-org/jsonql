// We now use an object style to generate contract
// this is for the Velocejs FastApi
import { join } from 'node:path'
import { writeJson } from 'fs-extra'
import {
  stripAllTypeParams
} from '@jsonql/ast'
import {
  readOnly,
  // isEmptyObj,
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
  DEFAULT_CONTRACT_DIR,
  DEFAULT_CONTRACT_FILE_NAME,
  PUBLIC_CONTRACT_FILE_NAME,
  // JSONQL_NAME,
} from '@jsonql/constants'

// main
export class JsonqlContract {
  private _astMap: any
  // form the basic structure
  private _contract = {
    [DATA_KEY]: {},
    [META_KEY]: {},
    [ERROR_KEY]: {}
  }

  /** instead of run the parser again we just load the ast map */
  constructor(astMap: any, type = REST_NAME) {
    this._astMap = readOnly(astMap) // keep an original
    //we are going to add props to it
    this._contract[DATA_KEY] = stripAllTypeParams(astMap)
    this._contract[META_KEY] = { type }
  }

  /** insert into the object and make sure it's immutatable */

  /*
  protected insert(obj: any, entry: any, path: string) {
    const paths = path.split('.')
    const ctn = paths.length
    const _obj = {}
    for (let i = 0; i < ctn; ++i) {
      const key = paths[i]
      if ()
    }
  }
  */

  

  /** this will always overwrite the last one */
  public error(error: JsonqlError) {
    this._contract[ERROR_KEY] = error
  }

  /** always make sure it's immutable */
  public meta(entry: any) {
    this._contract[META_KEY] = assign({}, this._contract[META_KEY], entry)
  }

  /** we output several different contracts all at once */
  public write(outDir = DEFAULT_CONTRACT_DIR) {
    const contract = assign({}, this._contract)
    // need to process the pubic contract

  }

}
