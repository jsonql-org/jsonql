import type {
  JsonqlValidateFn,
  JsonqlGenericObject,
  JsonqlPluginConfig
} from '../types'
import {
  JsonqlValidationError
} from '@jsonql/errors'
import {
  IDX_KEY,
  VALUE_KEY,
  KEYWORDS,
  PLUGIN_FN_KEY,
  PARAMS_KEY,
} from '../constants'
import {
  toArray,
  assign,
  isFunction,
} from '@jsonql/utils/dist/common'
import {
  getRegex,
} from '@jsonql/utils/dist/regex'

import debugFn from 'debug'
const debug = debugFn('jsonql:validator-core:common')

/** check plugin argument against keywords list */
export function checkPluginArg(params: Array<string>): boolean {
  return !(params.filter(param => KEYWORDS.includes(param)).length > 0)
}

/** now simply it with just one prop check main */
export function pluginHasFunc(rule: Partial<JsonqlPluginConfig>): boolean {
  return rule[PLUGIN_FN_KEY] && isFunction(rule[PLUGIN_FN_KEY])
}

/** check if the params they provide is matching their main method */
export function paramMatches(rule: Partial<JsonqlPluginConfig>) {
  const params = splitMethod(rule.main.toString())
  params.pop()
  const l = params.length
  if (l === 0 && !rule[PARAMS_KEY]) {
    return true // nothing to check
  }
  const _params = rule.params !== undefined && Array.isArray(rule.params)
                ? rule.params : false
  if (_params === false) {
    return false
  }
  if (l > 0 && l === _params.length) {
    if (!params.filter((param: string, i: number) => param !== _params[i]).length) {
      return true
    }
  }
  return false
}

/** take a function string and return its argument names */
function splitMethod(fnStr: string): Array<string> {

  return fnStr.split('(')[1]
              .split(')')[0]
              .split(',')
              .map(t => t.trim())
              .filter(t => t !== '')
}


/**
this will get re-use in the class to create method for the queue execution
 */
export function constructRuleCb(
  argName: string,
  ruleFn: JsonqlValidateFn,
  ruleName?: string
) {

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
      return !!lastResult.filter(
        (res: {[key: string]: unknown}) => key in res
      ).length
    }
  } catch(e) { debug('isResultPackage', e) }

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
