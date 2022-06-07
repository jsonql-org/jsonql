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
import GeneralException from '@jsonql/errors/dist/error'
import {
  VALIDATE_ASYNC_KEY,
  PLUGIN_KEY,
  PLUGIN_FN_KEY,
  NAME_KEY,
  PARAMS_KEY,
  RESERVED_WORD_ERR,
  ARG_NOT_MATCH_ERR,
  MAIN_NOT_FOUND_ERR,
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
        // let it fall to the next
        pluginConfig[VALIDATE_ASYNC_KEY] = promisify(pluginConfig[PLUGIN_FN_KEY])
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
    debug('lookupPlugin', 'unable to find', pluginName)
    throw new GeneralException(`Unable to find plugin: ${pluginName}`)
  }

  /** The public api to register a plugin */
  public registerPlugin(
    name: string,
    pluginConfig: JsonqlValidationPlugin
  ): void {
    this._registerPlugin(name, pluginConfig)
  }

  /** call this when loading external plugin, not allow to use directly */
  protected _registerExternalPlugin(
    name: string,
    pluginConfig: JsonqlValidationPlugin
  ): void {
    this._registerPlugin(name, pluginConfig, false, true)
  }
  
  /** this is no longer in use and we change the usage to export list of names that can be add to contract */
  public export(external = true) {
    const plugins: JsonqlValidationPlugin[] = []
    this._plugins.forEach((p: JsonqlValidationPlugin, n: string) => {
      if (!this.isBuiltIn(n) && p.external === external) {
        plugins.push(p)
      }
    })
    return plugins
  }

  /** just check if this plugin is built-in */
  public isBuiltIn(pluginName: string) {
    return this._internalPluginNames.includes(pluginName)
  }

  // ------------------------- PRIVATE --------------------------//

  /** register plugins */
  protected _registerPlugin(
    name: string,
    pluginConfig: Partial<JsonqlPluginConfig>,
    skipCheck = false, // when register internal plugin then skip it
    external = false // new in 0.9.11
  ): void {
    if (!skipCheck) {
      if (this._plugins.has(name)) {
        throw new GeneralException(`plugin ${name} already existed!`)
      }
      if (!pluginHasFunc(pluginConfig)) {
        debug('registerPlugin', MAIN_NOT_FOUND_ERR)
        throw new GeneralException(MAIN_NOT_FOUND_ERR)
      }
      // Here we could extract the params instead of just checking
      if (pluginConfig[PARAMS_KEY] === undefined) {
        pluginConfig = searchParamsKey(pluginConfig)
        debug('auto generate params for plugin', pluginConfig)
      } else if (pluginConfig[PARAMS_KEY] !== undefined) { // if they provide the keys then we check
        if (!checkPluginArg(pluginConfig[PARAMS_KEY] as string[])) {
          debug('registerPlugin', RESERVED_WORD_ERR)
          throw new GeneralException(RESERVED_WORD_ERR)
        }
        if (!paramMatches(pluginConfig)) {
          debug('registerPlugin', ARG_NOT_MATCH_ERR)
          throw new GeneralException(ARG_NOT_MATCH_ERR)
        }
      }
    }
    pluginConfig.name = name
    pluginConfig.external = external
    /**
    At this point it should only contain a main (or plus params) so we
    do nothing and just store it, we convert it only when they call it
    */
    this._plugins.set(name, pluginConfig)
  }
}
