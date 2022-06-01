// specify your types here
import {
  JsonqlPropertyParamMap,
  JsonqlObjectValidateInput,
  // JsonqlArrayValidateInput,
} from '@jsonql/validator/index'
import type {
  JsonqlValidationPlugin
} from '@jsonql/validator-core/index'


export declare type VeloceAstMap = {
  [propertyName: string]: Array<JsonqlPropertyParamMap>
}

// export declare type AddValidationRuleFn = (validationMap: JsonqlObjectValidateInput | JsonqlArrayValidateInput) => void

export declare type ValidationRuleRecord = JsonqlObjectValidateInput | JsonqlValidationPlugin
