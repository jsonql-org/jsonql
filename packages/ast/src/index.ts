// @jsonql/ast main export
export {
  tsFileParser,
  tsFileParserSync,
  tsClassParser,
  tsFunctionParser,
} from './main'
// this will get use in the other Decorator
export {
  pickInputFile,
  stripTypeParams
} from './lib/common'
