// specify your types here
import {
  JsonqlPropertyParamMap,
  JsonqlObjectValidateInput,
  MixedValidationInput,
} from '@jsonql/validator/index'
export type {
  JsonqlValidationPlugin,
  JsonqlPluginConfig,
  JsonqlValidationRule
} from '@jsonql/validator-core/index'

// for init the entire class with propertyNames
export declare type JsonqlAstFullMap = {
  [propertyName: string]: Array<JsonqlPropertyParamMap>
}
// just an alias for use in downstream packages
export type VeloceAstMap = JsonqlAstFullMap
// can be raw input or plugin statement
export declare type ValidationRuleRecord = JsonqlObjectValidateInput | JsonqlValidationPlugin

export type Resolver = (value?: T | PromiseLike<T>) => void

export type Rejecter = (reason?: any) => void

export declare type PromiseConstructorLike =
    new <T>(executor:
              (
                resolve: Resolver,
                reject: Rejecter
              ) => void) => PromiseLike<T>;

export type ImportedPlugin = {
  default: { default: JsonqlValidationPlugin}
}

export type ClientPluginConfigs = {
  [pluginName: string]: JsonqlValidationPlugin
}

export type { MixedValidationInput, JsonqlPropertyParamMap }
