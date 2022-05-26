import type {
  JsonqlValidateFn,
  JsonqlGenericObject
} from '../types'
import {
  JsonqlValidationError
} from '@jsonql/errors'
import {
  IDX_KEY,
  VALUE_KEY,
  KEYWORDS,
  PATTERN_KEY,
  VALIDATE_KEY,
  VALIDATE_ASYNC_KEY,
  PLUGIN_FN_KEY,
} from '../constants'
import {
  inArray,
  toArray,
  assign,
  isFunction,
  getRegex,
} from '@jsonql/utils'

import debugFn from 'debug'
const debug = debugFn('jsonql:validator-core:common')

/** check plugin argument against keywords list */
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

/**
this will get re-use in the class to create method for the queue execution
 */
export function constructRuleCb(
  argName: string,
  ruleFn: JsonqlValidateFn,
  ruleName?: string
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

// from https://thewebdev.info/2022/03/03/how-to-check-a-function-is-async-with-javascript/
export function isAsyncFn(fn: any) {
  const AsyncFunction = (async () => {}).constructor

  return fn instanceof AsyncFunction
}
