
import merge from 'lodash-es/merge'
import mapValues from 'lodash-es/mapValues'
import mapKeys from 'lodash-es/mapKeys'
import omitBy from 'lodash-es/omitBy'
import isEqual from 'lodash-es/isEqual'
import findKey from 'lodash-es/findKey'

import {
  TYPE_KEY,
  OPTIONAL_KEY,
  ENUM_KEY,
  ARGS_KEY,
  CHECKER_KEY,
  KEY_WORD,
  ALIAS_KEY
} from '../constants'
import notEmpty from '../not-empty'
// import { checkIsObject } from '../object'
import isObjectHasKey from '../is-object-has-key'

// just not to make my head hurt
const isEmpty = value => !notEmpty(value)

/**
 * Map the alias to their key then grab their value over
 * @param {object} config the user supplied config
 * @param {object} appProps the default option map
 * @return {object} the config keys replaced with the appProps key by the ALIAS
 */
export function mapAliasConfigKeys(config, appProps) {
  // need to do two steps
  // 1. take key with alias key
  const aliasMap = omitBy(appProps, (value, k) => !value[ALIAS_KEY] )
  if (isEqual(aliasMap, {})) {
    return config;
  }
  return mapKeys(config, (v, key) => findKey(aliasMap, o => o.alias === key) || key)
}

/**
 * We only want to run the valdiation against the config (user supplied) value
 * but keep the defaultOptions untouch
 * @param {object} config configuraton supplied by user
 * @param {object} appProps the default options map
 * @return {object} the pristine values that will add back to the final output
 */
export function preservePristineValues(config, appProps) {
  // @BUG this will filter out those that is alias key
  // we need to first map the alias keys back to their full key
  const _config = mapAliasConfigKeys(config, appProps)
  // take the default value out
  const pristineValues = mapValues(
    omitBy(appProps, (value, key) => isObjectHasKey(_config, key)),
    value => value.args
  )
  // for testing the value
  const checkAgainstAppProps = omitBy(appProps, (value, key) => !isObjectHasKey(_config, key))
  // output
  return {
    pristineValues,
    checkAgainstAppProps,
    config: _config // passing this correct values back
  }
}

/**
 * This will take the value that is ONLY need to check
 * @param {object} config that one
 * @param {object} props map for creating checking
 * @return {object} put that arg into the args
 */
export function processConfigAction(config, props) {
  // debugFn('processConfigAction', props)
  // v.1.2.0 add checking if its mark optional and the value is empty then pass
  return mapValues(props, (value, key) => (
    config[key] === undefined || (value[OPTIONAL_KEY] === true && isEmpty(config[key]))
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
 * @param {object} opts that one
 * @param {object} appProps mutation configuration options
 * @return {object} put that arg into the args
 */
export function prepareArgsForValidation(opts, appProps) {
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
