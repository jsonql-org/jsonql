import {
  stripTypeParams,
  tsBasicParserSync,
  processClassModuleBody,
  normalize,
  processArgs,
  processFunctionModuleBody,
  processArgParams,
} from '@jsonql/ast'
import {
  chainFns
} from '@jsonql/utils'

/** clean up the unused options for contract */
export function stripAllTypeParams(obj: any) {
  const cleanResult = {}
  for (const methodName in obj) {
    cleanResult[methodName] = stripTypeParams(obj[methodName])
  }

  return cleanResult
}

/** parser for contract */
export function tsParserSync(filePath: string) {
  const fn = chainFns(
    tsBasicParserSync,
    (code: any) => {
      console.dir(code, { depth: null })
      return code
    }
  )
  /*
    processClassModuleBody,
    normalize,
    processArgParams,
    stripAllTypeParams
  )
  */
  return fn(filePath)
}
