// import { isString } from '@jsonql/utils/dist/lodash'
// @NOTE can not use the isString method because stupid Typescript complaint it's not string
// even you cast it again
export function len (value: number | string): number {

  return typeof value === 'string'
    ? value.length
    : value
}
