// these was in the index.ts
// which is not very nice - because it's hard to find
// now they are on their own file
// export also create wrapper methods
import { checkOptionsAsync } from './check-options-async'
import { checkOptionsSync } from './check-options-sync'
import { constructConfig } from './construct-config'
import {
  ENUM_KEY,
  CHECKER_KEY,
  ALIAS_KEY,
  OPTIONAL_KEY
} from '@jsonql/constants'

// types
import {
  JsonqlConfigParams,
  AsyncCallbackFunction,
  CallbackFunction
} from './types'

/**
 * This has a different interface
 */
export function createConfig(
  value: any,
  type: string | string[],
  params: JsonqlConfigParams
) {
  // Note the enumv not ENUM
  // const { enumv, optional, checker, alias } = params;
  // let args = [value, type, optional, enumv, checker, alias];
  const {
    [OPTIONAL_KEY]: o,
    [ENUM_KEY]: e,
    [CHECKER_KEY]: c,
    [ALIAS_KEY]: a
  } = params

  return constructConfig.apply(null,  [value, type, o, e, c, a])
}

/**
 * construct the actual end user method, rename with prefix get since 1.5.2
 */
export function getCheckConfigAsync(validateSync: AsyncCallbackFunction): AsyncCallbackFunction {

  return function(config, appProps, constantProps= {}) {

    return checkOptionsAsync(
      config,
      appProps,
      constantProps,
      validateSync
    )
  }
}

/**
 * copy of above but it's sync, rename with prefix get since 1.5.2
 */
export function getCheckConfig(validateSync: CallbackFunction): CallbackFunction {

  return function(config, appProps, constantProps = {}) {

    return checkOptionsSync(config, appProps, constantProps, validateSync)
  }
}
