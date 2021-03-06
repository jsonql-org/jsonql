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
  rules?: Array<JsonqlValidateCbFn>
  rulesMeta?: Array<unknown>
  tstype?: string
  types?: unknown
  excluded?: boolean // this is for the contract and api that can not be validate
  server?: boolean // reserved for future use
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

export type FunctionInput = CallbackFunction<unknown> | AsyncCallbackFunction<unknown>

export type MixedValidationInput = JsonqlObjectValidateInput | FunctionInput

export type ValidateResultReturn = 'raw' | 'array' | 'object'

export {
  JsonqlGenericObject,
  JsonqlValidationRule,
}
