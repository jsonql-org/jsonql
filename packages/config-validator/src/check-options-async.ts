/// this is port back from the client to share across all projects
import { merge } from '@jsonql/validator-core/src/lib/lodash'
import { prepareArgsForValidation } from './prepare-args-for-validation'
import { runValidation } from './run-validation'
import {
  JsonqlConfig,
  CallbackFunction,
  JsonqlAppProps,
  JsonqlConstantProps,
} from './types'
// import debug from 'debug'
// const debugFn = debug('jsonql-params-validator:check-options-async')

/**
 * Quick transform
 */
async function configToArgs(
  config: JsonqlConfig,
  appProps: JsonqlAppProps
) {

  return Promise.resolve(
    prepareArgsForValidation(config, appProps)
  )
}

/**
 * default export
 */
export async function checkOptionsAsync(
  config: JsonqlConfig,
  appProps: JsonqlAppProps,
  constProps: JsonqlConstantProps,
  cb: CallbackFunction
) {

  return configToArgs(config, appProps)
    .then(args1 => runValidation(args1, cb))
    // next if every thing good then pass to final merging
    .then(args2 => merge({}, args2, constProps))
}
