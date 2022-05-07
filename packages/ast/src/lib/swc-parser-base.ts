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
  options: any // @TODO
): Promise<any> { // @TODO
  return swc.parseFile(infile, options)
}
/** sync version of above method */
export function swcParserSync(
  infile: string,
  options: any
) {
  return swc.parseFileSync(infile, options)
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
