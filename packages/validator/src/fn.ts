// develop the small functions here one by one
// import utils from '@jsonql/utils'
import type {
  JsonqlPropertyParamMap,
  JsonqlValidateFn,
  JsonqlGenericObject,
  JsonqlValidationRule,
} from './types'
import {
  checkString,
  checkArray,
  checkAny,
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
  IDX_KEY,
  VALUE_KEY,
  IS_SPREAD_VALUES_KEY,
} from './constants'
import {
  JsonqlValidationError,
  // JsonqlError,
} from '@jsonql/errors'
import {
  assign,
  getRegex,
  inArray,
  toArray,
  isFunction,
  notEmpty,
  objectHasKey,
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

    // process the rest
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
  argName: string,
  ruleFn: JsonqlValidateFn,
  ruleName?: string | unknown
) {
  debug('ruleFn', ruleFn, argName)
  return async (
    value: unknown,
    lastResult: JsonqlGenericObject,
    pos: number[]
  ) => Reflect.apply(ruleFn, null, [value])
                .then(
                  successThen(argName, value, lastResult, pos)
                )
                .catch((error: boolean) => {
                  debug('failed', argName, value, error, pos)
                  // the name should be the validator name - not the property name
                  // because the pos already indicator the property
                  return Promise.reject(new JsonqlValidationError(ruleName, pos))
                })
}

/** This is taken out from the above then call for re-use when we want to fall through a rule */
export function successThen(
  argName: string,
  value: unknown,
  lastResult: JsonqlGenericObject,
  pos: number[] // for internal debug use only
) {
  return (result: unknown) => {
    const idx = pos[0]
    debug('passed', argName, value, result, pos)
    debug('lastResult', lastResult)
    const newResult = { [IDX_KEY]: idx, [VALUE_KEY]: value }
    if (lastResult === undefined) { // init
      return {[argName]: newResult }
    }
    // here is the problem with spread result - they have the same name
    if (argName in lastResult) { // we need to check if the key exist this is import NOT VALUE check
      const lr = lastResult[argName]
      if (isResultPackage(lr) ) {
        if (!lr.includes(newResult)) {
          lastResult[argName].push(newResult)
        }
      } else if (lr[IDX_KEY] !== idx) {
        lastResult[argName] = toArray(lastResult[argName]).concat([ newResult ])
      }
      // if it's the same then do nothing
      return lastResult
    }
    // return the argument name with the value
    return assign(lastResult, { [argName]: newResult })
  }
}

/** check to see if the lastResult contain our lastResult package format or just their value */
export function isResultPackage(lastResult: unknown, key = IDX_KEY) {
  try {
    if (Array.isArray(lastResult)) {
      return !!lastResult.filter((res: {[key: string]: unknown}) => key in res).length
    }
  } catch(e) { debug('isResultPackage', e) }

  return false
}

/** need to do this in two steps, first package it again and unwrap it, then next step flatten it */
export async function processValidateResults(
  argNames: Array<string>,
  validateResult: JsonqlGenericObject
) {
  return argNames.map((argName: string) => {
    if (VALUE_KEY in validateResult[argName]) {
      return validateResult[argName][VALUE_KEY]
    } else if (isResultPackage(validateResult[argName])) {
      // @BUG this is still wrong its array wrap in an array
      // we need to wrap this one more time for the next step
      return {
        [IS_SPREAD_VALUES_KEY]: validateResult[argName].map((res: {[key: string]: unknown}) => res[VALUE_KEY])
      }
    }
    debug(`Return result when we couldn't find way to destruct: ${argName}`, validateResult[argName])
    return validateResult[argName]
  })
}

/** final step to unwarp the pack result for spread arguments */
// @NOTE there is a potential bug here when the spread type is Array<Array<any>>
// then when we use in the velocejs we flatMap and all the Array inside get flattern
// then again using spread with this wild open types is really BAD API design
export async function unwrapPreparedValidateResult(
  result: Array<any> // can not use unknown here
) {
  debug('unwrapPreparedValidateResult', result)
  const ctn = result.length
  if (ctn === 1 && objectHasKey(result[0], IS_SPREAD_VALUES_KEY)) {
    return result[0][IS_SPREAD_VALUES_KEY]
  } else if (isResultPackage(result, IS_SPREAD_VALUES_KEY)) {
    let tmp: unknown[] = []
    for (let i = 0; i < ctn; ++i) {
      if (IS_SPREAD_VALUES_KEY in result[i]) {
        tmp = tmp.concat(result[i][IS_SPREAD_VALUES_KEY])
      } else {
        tmp.push(result[i])
      }
    }
    return tmp
  }
  return result // nothing to do should be all correct
}

/** only deal with constructing the basic rules validation function */
function getValidateRules(ast: JsonqlPropertyParamMap): JsonqlValidateFn {
  debug('getValidateRules ast', ast)
  switch (ast[TS_TYPE_NAME]) {
    case TS_UNION_TYPE:
      return async function unionFn(value: unknown) {
        return checkUnion(value, ast.type as string[])
      }
    case TS_ARRAY_TYPE || SPREAD_ARG_TYPE:
      // need to apply for the type as well
       // @TODO need to examine the input to see what more sutation could come up
      return async function arrayFn(value: Array<unknown>) {
        return promisify(checkArray)(value, ast.types)
      }
    case TS_TYPE_REF || TS_TYPE_LIT:
    // @TODO should this get a special treatment
      return async function anyFn(value: unknown) {
        return promisify(checkAny)(value)
      }
    case SPREAD_ARG_TYPE: // we need to create rule for this one, its been wrong rule
      return async function combineFn(value: unknown) {
        return promisify(combineCheck(ast.types as string))(value)
      }
    default: // no tstype then should be primitive
      if (checkString(ast.type)) {
        debug('validation type', ast.type)
        return async function combineFn(value: unknown) {
          return promisify(combineCheck(ast.type as string))(value)
        }
      }
      // if both are not presented that means this could be a JS code
      // this happen when we use Decorator and toString() to extract the ast
      debug(`getValidateRules`, ast)
      return async function emptyFn(value: unknown) {
        return promisify(notEmpty)(value, true)
      }
  }
}

/** extract the default value if there is none */
export function getOptionalValue(
  arg: unknown,
  param: JsonqlGenericObject
) {
  // should be the value undefined then search for defaultvalue
  if (param.tstype !== SPREAD_ARG_TYPE && arg === undefined) { // spread argument can not have default value
    return param[DEFAULT_VALUE] !== undefined
            ? param[DEFAULT_VALUE]
            : undefined
  }

  return arg
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

/** check if the rule contain duplicate rules that can not be resolve */
export function checkDuplicateRules(rule: JsonqlValidationRule): Array<string> {
  return [
    VALIDATE_KEY, VALIDATE_ASYNC_KEY, PLUGIN_FN_KEY // @TODO should pattern be standalone?
  ].filter((key: string) => rule[key] !== undefined)
}