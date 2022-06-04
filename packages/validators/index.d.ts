// specify your types here
import {
  JsonqlPropertyParamMap,
  JsonqlObjectValidateInput,
  // JsonqlArrayValidateInput,
} from '@jsonql/validator/index'
import type {
  JsonqlValidationPlugin
} from '@jsonql/validator-core/index'
// for init the entire class with propertyNames
export declare type JsonqlAstFullMap = {
  [propertyName: string]: Array<JsonqlPropertyParamMap>
}
// just an alias for use in downstream packages
export type VeloceAstMap = JsonqlAstFullMap
// can be raw input or plugin statement
export declare type ValidationRuleRecord = JsonqlObjectValidateInput | JsonqlValidationPlugin
