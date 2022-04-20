// this is port back from the client to share across all projects
import { merge } from '../lib/lodash'
import { prepareArgsForValidation } from './prepare-args-for-validation'
import { runValidation } from './run-validation'
import {
  JsonqlConfig,
  DummyFunction,
  JsonqlAppProps,
  JsonqlConstantProps,
} from '../types'

/**
 * Check options
 */
export function checkOptionsSync(
  config: JsonqlConfig,
  appProps: JsonqlAppProps,
  constProps: JsonqlConstantProps,
  cb: DummyFunction
) {
  
  return merge(
    runValidation(
      prepareArgsForValidation(config, appProps),
      cb
    ),
    constProps
  )
}
