import { combineCheck } from './combine'
import { checkArray } from './array'
import { checkObject } from './object'
import { queuePromisesProcess } from '@jsonql/utils'
import { ARRAY_TYPE, OBJECT_TYPE } from '@jsonql/constants'

/**
We use the chainProcessPromises fail and exit side effects to
accomplish this task fast, because it's OR so only need to
have one of them pass that means all pass
so if one pass we throw Error and it will exist
if it fail we resolve it therefore the then is actually failed
*/
function generatePromisesFn(
  value: any,
  types: Array<string>,
  extended?: Array<any> // this will be check keys
) {
  // we return it as a function therefore
  // if the last one fail the next one no need to get exeucte
  return types.map((type: string, i: number) => {
    const args = [value]
    if (extended && extended[i]) {
      args.push(extended[i])
    }
    switch (type) {
      case ARRAY_TYPE:
        return () => Reflect.apply(checkArray, null, args)
      case OBJECT_TYPE:
        return () => Reflect.apply(checkObject, null, args)
      default:
        return () => combineCheck(type)(value)
    }
  })
  .map(fn => (
    async (type: string) => (
      fn() ? Promise.reject(type) : Promise.resolve(true)
    )
  ))
}

/**
  because the union type is OR
  therefore it has to be check in one rule
*/
export async function checkUnion(
  value: any,
  types: Array<string>,
  extended?: Array<any>
): Promise<boolean | string> {
  const ps = generatePromisesFn(value, types, extended)

  return queuePromisesProcess(ps, null)
}
