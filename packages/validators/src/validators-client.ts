// main class
import type {
  JsonqlAstFullMap,
  ClientPluginConfigs,
} from './types'
import type {
  MixedValidationInput,
} from '@jsonql/validator/index'
import type {
  Validator
} from '@jsonql/validator'

import {
 Validators
} from './validators'


/**
  Here we take the parent methods and onlly deal with the
  generate files / contract
**/
export class ValidatorsClient extends Validators {

  /** main */
  constructor(astMap: JsonqlAstFullMap) {
    super(astMap)
  }

  /**
    directly call the addValidationRules with the propertyName
    on the client side this get call after the contract loaded
  */
  public addRules(
    propertyName: string,
    rules: MixedValidationInput
  ): Validator {
    const val = this.getValidator(propertyName)
    val.addValidationRules(rules)

    return val as Validator // we return the validator to use
  }

  /** On the client side we don't need a map */
  public registerPlugins(
    pluginConfigs: ClientPluginConfigs
  ) {
    for (const name in pluginConfigs) {
      const config = pluginConfigs[name]
      this.registerPlugin(name, config)
    }
  }
}
