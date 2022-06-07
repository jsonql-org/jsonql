// main class
import type {
  JsonqlValidationPlugin,
  JsonqlValidationRule,
} from '@jsonql/validator-core/index'
import type {
  JsonqlAstFullMap,
  ValidationRuleRecord,
} from './types'
import { Validator } from '@jsonql/validator'
import {
  ExternalPluginLoader as ValidatorPlugins
} from '@jsonql/validator-core/dist/external-plugin-loader'
import ValidationError from '@jsonql/errors/dist/validation-error'
import { toArray } from '@jsonql/utils/dist/common'
import { cloneDeep } from '@jsonql/utils/dist/clone-deep'
import { RULES_KEY } from '@jsonql/validator-core/dist/constants'

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
  private _astMap: JsonqlAstFullMap

  protected _plugin = new ValidatorPlugins()

  /** main */
  constructor(astMap: JsonqlAstFullMap) {
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
    throw new ValidationError(`${propertyName} validator is not registered!`)
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
      schema[propName] = { [RULES_KEY]: value, schema: obj.schema }
    })
    debug('export schema', schema)
    const plugins = this._plugin.export()
    debug('plugin configs', plugins)

    return { schema, plugins }
  }

  /** check if this rule (plugin) can export to the public */
  public checkRuleCanExport(
    plugins: JsonqlValidationPlugin[]
  ) {
    const externals = plugins.filter((plugin: JsonqlValidationPlugin) => plugin.external)
                             .map((plugin: JsonqlValidationPlugin) => plugin.name)
    debug('available externals', externals)
    // return a method for checking
    return (rule: JsonqlValidationRule) => {
      const { plugin } = rule
      if (plugin) {
        debug('check plugin can export', plugin)
        return this._plugin.isBuiltIn(plugin) || externals.includes(plugin)
      }
      return false
    }
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
          // we are going to just store everything and let the contract decided what to pick
          existingRules[propName] = existingRules[propName].concat(toArray(input[propName]))
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
    // @NOTE found a problem here, if we put in the wrong format { name, plugin }
    // instead of { argName: {plugin}} the editor won't warn this error
    // and it cause all kinds of problem
    return (input: ValidationRuleRecord) => {
      const _input = this._checkInput(input)
      this._appendRules(propertyName, _input)

      return Reflect.apply(obj.addValidationRules, obj, [_input])
    }
  }

  /** just to make sure the ValidationRuleRecord is correct */
  private _checkInput(input: ValidationRuleRecord) {
    const { name } = input
    if (name) {
      const _input = cloneDeep(input)
      delete _input.name
      return { [name as string]: _input }
    }
    return input
  }
}
