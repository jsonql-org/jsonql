// instead of export those core methods striaght from the lib
// we create couple exports here just for other development
// this will not include in the default exports so we need to get it like
// @jsonql/ast/parsers
import {
  swcParserBase,
  swcParserSync as _swcParserSync,
} from './lib/swc-parser-base'
import {
  getOptions
} from './lib/common'

/* the parser async version */
export function swcParserAsync (pathToFile: string, options = {}, type = 'ts') {
  const defaultOptions = getOptions(type)
  return swcParserBase(pathToFile, Object.assign({}, defaultOptions, options))
}
/* the parser sync version */
export function swcParserSync (pathToFile: string, options = {}, type = 'ts') {
  const defaultOptions = getOptions(type)
  return _swcParserSync(pathToFile, Object.assign({}, defaultOptions, options))
}
