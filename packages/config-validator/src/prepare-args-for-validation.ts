import {
  merge,
  mapValues,
  mapKeys,
  omitBy,
  // isEqual,
  findKey,
} from '@jsonql/validator-core/src/lib/lodash'
import {
  TYPE_KEY,
  OPTIONAL_KEY,
  ENUM_KEY,
  ARGS_KEY,
  CHECKER_KEY,
  KEY_WORD,
  ALIAS_KEY
} from '@jsonql/constants'
import { isEmpty, isEmptyObj, objectHasKey } from '@jsonql/utils'
import {
  JsonqlConfigBase,
  JsonqlAppProps
} from './types'

/**
 * Map the alias to their key then grab their value over
 */
export function mapAliasConfigKeys(
  config: JsonqlConfigBase,
  appProps: JsonqlAppProps
) {
  // need to do two steps
  // 1. take key with alias key
  const aliasMap = omitBy(appProps, value => !value[ALIAS_KEY] )
  if (isEmptyObj(aliasMap)) {

    return config
  }

  return mapKeys(
    config,
    (_, key: string) => findKey(
      aliasMap, o => o.alias === key
    ) || key
  )
}

/**
 * We only want to run the valdiation against the config (user supplied) value
 * but keep the defaultOptions untouch
 */
export function preservePristineValues(
  config: JsonqlConfigBase,
  appProps: JsonqlAppProps
): JsonqlConfigBase {
  // @BUG this will filter out those that is alias key
  // we need to first map the alias keys back to their full key
  const _config = mapAliasConfigKeys(config, appProps)
  // take the default value out
  const pristineValues = mapValues(
    omitBy(appProps, (_, key) => objectHasKey(_config, key)),
    value => value.args
  )
  // for testing the value
  const checkAgainstAppProps = omitBy(
    appProps,
    (_, key) => !objectHasKey(_config, key)
  )
  // output
  return {
    pristineValues,
    checkAgainstAppProps,
    config: _config // passing this correct values back
  }
}

/**
 * This will take the value that is ONLY need to check
 */
export function processConfigAction(
  config: any,
  props: JsonqlAppProps
): any {
  // debugFn('processConfigAction', props)
  // v.1.2.0 add checking if its mark optional and the value is empty then pass
  return mapValues(props, (value, key) => (
    config[key] === undefined ||
    (value[OPTIONAL_KEY] === true &&
    isEmpty(config[key]))
      ? merge({}, value, {[KEY_WORD]: true})
      : {
          [ARGS_KEY]: config[key],
          [TYPE_KEY]: value[TYPE_KEY],
          [OPTIONAL_KEY]: value[OPTIONAL_KEY] || false,
          [ENUM_KEY]: value[ENUM_KEY] || false,
          [CHECKER_KEY]: value[CHECKER_KEY] || false
        }
    )
  )
}

/**
 * Quick transform
 * @TODO we should only validate those that is pass from the config
 * and pass through those values that is from the defaultOptions
 */
export function prepareArgsForValidation(
  opts: any,
  appProps: JsonqlAppProps
): Array<any> {
  const {
    config,
    pristineValues,
    checkAgainstAppProps
  } = preservePristineValues(opts, appProps)
  // output
  return [
    processConfigAction(config, checkAgainstAppProps),
    pristineValues
  ]
}
