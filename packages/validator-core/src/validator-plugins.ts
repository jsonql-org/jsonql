/**
  instead of loading pluign in each ValidatorFactory
  we should create a base class that load all internal plugins
  and each ValidatorFactory add their extra plugin into this to share
*/
import type {
  JsonqlPluginInput,
  JsonqlPluginConfig,
  JsonqlValidationPlugin,
  JsonqlValidationRule,
  JsonqlValidateFn,
} from './types'
import JsonqlError from '@jsonql/errors/dist/error'
import {
  VALIDATE_ASYNC_KEY,
  PLUGIN_KEY,
  PLUGIN_FN_KEY,
  NAME_KEY,
  PARAMS_KEY,
  RESERVED_WORD_ERR,
} from './constants'
import {
  curryPlugin,
} from './plugins/plugins'
import {
  promisify
} from './lib/promisify'
import {
  constructRuleCb,
  checkPluginArg,
  pluginHasFunc,
  searchParamsKey,
  paramMatches,
} from './lib/common'
import {
  plugins
} from './plugins'

import debugFn from 'debug'
const debug = debugFn('jsonql:validator-core:validator-plugin')

// main
export class ValidatorPlugins {

  private _plugins = new Map<string, JsonqlValidationPlugin>()
  private _internalPluginNames: string[] = []
  /** with a idx to id this instance */
  constructor(public $version?: number) {
    // register internal plugins
    plugins.forEach((plugin: JsonqlValidationPlugin) => {
      // we don't do the convert here anymore, and wait until the look up
      // then we store it back JIT
      const name = plugin[NAME_KEY] as string
      this._internalPluginNames.push(name)
      this._registerPlugin(name, plugin, true)
    })
  }

  /**
  find the plugin internal or external
  argName is the argument name
  */
  public lookupPlugin(
    input: JsonqlValidationRule,
    argName: string
  ) {
    const pluginName = input[PLUGIN_KEY]
    if (pluginName && this._plugins.has(pluginName)) {
      const pluginConfig = this._plugins.get(pluginName) as JsonqlValidationPlugin
      // unconverted
      if (pluginConfig[PLUGIN_FN_KEY] && !pluginConfig[PARAMS_KEY]) {
        const mainFn = promisify(pluginConfig[PLUGIN_FN_KEY])
        // mainFn = isAsyncFn(mainFn) ? mainFn : promisify(mainFn)
        this._plugins.set(pluginName, {[VALIDATE_ASYNC_KEY]: mainFn, name: pluginName }) // override
        pluginConfig[VALIDATE_ASYNC_KEY] = mainFn // let it fall to the next
      }
      // already converted
      if (pluginConfig && pluginConfig[VALIDATE_ASYNC_KEY] && !pluginConfig[PARAMS_KEY]) {
        return constructRuleCb(
          argName,
          pluginConfig[VALIDATE_ASYNC_KEY] as JsonqlValidateFn,
          pluginName,
        )
      }
      // needs to curry
      if (pluginConfig && pluginConfig[PARAMS_KEY]) {
        debug('pluginConfig --->', pluginConfig)
        debug('input----------->', input)
        const _input = input as unknown as JsonqlPluginInput

        return constructRuleCb(
          argName,
          promisify(
            curryPlugin(_input, pluginConfig as unknown as JsonqlPluginConfig)
          ),
          pluginName
        )
      }
    }
    throw new JsonqlError(`Unable to find plugin: ${pluginName}`)
  }

  /** The public api to register a plugin */
  public registerPlugin(
    name: string,
    pluginConfig: JsonqlValidationPlugin
  ): void {
    this._registerPlugin(name, pluginConfig)
  }

  /** export all external plugins for generate js file */
  public export() {
    const plugins: JsonqlValidationPlugin[] = []
    this._plugins.forEach((p: JsonqlValidationPlugin, n: string) => {
      if (!this._internalPluginNames.includes(n)) {
        plugins.push(p)
      }
    })
    return plugins
  }

  // ------------------------- PRIVATE --------------------------//

  /** register plugins */
  protected _registerPlugin(
    name: string,
    pluginConfig: Partial<JsonqlPluginConfig>,
    skipCheck = false // when register internal plugin then skip it
  ): void {
    if (!skipCheck) {
      if (this._plugins.has(name)) {
        throw new JsonqlError(`plugin ${name} already existed!`)
      }
      if (!pluginHasFunc(pluginConfig)) {
        throw new JsonqlError(`Can not find 'main' method in your plugin config`)
      }
      // Here we could extract the params instead of just checking
      if (pluginConfig[PARAMS_KEY] === undefined) {
        pluginConfig = searchParamsKey(pluginConfig)
        debug('auto generate params for plugin', pluginConfig)
      } else if (pluginConfig[PARAMS_KEY] !== undefined) { // if they provide the keys then we check
        if (!checkPluginArg(pluginConfig[PARAMS_KEY] as string[])) {
          throw new JsonqlError(RESERVED_WORD_ERR)
        }
        if (!paramMatches(pluginConfig)) {
          throw new JsonqlError(`Your params doesn't matching your main argument list`)
        }
      }
    }
    pluginConfig.name = name

    /**
    At this point it should only contain a main (or plus params) so we
    do nothing and just store it, we convert it only when they call it
    */
    this._plugins.set(name, pluginConfig)
  }
}
