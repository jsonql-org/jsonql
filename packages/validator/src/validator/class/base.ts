// this is the base class for all the helper methods
import {
  JsonqlValidationPlugin,
  JsonqlValidationMap,
  JsonqlValidationRule,
  JsonqlPropertyParamnMap,
  JsonqlClassValidationMap,
} from '../../types'

export class ValidatorFactoryBase {

  private plugins = new Map<string, any>()

  constructor(private validationMap: JsonqlValidationMap) {}

  protected normalize() {
    
  }

  protected generteValidationFn() {

  }

}
