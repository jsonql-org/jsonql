// Using the swc/core to parse the TS file into AST
// and we extract the method's argument along with their type
// for validation
import * as swc from '@swc/core'
/*
import {
  SwcParserOptions,
  SwcParsedResult,
} from './types'
*/
export async function swcParserBase(
  infile: string,
  options: any //SwcParserOptions // @TODO
): Promise<any> { // @TODO
  return swc.parseFile(infile, options)
}

// parseFile should try this so we can get rip of the fs-extra

/** breaking this out to create a api using just the file */
export async function swcParseFileBase(
    code: string,
    options: any
  ) {
  return swc.parse(code, options)
}

export function swcParseFileSync(
  code: string,
  options: any
) {
  return swc.parseSync(code, options)
}
