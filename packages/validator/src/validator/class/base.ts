// this is the base class for all the helper methods
import {
  JsonqlValidationPlugin,
  JsonqlValidationMap,
  JsonqlValidationRule,
  JsonqlPropertyParamnMap,
  JsonqlClassValidationMap,
} from '../../types'
import {
  chainProcessPromises
} from '@jsonql/utils'

export class ValidatorFactoryBase {

  private plugins = new Map<string, any>()

  constructor(private validationMap: JsonqlValidationMap) {}

  /** put the rule in here and make it into an async method */
  protected normalize() {

  }

  protected generteValidationFn() {

  }

}
