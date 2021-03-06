// specify your types here
import { AnyType, AnyTypeArr } from '@jsonql/utils/index'

export declare type JsonqlGenericObject = {
  [key: string]: AnyType // for generic object still need to use any for now
}

export declare type CallbackFunction = (...args: AnyTypeArr) => boolean
export declare type AsyncCallbackFunction = (...args: AnyTypeArr) => Promise<boolean>

export type JsonqlCheckObjectKeys = {
  name: string
  type: Array<string>
}
// We use this when using the lookupPlugin
export type JsonqlPluginInput = {
  plugin: string
} & JsonqlGenericObject

export type JsonqlValidateFn = AsyncCallbackFunction<unknown>
// this is the file or inline input to setup the plugin
export type JsonqlPluginConfig = {
  name: string
  main: JsonqlValidateFn | CallbackFunction
  params?: string[]
  external?: boolean
}

// this is the internal stucture of plugin stored in Map store
export declare type JsonqlValidationBase = {
  pattern?: string | RegExp // should this be a string only for transport?
  // we apply the JSON Schema validation here
  server?: boolean // server only, if there is only a validate || validateAsync then it will become a server only
  validate?: CallbackFunction<T>
  validateAsync?: AsyncCallbackFunction<T>
} & JsonqlGenericObject

// move back from @jsonql/valdiator
export declare type JsonqlValidationPlugin = Partial<JsonqlPluginConfig> & JsonqlValidationBase
// add rules
export declare type JsonqlValidationRule = {
  type?: string
  plugin?: string
} & JsonqlValidationBase
