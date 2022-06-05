// Use this when loading external plugins
import { ValidatorPlugins } from './validator-plugins'
import { JsonqlValidationPlugin } from './types'
// main
export class ExternalPluginLoader extends ValidatorPlugins {

  constructor() {
    super()
  }

  /** main method */
  public registerExternalPlugin(
    name: string,
    pluginConfig: JsonqlValidationPlugin
  ) {
    this._registerExternalPlugin(name, pluginConfig)
  }

}
