// Using the swc/core to parse the TS file into AST
// and we extract the method's argument along with their type
// for validation
import * as swc from '@swc/core'
import fs from 'fs-extra'

declare type SwcParserOptions = {
  syntax?: string
  comments?: boolean
  script?: boolean
  target?: string
  decorators?: boolean
  isModule?: boolean
}

export async function swcParserBase(
  infile: string,
  options: SwcParserOptions
): Promise<{body: any}> {
  return fs.readFile(infile)
            .then((code: Buffer) => code.toString())
            .then(async (code: string) => {
              // @ts-ignore annoying diffrent options for different type, it could be same config and ignore it internally, bad design
              return swc.parse(code, options)
            })
}

/*

import { JsonqlError } from '@jsonql/errors'
import { inArray } from '@jsonql/utils'

const supportedSyntax = ['ecmascript', 'typescript']
const baseOptions = {
  syntax, // "ecmascript" | "typescript"
  comments: false,
  script: true,
  target: "es5",
  decorators: true,
  // Input source code are treated as module by default
  isModule: true,
}
const options = opts ? Object.assign(baseOptions, opts) : baseOptions
if (!inArray(supportedSyntax, syntax)) {
  throw new JsonqlError('swcParserBase', `${syntax} is not supported!`)
}
*/
