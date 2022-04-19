// create function to construct the config entry so we don't need to keep building object

import isFunction from 'lodash-es/isFunction'
import isString from 'lodash-es/isString'
import {
  ARGS_KEY,
  TYPE_KEY,
  CHECKER_KEY,
  ENUM_KEY,
  OPTIONAL_KEY,
  ALIAS_KEY
} from 'jsonql-constants'

import { checkIsArray } from '../array'
// import checkIsBoolean from '../boolean'
// import debug from 'debug';
// const debugFn = debug('jsonql-params-validator:construct-config');
/**
 * @param {*} args value
 * @param {string} type for value
 * @param {boolean} [optional=false]
 * @param {boolean|array} [enumv=false]
 * @param {boolean|function} [checker=false]
 * @return {object} config entry
 */
export default function constructConfig(args, type, optional=false, enumv=false, checker=false, alias=false) {
  let base = {
    [ARGS_KEY]: args,
    [TYPE_KEY]: type
  }
  if (optional === true) {
    base[OPTIONAL_KEY] = true
  }
  if (checkIsArray(enumv)) {
    base[ENUM_KEY] = enumv
  }
  if (isFunction(checker)) {
    base[CHECKER_KEY] = checker
  }
  if (isString(alias)) {
    base[ALIAS_KEY] = alias
  }
  return base
}
