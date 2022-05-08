// We now use an object style to generate contract
// this is for the Velocejs FastApi
import {
  stripAllTypeParams
} from '@jsonql/ast'

export class JsonqlContract {
  private _astMap: any
  private _contract = { data: {}, meta: {}, error: {} }

  /** instead of run the parser again we just load the ast map */
  constructor(astMap: any) {
    //we are going to add props to it
    this._contract.data = astMap
  }



  public get astMap() {
    return this._astMap
  }

  // we are going to have three root properties
  public data(entry: any, path?: string) {
    this._contract.data = entry
  }

  public error() {

  }

  public meta() {

  }

}
