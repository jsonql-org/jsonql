// @jsonql/ast main export
export * from './main'
// now export everything from prosssors
export * from './lib/processors'
// this will get use in the other Decorator
export {
  pickInputFile,
  stripAllTypeParams
} from './lib/common'
