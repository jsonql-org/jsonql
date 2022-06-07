// it was in the index and should be on it's own file
/** just make this clear where the plugins coming from */
import type {
  JsonqlPluginConfig,
  JsonqlValidateFn,
  JsonqlPluginInput,
} from '../types'

import { curry } from '@jsonql/utils/dist/lodash'
import GeneralException from '@jsonql/errors/dist/error'

import { PARAMS_KEY } from '../constants'
import { plugins } from './index'
/**
  construct the curry plugin method
  @0.5.0 we make this generic
*/
export function curryPlugin(
  input: JsonqlPluginInput,
  pluginConfig: JsonqlPluginConfig
): JsonqlValidateFn {
  const { plugin } = input
  if (plugin) {
    const params = pluginConfig[PARAMS_KEY] // if we use pluginExport.params then TS complain!
    if (params) {
      // @BUG if the input missing the key then it wont throw for example
      // we expect `arg` but pass the `min` then it will run but just failed
      if (!checkArgKeys(input, params)) {
        throw new GeneralException(`Expected params: ${params.join(',')} not found!`)
      }
      const args = params.map((param: string) => input[param])

      return Reflect.apply(curry(pluginConfig.main), null, args)
    } else {
      throw new GeneralException(`This plugin ${pluginConfig.name} can not be curry`)
    }
  }
  throw new GeneralException(`Unable to find plugin in config`)
}

/** check if the expected key presented in the config */
function checkArgKeys(
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
