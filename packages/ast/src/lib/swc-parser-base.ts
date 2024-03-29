// Using the swc/core to parse the TS file into AST
// and we extract the method's argument along with their type
// for validation
// import * as swc from '@swc/core'
import type { AnyType } from '../types'
import {
  parse,
  parseSync,
  parseFile ,
  parseFileSync,
} from '@swc/core'
/*
declare type SwcLocalOptions = {
  syntax: string // "ecmascript" | "typescript"
  comments: boolean
  script: boolean
  // Defaults to es3
  target: string
  // Input source code are treated as module by default
  isModule: boolean
}
*/

/*
import {
  SwcParserOptions,
  SwcParsedResult,
} from './types'
*/
export async function swcParserBase(
  infile: string,
  options: AnyType // @TODO
): Promise<AnyType> { // @TODO
  return parseFile(infile, options)
}
/** sync version of above method */
export function swcParserSync(
  infile: string,
  options: AnyType
) {
  return parseFileSync(infile, options)
}

/*
No overload matches this call. Overload 1 of 2,
'(path: string,
options: ParseOptions & { isModule: false; }): Promise<Script>',
gave the following error. Argument of type 'SwcParserOptions' is not assignable to parameter of type
'ParseOptions & { isModule: false; }'.
Type 'SwcParserOptions' is not assignable to type
'EsParserConfig & {
  comments?: boolean | undefined;
  script?: boolean | undefined;
  target?: JscTarget | undefined;
} & { isModule: false; }'.
Type 'SwcParserOptions' is not assignable to type 'EsParserConfig'.
Types of property 'syntax' are incompatible.
Type 'string | undefined' is not assignable to type '"ecmascript"'.
Type 'undefined' is not assignable to type '"ecmascript"'.
Overload 2 of 2,
'(path: string, options?: ParseOptions | undefined): Promise<Module>',
gave the following error.
Argument of type 'SwcParserOptions' is not assignable to parameter of type
'ParseOptions | undefined'. Type 'SwcParserOptions'
is not assignable to type
'EsParserConfig & {
comments?: boolean | undefined;
script?: boolean | undefined;
target?: JscTarget | undefined;
}'.
Type 'SwcParserOptions' is not assignable to type 'EsParserConfig'.
*/
// parseFile should try this so we can get rip of the fs-extra

/** breaking this out to create a api using just the file */
export async function swcParseFileBase(
    code: string,
    options: AnyType
  ) {
  return parse(code, options)
}
/** parse file sync version */
export function swcParseFileSync(
  code: string,
  options: AnyType
) {
  return parseSync(code, options)
}
