// main class
import type {
  JsonqlAstFullMap,
  ClientPluginConfigs,
} from './types'
import {
 Validators
} from './validators'

/**
  Here we take the parent methods and onlly deal with the
  generate files / contract
**/
export class ValidatorsClient extends Validators {

  /** main */
  constructor(astMap: JsonqlAstFullMap) {
    super(astMap)
  }

  /** On the client side we don't need a map */
  public registerPlugins(
    pluginConfigs: ClientPluginConfigs
  ) {
    for (const name in pluginConfigs) {
      const config = pluginConfigs[name]
      this.registerPlugin(name, config)
    }
  }
}
