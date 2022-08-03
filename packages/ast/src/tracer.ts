// this will act like a bunlder to map out all the imports and each files
// calls and parameters and how they related to each other for Reverse Engineers
// import type { AnyType } from './types'
import { swcParserSync } from './lib/swc-parser-base'
import { getOptions } from './lib/common'

/* the main call to the swc */
export function tracer (pathToFile: string, options = {}) {
  const opts = getOptions('ts')

  return swcParserSync(pathToFile, Object.assign(opts, options))
}
