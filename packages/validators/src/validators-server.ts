// just simple extends from the original validators
// with the file path to load external plugins
import type {
  JsonqlAstFullMap,
  Resolver,
  Rejecter,
  ImportedPlugin,
} from './types'

import { join } from 'node:path'
import glob from 'glob'
import { Validators } from './validators'

// main
export class ValidatorsServer extends Validators {

  constructor(astMap: JsonqlAstFullMap) {
    super(astMap)
  }

  /** loading and register external plugins */
  public async loadExternalPlugins(path: string) {
    const plugins = await this._importExternalPlugins(path)

    return plugins.map((plugin: ImportedPlugin) => {
      const config = plugin.default.default // TBC if this has changed 
      this._plugin.registerExternalPlugin(config.name as string, config)

      return config
    })
  }

  /**
    pass a path and we search for plugins and load it
    we only support js files at the moment
  */
  private async _importExternalPlugins(
    path: string
  ): Promise<ImportedPlugin[]> {
    return new Promise((resolver: Resolver, rejecter: Rejecter) => {
      glob(join(path, '*.js'), (err: unknown, files: string[]) => {
        if (err) {
          return rejecter(`Something went wrong ${err}`)
        }
        if (files.length === 0) {
          return rejecter(`No plugin file found, we only support js files at the moment!`)
        }
        Promise.all(
          files.map((file: string) => import(file))
        ).then((results: ImportedPlugin[]) => {
          resolver(results)
        })
      })
    })
  }
}
