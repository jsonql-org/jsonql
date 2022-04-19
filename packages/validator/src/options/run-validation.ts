// breaking the whole thing up to see what cause the multiple calls issue

import isFunction from 'lodash-es/isFunction'
import merge from 'lodash-es/merge'
import mapValues from 'lodash-es/mapValues'

import JsonqlEnumError from 'jsonql-errors/src/enum-error'
import JsonqlTypeError from 'jsonql-errors/src/type-error'
import JsonqlCheckerError from 'jsonql-errors/src/checker-error'

import {
  TYPE_KEY,
  OPTIONAL_KEY,
  ENUM_KEY,
  ARGS_KEY,
  CHECKER_KEY,
  KEY_WORD
} from '../constants'
import { checkIsArray } from '../array'

// import debug from 'debug';
// const debugFn = debug('jsonql-params-validator:options:validation')

/**
 * just make sure it returns an array to use
 * @param {*} arg input
 * @return {array} output
 */
const toArray = arg => checkIsArray(arg) ? arg : [arg]

/**
 * DIY in array
 * @param {array} arr to check against
 * @param {*} value to check
 * @return {boolean} true on OK
 */
const inArray = (arr, value) => (
  !!arr.filter(v => v === value).length
)

/**
 * break out to make the code easier to read
 * @param {object} value to process
 * @param {function} cb the validateSync
 * @return {array} empty on success
 */
function validateHandler(value, cb) {
  // cb is the validateSync methods
  let args = [
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
 * @param {*} value to check
 * @param {*} enumv to check against if it's not false
 * @return {boolean} true on OK
 */
const enumHandler = (value, enumv) => {
  if (checkIsArray(enumv)) {
    return inArray(enumv, value)
  }
  return true
}

/**
 * Allow passing a function to check the value
 * There might be a problem here if the function is incorrect
 * and that will makes it hard to debug what is going on inside
 * @TODO there could be a few feature add to this one under different circumstance
 * @param {*} value to check
 * @param {function} checker for checking
 */
const checkerHandler = (value, checker) => {
  try {
    return isFunction(checker) ? checker.apply(null, [value]) : false
  } catch (e) {
    return false
  }
}

/**
 * Taken out from the runValidaton this only validate the required values
 * @param {array} args from the config2argsAction
 * @param {function} cb validateSync
 * @return {array} of configuration values
 */
function runValidationAction(cb) {
  return (value, key) => {
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
 * @param {object} args from the config2argsAction
 * @param {function} cb validateSync
 * @return {object} of configuration values
 */
export default function runValidation(args, cb) {
  const [ argsForValidate, pristineValues ] = args
  // turn the thing into an array and see what happen here
  // debugFn('_args', argsForValidate)
  const result = mapValues(argsForValidate, runValidationAction(cb))
  return merge(result, pristineValues)
}
