// take out some of the common methods to keep the processor files size down
import type { AnyType } from '../types'
import { SYNTAXS, TYPE_PARAMS } from './constants'
import { JsonqlProcessedEntry } from '../types'
/** remove all the span props they are no use to us */
export function stripSpan(obj: AnyType) {
  const tmp = {}
  for (const key in obj) {
    if (key !== 'span') {
      if (Array.isArray(obj[key])) {
        tmp[key] = obj[key].map((o: AnyType) => {
          if (typeof o === 'object') {
            return stripSpan(o)
          }
          return o
        })
      } else if (typeof obj[key] === 'object') {
        tmp[key] = stripSpan(obj[key])
      } else {
        tmp[key] = obj[key]
      }
    }
  }
  return tmp
}

/** strip out all the typesParams from the generate ast because we don't need them in the contract */
export function stripTypeParams(astMap: Array<JsonqlProcessedEntry>) {

  return astMap.map(ast => {
    if (ast[TYPE_PARAMS] !== undefined) {
      delete ast[TYPE_PARAMS]
    }
    return ast
  })
}

/** clean up the unused options for contract */
export function stripAllTypeParams(obj: AnyType) {
  const cleanResult = {}
  for (const methodName in obj) {
    cleanResult[methodName] = stripTypeParams(obj[methodName])
  }

  return cleanResult
}


/** take the error stack processor here and see if it works correctly */
export function pickInputFile(e: Error, pattern = '__decorateClass'): string {
  const stacks = e.stack?.split('\n').filter(line => line.indexOf(pattern) > -1)
  const where = stacks ? stacks[stacks.length - 1].split('(')[1].split(':')[0] : ''

  return where
}

/** wrapper to get the options  */
export function getOptions(syntax: string) {
  if (!SYNTAXS[syntax]) {
    throw new Error(`Unsupported syntax! Only allow ts or js`)
  }

  return {
    syntax: SYNTAXS[syntax],
    comments: false,
    script: true,
    target: "es5",
    decorators: true,
    // Input source code are treated as module by default
    // isModule: true,
  }
}
