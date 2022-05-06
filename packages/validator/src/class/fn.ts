// develop the small functions here one by one
// import utils from '@jsonql/utils'
import {
  JsonqlPropertyParamMap,
  // JsonqlValidateCbFn,
  JsonqlValidateFn,
  JsonqlGenericObject,
} from '../types'
import {
  checkString,
  checkArray,
  checkAny,
  // checkObject,
  checkUnion,
  combineCheck,
  promisify,
} from '@jsonql/validator-core'
import {
  TS_TYPE_NAME,
  TS_TYPE_REF,
  TS_TYPE_LIT,
  TS_ARRAY_TYPE,
  TS_UNION_TYPE,
  DEFAULT_VALUE,
  SPREAD_ARG_TYPE,
} from '@jsonql/constants'
import {
  KEYWORDS,
  RULES_KEY,
  VALIDATE_KEY,
  VALIDATE_ASYNC_KEY,
  PLUGIN_FN_KEY,
  PATTERN_KEY,
} from '../constants'
import {
  JsonqlValidationError,
  // JsonqlError,
} from '@jsonql/errors'
import {
  assign,
  getRegex,
  inArray,
  isFunction,
  notEmpty,
} from '@jsonql/utils'
import debugFn from 'debug'
const debug = debugFn('jsonql:validator:class:fn')
/**
The input is what the dev wrote in the validate
The input has two styles
1. object - the key is the parameter name
2. Array of Array, the index correspond to the argument position (later)
all of these has moved to the ValidatorFactoryBase
because the plugins are apply there
*/

/**
  generate an automatic valdiation rule using the AST map
  this part will always happen first then add the user
  generate valdiation rules
*/
export function createAutomaticRules(
  astMap: Array<JsonqlPropertyParamMap>
): Array<JsonqlPropertyParamMap> {

  return astMap.map((ast: JsonqlPropertyParamMap) => {
    const { name } = ast
    const ruleFn = getValidateRules(ast)
    const ruleName = ast[TS_TYPE_NAME] || ast.type
    debug('createAutomaticRules', name, ruleName)
    ast[RULES_KEY] = [ constructRuleCb(name, ruleFn, ruleName) ]

    return ast
  })
}

/**
this will get re-use in the class to create method for the queue execution
 */
export function constructRuleCb(
  name: string,
  ruleFn: JsonqlValidateFn,
  ruleName?: string
) {
  return async (
    value: any,
    lastResult: JsonqlGenericObject,
    pos: number[]
  ) => Reflect.apply(ruleFn, null, [value])
                .then(
                  successThen(name, value, lastResult, pos)
                )
                .catch((error: boolean) => {
                  debug('failed', name, value, error, pos)
                  // the name should be the validator name - not the property name
                  // because the pos already indicator the property
                  return Promise.reject(new JsonqlValidationError(ruleName, pos))
                })
}

/** This is taken out from the above then call for re-use when we want to fall through a rule */
export function successThen(
  name: string,
  value: any,
  lastResult: JsonqlGenericObject,
  pos: number[]
) {
  return (result: any) => {
    debug('passed', name, value, result, pos)
    debug('lastResult', lastResult)
    // return the argument name with the value
    return assign(lastResult, { [name]: value })
  }
}

/** only deal with constructing the basic rules validation fucntion */
function getValidateRules(ast: any): JsonqlValidateFn {
  switch (ast[TS_TYPE_NAME]) {
    case TS_UNION_TYPE:
      return async (value: any) => checkUnion(value, ast.type)
    case TS_ARRAY_TYPE || SPREAD_ARG_TYPE:
      // need to apply for the type as well
       // @TODO need to examine the input to see what more sutation could come up
      return async (value: Array<any>) => promisify(checkArray)(value, ast.types)
    case TS_TYPE_REF || TS_TYPE_LIT:
    // @TODO should this get a special treatment
      return async (value: any) => promisify(checkAny)(value)
    default: // no tstype then should be primitive
      if (checkString(ast.type)) {
        return async (value: any) => promisify(combineCheck(ast.type))(value)
      }
      // if both are not presented that means this could be a JS code
      // this happen when we use Decorator and toString() to extract the ast
      debug(`getValidateRules`, ast)
      return async (value: any) => promisify(notEmpty)(value, true)
  }
}

/** extract the default value if there is none */
export function getOptionalValue(
  arg: any,
  param: JsonqlGenericObject
) {
  if (arg !== undefined) {
    return arg
  }
  return param[DEFAULT_VALUE] !== undefined
          ? param[DEFAULT_VALUE]
          : undefined
}

/** check plugin argument */
export function checkPluginArg(params: Array<string>): boolean {
  return !(params.filter(param => inArray(KEYWORDS, param)).length > 0)
}

/** check if the actually provide a func or pattern to construct function */
export function pluginHasFunc(rule: JsonqlGenericObject): boolean {
  if (!rule[PATTERN_KEY]) {
    const checks = [VALIDATE_KEY, VALIDATE_ASYNC_KEY, PLUGIN_FN_KEY]
    for (let i = 0; i < checks.length; ++i) {
      const fn = rule[checks[i]]
      if (fn && isFunction(fn)) {
        return true
      }
    }
  }
  return false
}

/** If the plugin provide a pattern and we construct a function out of it */
export function patternPluginFanctory(
  pattern: string
): (value: string) => Promise<boolean> {
  const regex = getRegex(pattern)

  return async (value: string) => regex.test(value) ?
                                    Promise.resolve(true) :
                                    Promise.reject(false)

}
