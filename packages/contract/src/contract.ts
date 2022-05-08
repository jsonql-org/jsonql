// We now use an object style to generate contract
// this is for the Velocejs FastApi
import {
  stripAllTypeParams
} from '@jsonql/ast'
import {
  readOnly
} from '@jsonql/utils'
import {
  JsonqlError
} from '@jsonql/errors'

export class JsonqlContract {
  private _astMap: any
  private _contract = { data: {}, meta: {}, error: {} }

  /** instead of run the parser again we just load the ast map */
  constructor(astMap: any, type = '') {
    this._astMap = readOnly(astMap) // keep an original
    //we are going to add props to it
    this._contract.data = stripAllTypeParams(astMap)
  }

  // we are going to have three root properties
  public data(entry: any, path?: string) {
    this._contract.data = entry
  }

  public error(error: JsonqlError) {
    this._contract.error = error
  }

  public meta(entry: any, path?: string) {
    this._contract.meta
  }

  /** we output several different contracts all at once */
  public write(outDir: string) {

  }

}
