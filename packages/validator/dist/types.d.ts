// configuration
import type {
  JsonqlGenericObject,
  JsonqlValidationRule,
} from '@jsonql/validator-core/index'

export declare type CallbackFunction<T> = (...args: T[]) => boolean

export declare type AsyncCallbackFunction<T> = (...args: T[]) => Promise<boolean>

export type DescriptorMeta = {
  value?: (...args: unknown[]) => unknown
  writable?: boolean
  enumerable?: boolean
  configurable?: boolean
}

// @TODO this should move to the validator-config package
export declare type JsonqlConfigParams = {
  enumv?: unknown[]
  required?: boolean
  optional?: boolean // opposite alias of required
  checker?: CallbackFunction<T>
  alias?: string
}

export declare type JsonqlConfigBase = {
  [key: string]: JsonqlConfigParams
}

export type JsonqlAppProps = JsonqlConfigBase
export type JsonqlConstantProps = JsonqlConfigBase

// validation
// duplicated
export declare type JsonqlValidationPlugin = {
  name?: string
  main?: CallbackFunction<T> // after transform the plugin we remove it from the object
  params?: Array<string>
  pattern?: string | RegExp // should this be a string only for transport?
  // plugin?: string
  // we apply the JSON Schema validation here
  server?: boolean = false // server only, if there is only a validate || validateAsync then it will become a server only
  validate?: CallbackFunction<T>
  validateAsync?: AsyncCallbackFunction<T>
  [key: string]: unknown
}

export type JsonqlObjectValidateInput = {
  [argName: string]: JsonqlValidationRule | Array<JsonqlValidationRule>
}

export type JsonqlValidateCbFn = (
  value: unknown,
  lastResult: JsonqlGenericObject,
  pos: number[]
) => Promise<unknown>
// this is for the execution
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
