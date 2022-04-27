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
  name: string
  pattern?: string
  // we apply the JSON Schema validation here
  server?: boolean = false // server only, if there is only a validate then it will become a server only

  validate?: (value: any) => boolean
}

export declare type JsonqlValidationMap = {
  [propName: string]: any
}

export type JsonqlValidationRule = {
  message?: string
  type?: string
  pattern?: string
  value?: any // if the rule require a value to compare, normaly it should be a number
  serverOnly?: boolean // mark if this is a server side only rules
  validator?: (value: any) => boolean // apply a function
  [key: string]: any // free form to apply the plugins
}

export type JsonqlValidateFn = (value: any) => Promise<boolean|string|number|Array<number>>

export type JsonqlValidateCbFn = (value: any, pos: number[]) => Promise<boolean|string|number|Array<number>>

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
