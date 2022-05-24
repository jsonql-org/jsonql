/**
  this is the new class style Validator
  const validator = new Validator(map)
  validator.run(propName arguments)
  This class will support an plugin architecture
  something like
  validator.register(typeName: string, rule: any)
  so it their map they could write
  validationMap = {
    someMethod: [{
      type: 'mySpecialMethod'
    }]
  }
  validator.register('mySpecialMethod', {
    check(value): boolean {
      // do your validation here
    }
  })
  @TODO how to integrete this into the contract generator
*/
import {
  ValidatorFactoryBase
} from './validator-base'
import {
  JsonqlGenericObject,
} from '@jsonql/validator-core/index'
import type {
  JsonqlValidationPlugin,
  JsonqlArrayValidateInput,
  JsonqlObjectValidateInput,
  JsonqlPropertyParamMap,
} from './types'
import {
  ValidatorPlugins
} from '@jsonql/validator-core'
import {
  queuePromisesProcess,
} from '@jsonql/utils'
import {
  processValidateResults,
  unwrapPreparedValidateResult,
} from './fn'
import debugFn from 'debug'
const debug = debugFn('jsonql:validator:class:index')
// main
export class ValidatorFactory extends ValidatorFactoryBase {
  /**
    this is now change to accept an instance of ValidatorPlugins (share)
    if only call it with the astMap then it init it as a standalone like before
  */
  constructor(
    astMap: Array<JsonqlPropertyParamMap>,
    _validatorPluginsInstance?: ValidatorPlugins
  ) {
    if (!_validatorPluginsInstance) {
      _validatorPluginsInstance = new ValidatorPlugins()
    }
    super(astMap, _validatorPluginsInstance)
  }

  /** this is where validation happens */
  public async validate(values: Array<unknown>, raw = false) {
    debug(`raw flag`, raw)
    // this come out with a queue then we put into the chainProcessPromises
    const queues = this._normalizeArgValues(values)

    return queuePromisesProcess(
      queues as unknown as Array<(...args: JsonqlGenericObject[]) => Promise<JsonqlGenericObject>>,
      undefined // the init value will now be undefined to know if its first
    )
    .then((finalResult: unknown) =>
      raw ? finalResult : this._prepareValidateResult(finalResult as JsonqlGenericObject)
    )
  }

  /** accept an object name => plugin in one go */
  public registerPlugins(
    plugins: {[name: string]: JsonqlValidationPlugin}
  ): void {
    for (const name in plugins) {
      this._validatorPluginsInstance.registerPlugin(name, plugins[name])
    }
  }

  /** wrapper for the protected register plugin method */
  public registerPlugin(
    name: string,
    plugin: JsonqlValidationPlugin
  ): void {
    this._validatorPluginsInstance.registerPlugin(name, plugin)
  }
  
  /** overload the ValidatorPlugins loadExtPlugin method */
  public loadExtPlugin(
    name: string,
    plugin: JsonqlValidationPlugin
  ) {
    this._validatorPluginsInstance.loadExtPlugin(name, plugin)
  }

  /** create an alias for createSchema (and replace it later ) because ii make more sense */
  public addValidationRules(
    validationMap: JsonqlObjectValidateInput | JsonqlArrayValidateInput
  ): void {
    this._createSchema(validationMap)
  }

  /** After the validation the success will get an object with
  argumentName: value object and we make it to an array matching
  the order of the call, then we can pass it directly to method that
  get validated */
  private async _prepareValidateResult(
    validateResult: JsonqlGenericObject
  ): Promise<unknown[]> {
    debug('validateResult', this._arguments, validateResult)
    // @TODO need to fix the spread input type return result
    return processValidateResults(this._arguments, validateResult)
            .then(unwrapPreparedValidateResult)
  }
}
