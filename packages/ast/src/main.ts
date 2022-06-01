// ast index export
import {
  swcParserBase,
  swcParseFileBase,
  swcParseFileSync,
  swcParserSync,
} from './lib/swc-parser-base'
import {
  processClassModuleBody,
  normalize,
  processArgs,
  processFunctionModuleBody,
  processArgParams,
} from './lib/processors'
import {
  getOptions
} from './lib/common'
import { IS_DEBUG } from './lib/constants'
// import { chainFns } from '@jsonql/utils'

/** just the core parser sync version */
export function tsBasicParserSync(filePath: string) {
  const options = getOptions('ts')

  return swcParserSync(filePath, options)
}

/** parse ts file sync */
// @TODO change this to chainFn should fix the type problem
export function tsClassParserSync(infile: string) {
  /*
  return chainFns(
    tsBasicParserSync,
    processClassModuleBody,
    normalize,
    processArgs
  )(infile)
  */
  // @2022-06-01 Just don't want to touch it for now
  const step1 = tsBasicParserSync(infile)
  // @ts-ignore
  const step2 = processClassModuleBody(step1)
  // console.dir(step2, { depth: null })
  const step3 = normalize(step2)
  const step4 = processArgs(step3)
  return step4

}

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
