// This export files also will get build individually for the client side
// and same thing could apply for the developer add rules

// Here we only provide a list of files and dynamicly import it

import between from './between'
import email from './email'
import int from './int'
import lessThanEqual from './less-than-equal'
import lessThan from './less-than'
import moreThanEqual from './more-than-equal'
import moreThan from './more-than'
import unit from './uint'
import within from './within'
import { curry } from '@jsonql/utils/src'
import {
  JsonqlPluginConfig,
  JsonqlValidateFn,
  JsonqlPluginInput,
} from '../types'
import { JsonqlError } from '@jsonql/errors/src'

export const plugins = [
  between,
  email,
  int,
  lessThanEqual,
  lessThan,
  moreThanEqual,
  moreThan,
  unit,
  within,
]
/** just make this clear where the plugins coming from */
const GLOBAL_PLUGINS = plugins

/** This will lookup our internal plugins list */
export function createCoreCurryPlugin(
  input: JsonqlPluginInput
): JsonqlValidateFn {
  const { plugin } = input
  const pluginExport = GLOBAL_PLUGINS.filter(p => plugin === p.name)[0]

  return curryPlugin(input, pluginExport as unknown as JsonqlPluginConfig)
}

/**
  construct the curry plugin method
  @0.5.0 we make this generic
*/
export function curryPlugin(
  config: JsonqlPluginInput,
  pluginExport: JsonqlPluginConfig
): JsonqlValidateFn {
  const { plugin } = config
  if (plugin) {
    const params = pluginExport['params'] // if we use pluginExport.params then TS complain!
    if (params) {
      // @BUG if the input missing the key then it wont throw for example
      // we expect `arg` but pass the `min` then it will run but just failed
      if (!checkArgKeys(config, params)) {
        throw new JsonqlError(`Expected params: ${params.join(',')} not found!`)
      }
      const args = params.map((param: string) => config[param])

      return Reflect.apply(curry(pluginExport.main), null, args)
    } else {
      throw new JsonqlError(`This plugin ${pluginExport.name} can not be curry`)
    }
  }
  throw new JsonqlError(`Unable to find plugin in config`)
}

/** check if the expected key presented in the config */
export function checkArgKeys(
  config: JsonqlPluginInput,
  params: Array<string>
): boolean {
  return params.filter(key => config[key]).length === params.length
}


/** @TODO it needs to be a js file then it must be after compile */
export function getPlugin(pluginName: string) {
  let p = plugins[pluginName]
  if (p) {
    p = p === '_' ? pluginName : p
    return import('./' + [p,'js'].join('.'))
  }
  throw new Error(`${pluginName} is not found`)
}
