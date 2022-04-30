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
import { JsonqlPluginConfig, JsonqlValidateFn } from '../types'
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

/** construct the curry plugin method */
export function curryPlugin(config: JsonqlPluginConfig): JsonqlValidateFn {
  const { plugin } = config
  if (plugin) {
    const pluginExport = plugins.filter(p => plugin === p.name)[0]
    const params = pluginExport['params'] // if we use pluginExport.params then TS complain!
    if (params) {
      const args = params.map((param: string) => config[param])

      return Reflect.apply(curry(pluginExport.main), null, args)
    } else {
      throw new JsonqlError(`This plugin ${pluginExport.name} can not be curry`)
    }
  }
  throw new JsonqlError(`Unable to find plugin`)
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
