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
import {
  JsonqlError
} from '@jsonql/errors'
import {
  inArray,
  isFunction,
} from '@jsonql/utils'
import {
  VALIDATE_KEY,
  VALIDATE_ASYNC_KEY,
  PLUGIN_KEY,
  PLUGIN_FN_KEY,
  PATTERN_KEY,
  // RULES_KEY,
  NAME_KEY,
  PARAMS_KEY,
  // ORG_KEY,
} from './constants'
import {
  checkString,
} from'./base/string'
import {
  curryPlugin,
  createCoreCurryPlugin
} from './plugins/plugins'
import {
  promisify
} from './lib/promisify'
import {
  constructRuleCb,
  checkPluginArg,
  pluginHasFunc,
  patternPluginFanctory,
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
  private _externalPluginNames: string[] = []

  /** with a idx to id this instance */
  constructor(public idx?: number) {
    // register internal plugins
    plugins.forEach((plugin: JsonqlValidationPlugin) => {
      if (!plugin[PARAMS_KEY]) {
        // We skip those need to curry and do that JIT
        plugin[VALIDATE_ASYNC_KEY] = promisify(plugin[PLUGIN_FN_KEY])
      }
      const name = plugin[NAME_KEY] as string
      this._internalPluginNames.push(name)
      this._registerPlugin(name, plugin, true)
    })
  }

  /**
  find the plugin internal or external
  propName is the argument name
  */
  public lookupPlugin(
    input: JsonqlValidationRule,
    propName: string
  ) {
    const pluginName = input[PLUGIN_KEY]
    if (pluginName && this._plugins.has(pluginName)) {
      // @TODO need to transform this
      const pluginConfig = this._plugins.get(pluginName)
      if (pluginConfig && pluginConfig[VALIDATE_ASYNC_KEY]) {
        // here is the problem the name should be the param not the plugin
        return constructRuleCb(
          propName,
          pluginConfig[VALIDATE_ASYNC_KEY] as JsonqlValidateFn,
          pluginName,
        )
      } else if (pluginConfig && pluginConfig[PARAMS_KEY]) {
        debug('_pluign', pluginConfig, 'input', input)
        const _input = input as unknown as JsonqlPluginInput

        return constructRuleCb(
          propName,
          promisify( // need to check if the _plugin is internal or not
            inArray(this._internalPluginNames, pluginName) ?
              createCoreCurryPlugin(_input) :
              curryPlugin(_input, pluginConfig as unknown as JsonqlPluginConfig)
          ),
          pluginName
        )
      }
    }
    throw new JsonqlError(`Unable to find ${pluginName} plugin for ${propName}`)
  }

  /** The public api to register a plugin */
  public registerPlugin(
    name: string,
    pluginConfig: JsonqlValidationPlugin
  ): void {
    this._registerPlugin(name, pluginConfig)
  }

  /** basically overload the _registerPlugin with adding name to ext list */
  public loadExtPlugin(
    name: string,
    pluginConfig: JsonqlValidationPlugin
  ): void {
    if (!this._externalPluginNames.includes(name) ) {
      this._internalPluginNames.push(name)
      this._registerPlugin(name, pluginConfig)
    } else {
      throw new JsonqlError(`${name} already added!`, name)
    }
  }

  /** get a list of the plugin names */
  public getPluginNames(ext = false) {
    if (ext === true) {
      return this._externalPluginNames
    }
    return this._internalPluginNames.concat(this._externalPluginNames)
  }

  // ------------------------- PRIVATE --------------------------//

  /** register plugins */
  protected _registerPlugin(
    name: string,
    pluginConfig: JsonqlValidationPlugin,
    skipCheck = false // when register internal plugin then skip it
  ): void {
    if (!skipCheck) {
      if (this._plugins.has(name)) {
        throw new JsonqlError(`plugin ${name} already existed!`)
      }
      if (pluginConfig[PARAMS_KEY] !== undefined) {
        if (!checkPluginArg(pluginConfig[PARAMS_KEY] as string[])) {
          throw new JsonqlError(`Your plugin config argument contains reserved keywords`)
        }
      }
      if (!pluginHasFunc(pluginConfig)) {
        throw new JsonqlError(`Can not find any executable definition within your plugin config`)
      }
    }
    // put the name back in
    pluginConfig.name = name
    /**
    Here is a problem, when we need to add this to the contract
    the info here is already constructed for running with validation
    which is not suitable to transport over the wire, we need to
    go higher (register via file base) to add such info
    */
    switch (true) {
      // this rule is not really in use but keep here for future
      case (!pluginConfig[VALIDATE_ASYNC_KEY] &&
            pluginConfig[VALIDATE_KEY] &&
            isFunction(pluginConfig[VALIDATE_KEY])):
        pluginConfig[VALIDATE_ASYNC_KEY] = promisify(pluginConfig[VALIDATE_KEY])
        break
      // use the pattern key to generate plugin method
      case (pluginConfig[PATTERN_KEY] &&
            checkString(pluginConfig[PATTERN_KEY])):
        pluginConfig[VALIDATE_ASYNC_KEY] = patternPluginFanctory(pluginConfig[PATTERN_KEY] as string)
        break
      // @NOTE we can not create the curryPlugin here because it needs to be generic
      // and the arguement provide at validation time, this need to get create at the _lookupPlugin
      default:
        // @TODO more situations
    }
    this._plugins.set(name, pluginConfig)
  }
}
