// ast index export
import {
  swcParserBase,
  swcParseFileBase,
  swcParseFileSync,
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
    .then(module => module.body)
    .then(normalize)
    .then(processArgParams)
}

/** The string version for individual function */
export function tsFileParserSync(code: string) {
  const options = getOptions('ts')
  return swcParseFileSync(code, options)
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
  const options = getOptions(syntax)
  return function(infile: string) {
    return file ? swcParseFileBase(infile, options)
                : swcParserBase(infile, options)
  }
}

/** wrapper to get the options  */
function getOptions(syntax: string) {
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
