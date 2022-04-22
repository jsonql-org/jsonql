// ast index export
import {
  swcParserBase
} from './swc-parser-base'
import {
  processClassModuleBody,
  normalize,
  processArgs
} from './processors'
import { IS_DEBUG } from '../constants'

export function jsParser(infile: string) {
  console.log(`@TODO`, infile)
  // "ecmascript" |
}

/** parse ts file */
export async function tsClassParser(infile: string) {
  if (IS_DEBUG) {
    console.time('ast')
  }
  const parser = getParser('ts')

  return parser(infile)
          .then(processClassModuleBody)
          .then(normalize)
          .then(processArgs)
          .then(result => {
            if (IS_DEBUG) {
              console.timeEnd('ast')
            }
            return result
          })
}

/** preconfig */
function getParser(syntax: string) {
  if (syntax !== "ts" && syntax !== "js") {
    throw new Error(`Unsupported syntax!`)
  }
  const syntaxs = {
    ts: "typescript",
    js: "ecmascript"
  }
  const options = {
    syntax: syntaxs[syntax],
    comments: false,
    script: true,
    target: "es5",
    decorators: true,
    // Input source code are treated as module by default
    isModule: true,
  }

  return function(infile: string) {
    return swcParserBase(infile, options)
  }
}
