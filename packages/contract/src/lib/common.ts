import {
  stripTypeParams,
  tsBasicParserSync,
  processClassModuleBody,
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

function extractClassDefinition(obj: any) {

  console.dir(obj, { depth: null })

  return {}
  /*
  if (obj.body && Array.isArray(obj.body) && obj.body.length) {
    const astMap = {
      className: obj.identifier.value,
      methods: []
    }


    return astMap
  }
  throw new Error(`Could not find the class body!`)
  */
}


/** parser for contract */
export function tsParserSync(filePath: string) {
  const fn = chainFns(
    tsBasicParserSync,
    // processClassModuleBody,
    extractClassDefinition
  )
  return fn(filePath)
}
