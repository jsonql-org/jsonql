import { stripTypeParams } from '@jsonql/ast'


export function stripAllTypeParams(obj: any) {
  const cleanResult = {}
  for (const methodName in obj) {
    cleanResult[methodName] = stripTypeParams(obj[methodName])
  }

  return cleanResult
}
