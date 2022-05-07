// We now use an object style to generate contract
// this is for the Velocejs FastApi
import {
  tsClassParser,
  tsFunctionParser
} from '@jsonql/ast'

export class JsonqlContract {

  private _astMap: any


  constructor(pathToFile: string, module = "ts") {
    
  }

  // we are going to have three root properties
  public data() {

  }

  public errors() {

  }

  public meta() {

  }

}
