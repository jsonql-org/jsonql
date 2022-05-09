// We now use an object style to generate contract
// this is for the Velocejs FastApi
import {
  stripAllTypeParams
} from '@jsonql/ast'
import {
  readOnly,
  isEmptyObj,
} from '@jsonql/utils'
import {
  JsonqlError
} from '@jsonql/errors'
import {
  REST_NAME,
  // JSONQL_NAME,
} from '@jsonql/constants'


export class JsonqlContract {
  private _astMap: any
  private _contract = { data: {}, meta: {}, error: {} }

  /** instead of run the parser again we just load the ast map */
  constructor(astMap: any, type = REST_NAME) {
    this._astMap = readOnly(astMap) // keep an original
    //we are going to add props to it
    this._contract.data = stripAllTypeParams(astMap)
    this._contract.meta = { type }
  }

  /** insert into the object and make sure it's immutatable */
  protected insert(obj: any, entry: any, path: string) {
    const paths = path.split('.')
    const ctn = paths.length
    const _obj = {}
    for (let i = 0; i < ctn; ++i) {
      const key = paths[i]
      if ()
    }
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
