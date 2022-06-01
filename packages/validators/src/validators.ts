// main class
import type {
  JsonqlValidationPlugin,
} from '@jsonql/validator-core/index'
import type {
  VeloceAstMap,
  ValidationRuleRecord,
} from './types'
import {
  Validator
} from '@jsonql/validator'
import {
  ValidatorPlugins
} from '@jsonql/validator-core'
import { toArray } from '@jsonql/utils/dist/common'
import { cloneDeep } from '@jsonql/utils/dist/clone-deep'

import debugFn from 'debug'
const debug = debugFn('velocejs:validator:main')

/**
  Instead of one ast per init
   we now pass the entire ast here
   then get it back via the propertyName
**/
export class Validators {

  private _validationRules = new Map<string, ValidationRuleRecord>()
  private _validators = new Map<string, Validator>()
  private _plugin = new ValidatorPlugins()
  private _astMap: VeloceAstMap

  /** main */
  constructor(astMap: VeloceAstMap) {
    this._astMap = cloneDeep(astMap)
    for (const propertyName in this._astMap) {
      this._validators.set(
        propertyName,
        new Validator(this._astMap[propertyName], this._plugin)
      )
    }
  }

  /** get the validator */
  public getValidator(propertyName: string) {
    if (this._validators.has(propertyName)) {
      const obj = this._validators.get(propertyName) as Validator
      // overload the method here
      return {
        addValidationRules: this._addValidationRules(propertyName, obj),
        validate: obj.validate.bind(obj)
      }
    }
    throw new Error(`${propertyName} validator is not registered!`)
  }

  // ------------------- OVERLOAD ----------------------//

  /** overload the ValidatorPlugin registerPlugin method */
  public registerPlugin(
    name: string,
    pluginConfig: JsonqlValidationPlugin
  ) {
    // this._appendRules(name, pluginConfig)
    this._plugin.registerPlugin(name, pluginConfig)
  }

  /** export for contract */
  public export() {
    const schema = {}
    this._validationRules.forEach((value: ValidationRuleRecord, propName: string) => {
      const obj = this._validators.get(propName) as Validator
      schema[propName] = { rule: value, schema: obj.schema }
    })
    debug('export schema', schema)
    const plugins = this._plugin.export()
    debug('plugin configs', plugins)

    return { schema, plugins }
  }
  /*
  @TODO
  When to add
  1. when a rule is add we check if this is internal plugin and not mark as `server`
  2. When a rule is insert via loadExtPlugin and the original plugin was not mark as server

  IDEA
  we could extract the inline code and store it in file (or just in memeory)
  and insert a new url (e.g. /veloce/plugin) then serve it up to the client
  */
  /** store the rules for later export */
  private _appendRules(propertyName: string, input: ValidationRuleRecord) {
    if (this._validationRules.has(propertyName)) {
      const existingRules = this._validationRules.get(propertyName) as ValidationRuleRecord
      for (const propName in existingRules) {
        if (input[propName]) {
          if (Array.isArray(input[propName])) {
            existingRules[propName] = existingRules[propName].concat(input[propName])
          } else {
            existingRules[propName].push(input[propName])
          }
        }
      }
      this._validationRules.set(propertyName, existingRules)
    } else {
      const cleanInput = {}
      for (const argName in input) {
        cleanInput[argName] = toArray(input[argName])
      }
      debug('adding new rule', input, cleanInput)
      this._validationRules.set(propertyName, cleanInput)
    }
  }

  /** overload the Validator addValidationRules */
  private _addValidationRules(
    propertyName: string,
    obj: Validator
  ) {
    return (input: ValidationRuleRecord) => {
      this._appendRules(propertyName, input)
      return Reflect.apply(obj.addValidationRules, obj, [input])
    }
  }
}
