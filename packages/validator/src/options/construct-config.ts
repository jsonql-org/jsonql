import {
  isFunction,
  isString,
} from '../lib/lodash'
import {
  ARGS_KEY,
  TYPE_KEY,
  CHECKER_KEY,
  ENUM_KEY,
  OPTIONAL_KEY,
  ALIAS_KEY
} from '@jsonql/constants'
import { checkArray } from '../base'
import { DummyFunction } from '../types'
// import checkIsBoolean from '../boolean'
// import debug from 'debug';
// const debugFn = debug('jsonql-params-validator:construct-config');
/**
 * create function to construct the config entry so we don't need to keep building object
 */
export function constructConfig(
  args: any[],
  type: string | string[],
  optional?: boolean,
  enumv?: boolean | any[],
  checker?: boolean | DummyFunction,
  alias?: boolean | string 
) {
  const base = {
    [ARGS_KEY]: args,
    [TYPE_KEY]: type
  }
  if (optional === true) {
    base[OPTIONAL_KEY] = true
  }
  if (checkArray(enumv)) {
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
