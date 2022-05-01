// ast index export
import {
  swcParserBase,
  swcParseFileBase,
} from './swc-parser-base'
import {
  processClassModuleBody,
  normalize,
  processArgs,
  processFunctionModuleBody,
  processArgParams,
} from './processors'
import { IS_DEBUG, SYNTAXS } from './constants'

/** This will pass the code directly for parsing */
export async function tsFileParser(code: string) {
  const parser = getParser('ts', true)

  return parser(code)
    .then(processFunctionModuleBody)
    .then(normalize)
    .then(processArgParams)
}

/** deal with the function style resolver */
export async function tsFunctionParser(infile: string) {
  if (IS_DEBUG) {
    console.time('ast')
  }
  const parser = getParser('ts')

  return parser(infile)
    .then(processFunctionModuleBody)
    .then(normalize)
    .then(processArgParams)
    .then(result => {
      if (IS_DEBUG) {
        console.timeEnd('ast')
      }
      return result
    })
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
export function getParser(syntax: string, file = false) {
  if (!SYNTAXS[syntax]) {
    throw new Error(`Unsupported syntax! Only allow ts or js`)
  }
  const options = {
    syntax: SYNTAXS[syntax],
    comments: false,
    script: true,
    target: "es5",
    decorators: true,
    // Input source code are treated as module by default
    // isModule: true,
  }

  return function(infile: string) {

    return file ? swcParseFileBase(infile, options)
                : swcParserBase(infile, options)
  }
}
