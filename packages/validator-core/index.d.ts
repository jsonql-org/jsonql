// specify your types here

export declare type JsonqlGenericObject = {
  [key: string]: any // for generic object still need to use any for now
}
export declare type CallbackFunction<T> = (...args: T[]) => boolean
export declare type AsyncCallbackFunction<T> = (...args: T[]) => Promise<boolean>

export type JsonqlCheckObjectKeys = {
  name: string
  type: Array<string>
}

export type JsonqlPluginInput = {
  plugin: string
} & JsonqlGenericObject

export type JsonqlValidateFn = AsyncCallbackFunction<unknown>

export type JsonqlPluginConfig = {
  name: string
  main: JsonqlValidateFn
  params?: string[]
}

export declare type JsonqlValidationBase = {
  pattern?: string | RegExp // should this be a string only for transport?
  // we apply the JSON Schema validation here
  server?: boolean // server only, if there is only a validate || validateAsync then it will become a server only
  validate?: CallbackFunction<T>
  validateAsync?: AsyncCallbackFunction<T>
} & JsonqlGenericObject

// move back from @jsonql/valdiator
export declare type JsonqlValidationPlugin = {
  name?: string
  main?: CallbackFunction<T> // after transform the plugin we remove it from the object
  params?: Array<string>
} & JsonqlValidationBase

export declare type JsonqlValidationRule = {
  type?: string
  plugin?: string
  value?: unknown // if the rule require a value to compare, normaly it should be a number
} & JsonqlValidationBase
