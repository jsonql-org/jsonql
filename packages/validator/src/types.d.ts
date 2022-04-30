// configuration

export declare type CallbackFunction = (...args: any[]) => any

export declare type AsyncCallbackFunction = (...args: any[]) => Promise<any>

export declare type JsonqlGenericObject = {
  [key: string]: any
}

export declare type JsonqlConfigParams = {
  enumv?: any[]
  required?: boolean
  optional?: boolean // opposite alias of required
  checker?: CallbackFunction,
  alias?: string
}

export declare type JsonqlConfigBase = {
  [key: string]: JsonqlConfigParams
}

export type JsonqlAppProps = JsonqlConfigBase
export type JsonqlConstantProps = JsonqlConfigBase

// validation

export declare type JsonqlValidationPlugin = {
  name: string
  pattern?: string
  // we apply the JSON Schema validation here
  server?: boolean = false // server only, if there is only a validate then it will become a server only
  validate?: (value: any) => boolean
  validateAsync?: (value: any) => Promise<boolean>
}

export declare type JsonqlValidationMap = {
  [propName: string]: any
}

export type JsonqlValidationRule = {
  type?: string
  pattern?: string
  plugin?: string
  value?: any // if the rule require a value to compare, normaly it should be a number
  server?: boolean // mark if this is a server side only rules
  validate?: (value: any) => boolean // apply a function
  validateAsync?: (value: any) => Promise<boolean>
  [key: string]: any // free form to apply the plugins
}

// then the developer can provide Array style
export type JsonqlArrayValidateInput = Array<JsonqlValidationRule> | Array<Array<JsonqlValidationRule>>

export type JsonqlObjectValidateInput = {
  [argName: string]: JsonqlValidationRule | Array<JsonqlValidationRule>
}

export type JsonqlValidateFn = AsyncCallbackFunction

export type JsonqlValidateCbFn = (
  value: any,
  lastResult: JsonqlGenericObject,
  pos: number[]
) => Promise<any>

export type JsonqlPropertyParamnMap = {
  name: string // the argument name
  required: boolean
  type: any
  tstype?: string
  types?: any
  optional?: boolean // alias temporary will get remove in the future
  rules?: Array<JsonqlValidationRule> & Array<JsonqlValidateCbFn>
}

export type JsonqlClassValidationMap = {
  [propName: string]: Array<JsonqlPropertyParamnMap>
}

export interface JsonqlCheckObjectKeys {
  name: string
  type: Array<string>
}
