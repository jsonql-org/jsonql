import {
  createConfig,
  getCheckConfigAsync,
  getCheckConfig
} from './config'
import {
  constructConfig,
} from './construct-config'
import { checkOptionsAsync } from './check-options-async'
import { checkOptionsSync } from './check-options-sync'
import { normalizeArgs, validateSync, validateAsync } from './validator'
// re-export
export {
  createConfig,
  constructConfig,
  getCheckConfigAsync,
  getCheckConfig,
  checkOptionsAsync,
  checkOptionsSync,
  normalizeArgs,
  validateSync,
  validateAsync
}
