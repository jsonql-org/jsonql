// breaking the whole thing up to see what cause the multiple calls issue
import {
  isFunction,
  merge,
  mapValues
} from '../lib/lodash'
import {
  JsonqlEnumError,
  JsonqlTypeError,
  JsonqlCheckerError
} from '@jsonql/errors'
import {
  TYPE_KEY,
  OPTIONAL_KEY,
  ENUM_KEY,
  ARGS_KEY,
  CHECKER_KEY,
  KEY_WORD
} from '../lib/constants'
import { checkArray } from '../base'
import { toArray, inArray } from '@jsonql/utils'
// types stuff
import { CallbackFunction } from '../types'

// import debug from 'debug';
// const debugFn = debug('jsonql-params-validator:options:validation')

/**
 * break out to make the code easier to read
 */
export function validateHandler(value: any, cb: CallbackFunction) {
  // cb is the validateSync methods
  const args = [
    [ value[ARGS_KEY] ],
    [{
        [TYPE_KEY]: toArray(value[TYPE_KEY]),
        [OPTIONAL_KEY]: value[OPTIONAL_KEY]
    }]
  ]
  // debugFn('validateHandler', args)
  return Reflect.apply(cb, null, args)
}

/**
 * Check against the enum value if it's provided
 */
export function enumHandler(value: any, enumv: any): boolean {
  if (checkArray(enumv)) {

    return inArray(enumv, value)
  }
  return true
}

/**
 * Allow passing a function to check the value
 * There might be a problem here if the function is incorrect
 * and that will makes it hard to debug what is going on inside
 * @TODO there could be a few feature add to this one under different circumstance
 */
export function checkerHandler(value: any, checker: CallbackFunction): boolean {
  try {

    return isFunction(checker) ? checker.apply(null, [value]) : false
  } catch (e) {

    return false
  }
}

/**
 * Taken out from the runValidaton this only validate the required values
 */
export function runValidationAction(cb: CallbackFunction) {

  return (value: any, key: string) => {
    // debugFn('runValidationAction', key, value)
    if (value[KEY_WORD]) {
      return value[ARGS_KEY]
    }
    const check = validateHandler(value, cb)
    if (check.length) {
      // log('runValidationAction', key, value)
      throw new JsonqlTypeError(key, check)
    }
    if (value[ENUM_KEY] !== false && !enumHandler(value[ARGS_KEY], value[ENUM_KEY])) {
      // log(ENUM_KEY, value[ENUM_KEY])
      throw new JsonqlEnumError(key)
    }
    if (value[CHECKER_KEY] !== false && !checkerHandler(value[ARGS_KEY], value[CHECKER_KEY])) {
      // log(CHECKER_KEY, value[CHECKER_KEY])
      throw new JsonqlCheckerError(key)
    }
    return value[ARGS_KEY]
  }
}

/**
 * finally run the options validation
 */
export function runValidation(args: any, cb: CallbackFunction) {
  const [ argsForValidate, pristineValues ] = args
  // turn the thing into an array and see what happen here
  // debugFn('_args', argsForValidate)
  const result = mapValues(argsForValidate, runValidationAction(cb))

  return merge(result, pristineValues)
}
