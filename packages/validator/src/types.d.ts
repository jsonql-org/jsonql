// configuration

export declare type CallbackFunction = (...args: any[]) => any

export declare type AsyncCallbackFunction = (...args: any[]) => Promise<any>

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
  check: (value: any) => boolean
}

export declare type JsonqlValidationMap = {
  [propName: string]: any
}

export type JsonqlValidationRule = {
  type?: string
  pattern?: string
  value?: any // if the rule require a value to compare, normaly it should be a number
  serverOnly?: boolean // mark if this is a server side only rules
  validator?: (value: any) => boolean // apply a function
  [key: string]: any // free form to apply the plugins
}

export type JsonqlPropertyParamnMap = {
  name: string // the argument name
  required: boolean
  optional?: boolean // alias temporary will get remove in the future
  rules: Array<JsonqlValidationRule>
}

export type JsonqlClassValidationMap = {
  [propName: string]: Array<JsonqlPropertyParamnMap>
}

export interface JsonqlCheckObjectKeys {
  name: string
  type: Array<string>
}
