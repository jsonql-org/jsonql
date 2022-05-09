// @jsonql/ast main export
export * from './main'
// now export everything from prosssors
export * from './lib/processors'
// this will get use in the other Decorator
export {
  pickInputFile,
  stripAllTypeParams
} from './lib/common'
// try export all the types and see what happen
// export * from './types' // <-- when include this ts compiler throw error 
