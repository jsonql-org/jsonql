import {
  stripAllTypeParams,
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
    (module: any) => processClassModuleBody(module, false),
    normalize,
    extractClassDefinition,
  )
  return fn(filePath)
}
