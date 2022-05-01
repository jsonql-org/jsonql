import 'reflect-metadata'
import { pickInputFile } from '@jsonql/ast/src'

const astKey = Symbol('jsonqlAstKey')
const validationKey = Symbol('jsonqlValidator')



/**
When using TS to develop resolver with jsonql
dev can use the combo of class and decorator
*/
export function Validate<T>(rules?: any) {
  return (target: T, propertyName: string): void => {
    console.log(rules, target, propertyName)
  }
}
