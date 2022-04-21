// Using the swc/core to parse the TS file into AST
// and we extract the method's argument along with their type
// for validation
import * as swc from '@swc/core'
import fs from 'fs-extra'
import { JsonqlError } from '@jsonql/errors'
import { inArray } from '@jsonql/utils'

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
  syntax = 'typescript',
  opts?: SwcParserOptions
): Promise<{body: any}> {
  const supportedSyntax = ['ecmascript', 'typescript']
  if (!inArray(supportedSyntax, syntax)) {
    throw new JsonqlError('swcParserBase', `${syntax} is not supported!`)
  }
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

  return fs.readFile(infile)
            .then((code: Buffer) => code.toString())
            .then(async (code: string) => {
              // @ts-ignore annoying diffrent options for different type, it could be same config and ignore it internally, bad design
              return swc.parse(code, options)
            })
}
