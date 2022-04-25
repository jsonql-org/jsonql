// this is the base class for all the helper methods
import {
  JsonqlValidationPlugin,
  JsonqlValidationMap,
  JsonqlValidationRule,
  JsonqlPropertyParamnMap,
  JsonqlClassValidationMap,
} from '../types'
import {
  chainProcessPromises
} from '@jsonql/utils'
import {
  createAutomaticRules
} from './engine'
import {
  checkString,
  checkArray,
  checkAny,
  checkObject,
  checkUnion,
  combineCheck,
} from '@jsonql/validator-core'
import {
  notEmpty
} from '@jsonql/utils'
/**
The sequence how this should run
1. init - take the AST map and generate automatic validation rules
2. register internal plugins
3. (if any) user can register their own plugins
4. accept the user define rules, at this point we create the full validation map
5. Call the validate method with the data input then the validation will run
*/
export class ValidatorFactoryBase {

  private plugins = new Map<string, any>()
  // we keep the two set
  private astWithBaseRules: Array<JsonqlPropertyParamnMap>
  protected schema!: Array<JsonqlPropertyParamnMap>

  constructor(astMap: any) {
    this.astWithBaseRules = createAutomaticRules(astMap)
  }

  /** put the rule in here and make it into an async method */
  protected createSchema(
    input?: any
  ): void {
    let astWithRules = this.astWithBaseRules
    // all we need to do is check if its empty input
    if (notEmpty(input)) {
      if (checkArray(input)) {
        astWithRules = this.applyArrayInput(astWithRules, input)
      } else if (checkObject(input)) {
        astWithRules = this.applyObjectInput(astWithRules, input)
      }
    }
    this.schema = astWithRules
  }

  protected generteValidationFn() {

  }

  /** normalize the array style rules input */
  protected applyArrayInput(
    astMap: Array<JsonqlPropertyParamnMap>,
    input?: any
  ) {
    // we use the astMap as standard
    return astMap.map((ast: any, i: number) => {

      return ast
    })
  }

  /** nomalize the object style rules input */
  protected applyObjectInput(
    astMap: Array<JsonqlPropertyParamnMap>,
    input: any
  ) {
    return astMap.map((ast: JsonqlPropertyParamnMap, i: number)  => {

      return ast
    })
  }

  /** register plugins */
  protected registerPlugin(name: string, rule: JsonqlValidationPlugin) {
    this.plugins.set(name, rule)
  }

}
