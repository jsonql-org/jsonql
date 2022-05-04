import { combineCheck } from './combine'
import { checkArray } from './array'
import { checkObject } from './object'
import { queuePromisesProcess } from '@jsonql/utils'
import { ARRAY_TYPE, OBJECT_TYPE } from '@jsonql/constants'


/** wrap the or return result together */
function typeAsFail(result: boolean, type: string) {
  return result || type
}

/**
We use the chainProcessPromises fail and exit side effects to
accomplish this task fast, because it's OR so only need to
have one of them pass that means all pass
so if one pass we throw Error and it will exist
if it fail we resolve it therefore the then is actually failed
*/
export function generateReversePromisesFn(
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
        return () => typeAsFail(Reflect.apply(checkArray, null, args), type)
      case OBJECT_TYPE:
        return () => typeAsFail(Reflect.apply(checkObject, null, args), type)
      default:
        return () => typeAsFail(combineCheck(type)(value), type)
    }
  })
  .map(fn => (
    // this treat result in opposite way because once one pass
    // then we want to exit the queue (it's OR just need one to pass)
    async () => {
      const result = fn()
      // @TODO may be push them together in one array?
      return result === true ? Promise.reject(true) : Promise.resolve(result)
    }
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
): Promise<boolean> {
  const ps = generateReversePromisesFn(value, types, extended)
  // we wrap this in another promise to reverse the result
  return new Promise((resolver, rejecter) => {
    /**
    There is a weird behavior here, if we call the catch first
    the 'then' always get call, it might be a promise A behavior
    */
    queuePromisesProcess(ps, types[0])
          .then((type: string) => {
            // console.log('failed', type)
            rejecter(type)
          })
          .catch((res: boolean) => {
            // console.log('passed', res)
            resolver(res)
          })

  })
}

/**
 * Create a sync version of checkUnion
 */
export function checkUnionSync(value: any, types: Array<string>) {
  const ctn = types.length
  for (let i = 0; i < ctn; ++i) {
    const type = types[i]
    switch (type) {
      case ARRAY_TYPE:
        if (checkArray(value)) {
          return true
        }
        break
      case OBJECT_TYPE:
        if (checkObject(value)) {
          return true
        }
        break
      default:
        if (combineCheck(type)(value))  {
          return true
        }
      }
  }
  return false
}
