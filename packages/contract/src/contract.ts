// We now use an object style to generate contract
// this is for the Velocejs FastApi
import {
  tsClassParser,
  tsFunctionParser
} from '@jsonql/ast'
import {
  stripAllTypeParams
} from './lib/common'

export class JsonqlContract {
  private _astMap: any
  private _contract = { data: {}, meta: {}, error: {} }

  constructor(pathToFile: string, type = "class") {
    Reflect.apply(type === 'class' ? tsClassParser : tsFunctionParser, null, [pathToFile])
      .then((result: any) => {
        this._astMap = stripAllTypeParams(result)
      })
  }

  static findByPath(
    obj: any,
    path: string,
    paths: string[] = [],
    i: number = 0
  ) {
    if (paths.length === 0) {
      paths = path.split('.')
    }
    if (obj[paths[i]]) {

    }
    return null
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
