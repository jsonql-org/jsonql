import { combineCheck } from './combine'
import { checkArray } from './array'
import { checkObject } from './object'
import { chainProcessPromises } from '@jsonql/utils'
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
  types: Array<string>
) {
  // we return it as a function therefore
  // if the last one fail the next one no need to get exeucte
  return types.map(type => {
    switch (type) {
      case ARRAY_TYPE:
        return () => checkArray(value)
      case OBJECT_TYPE:
        return () => checkObject(value)
      default:
        return () => combineCheck(type)(value)
    }
  })
  .map(fn => (
    async (type: string) => (
      fn() ? Promise.reject(true) : Promise.resolve(type)
    )
  ))
}

/**
  because the union type is OR
  therefore it has to be check in one rule
*/
export async function checkUnion(value: any, types: Array<string>): Promise<boolean | string> {
  const ps = generatePromisesFn(value, types)
  const pFn = Reflect.apply(chainProcessPromises, null, ps)

  return new Promise((resolver, rejecter) => {
    pFn(null) // this param is really pointless
      .catch((res: boolean) => {
        resolver(res)
      })
      .then((results: string[]) => {
        rejecter(results)
      })
  })
}
