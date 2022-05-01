import 'reflect-metadata'
import {
  tsClassParser,
  pickInputFile,
} from '@jsonql/ast/src'
import {
  JsonqlArrayValidateInput,
  JsonqlObjectValidateInput,
  JsonqlGenericObject
} from './types'

export const jsonqlAstKey = Symbol('jsonqlAstKey')
export const jsonqlValidationKey = Symbol('jsonqlValidator')

/**
 * We need this class decorator to collect all the necessary info for this class
 */
export function InitValidator<T extends { new (...args: any[]): {} }>(constructor: T) {
  const file = pickInputFile(new Error())

  return class extends constructor {
    constructor(...args: any[]) {
      super(...args)
      tsClassParser(file)
        .then(astMap => {
          console.log(`AstMap here`)
          const target = constructor.prototype
          Reflect.defineMetadata(jsonqlAstKey, astMap, target)
        })
    }
  }
}

/**
When using TS to develop resolver with jsonql
dev can use the combo of class and decorator
*/
export function Validate<T>(
  rules?: JsonqlArrayValidateInput | JsonqlObjectValidateInput
) {

  return (target: T, propertyName: string): void => {
    const astMap = Reflect.getOwnMetadata(jsonqlAstKey, target)
    const rule = Reflect.getOwnMetadata(jsonqlValidationKey, target) || {}
    console.log(rules, target, propertyName)
    rule[propertyName] = rules
    console.log(astMap)
    Reflect.defineMetadata(jsonqlValidationKey, rule, target)
  }
}
