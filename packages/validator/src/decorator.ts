import 'reflect-metadata'
// const validationKey = Symbol('jsonqlValidator')
/**
When using TS to develop resolver with jsonql
dev can use the combo of class and decorator
*/
export function Validate<T>(rules?: any) {
  return (target: T, propertyName: string): void => {
    console.log(rules, target, propertyName)
  }
}
