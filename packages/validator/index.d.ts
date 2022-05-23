// configuration

export declare type CallbackFunction<T> = (...args: T[]) => boolean

export declare type AsyncCallbackFunction<T> = (...args: T[]) => Promise<boolean>

export type DescriptorMeta = {
  value?: (...args: any[]) => any
  writable?: boolean
  enumerable?: boolean
  configurable?: boolean
}

export declare type JsonqlGenericObject = {
  [key: string]: any
}

export declare type JsonqlConfigParams = {
  enumv?: any[]
  required?: boolean
  optional?: boolean // opposite alias of required
  checker?: CallbackFunction<T>,
  alias?: string
}

export declare type JsonqlConfigBase = {
  [key: string]: JsonqlConfigParams
}

export type JsonqlAppProps = JsonqlConfigBase
export type JsonqlConstantProps = JsonqlConfigBase

// validation

export declare type JsonqlValidationPlugin = {
  name?: string
  main?: CallbackFunction<T> // after transform the plugin we remove it from the object
  params?: Array<string>
  pattern?: string | RegExp
  // plugin?: string
  // we apply the JSON Schema validation here
  server?: boolean = false // server only, if there is only a validate || validateAsync then it will become a server only
  validate?: CallbackFunction<T>
  validateAsync?: AsyncCallbackFunction<T>
  [key: string]: any
}

export declare type JsonqlValidationMap = {
  [propName: string]: any
}

export declare type JsonqlValidationRule = {
  type?: string
  pattern?: string | RegExp
  plugin?: string
  value?: any // if the rule require a value to compare, normaly it should be a number
  server?: boolean // mark if this is a server side only rules
  validate?: CallbackFunction<T> // apply a function
  validateAsync?: AsyncCallbackFunction<T>
  override?: boolean
  [key: string]: any // free form to apply the plugins
}

// then the developer can provide Array style
export type JsonqlArrayValidateInput = Array<JsonqlValidationRule> | Array<Array<JsonqlValidationRule>>

export type JsonqlObjectValidateInput = {
  [argName: string]: JsonqlValidationRule | Array<JsonqlValidationRule>
}

export type JsonqlValidateFn = AsyncCallbackFunction<unknown, boolean>

export type JsonqlValidateCbFn = (
  value: unknown,
  lastResult: JsonqlGenericObject,
  pos: number[]
) => Promise<unknown>

export type JsonqlPropertyParamMap = {
  name: string // the argument name
  required: boolean
  type: unknown
  // rules get contractured the moment we init the object
  rules?: Array<JsonqlValidateCbFn> = []
  rulesMeta?: Array<unknown>
  tstype?: string
  types?: unknown
  optional?: boolean // this alias will get remove in the future
  // we MIGHT have to store it the org input for reference later
  tmp?: Array<JsonqlValidationRule>
}

export type JsonqlClassValidationMap = {
  [propName: string]: Array<JsonqlPropertyParamMap>
}

// wrap the last result in this structure for processing
export type JsonqlLastResult = {
  $$idx: number
  $$value: unknown
}

export interface JsonqlCheckObjectKeys {
  name: string
  type: Array<string>
}
