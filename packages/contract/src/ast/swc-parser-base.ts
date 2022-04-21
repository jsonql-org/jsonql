// Using the swc/core to parse the TS file into AST
// and we extract the method's argument along with their type
// for validation
import * as swc from '@swc/core'
import fs from 'fs-extra'
import { JsonqlError } from '@jsonql/errors'

export async function initParser(infile: string, syntax = 'typescript'): Promise<{body: any}> {
  const supportedSyntax = ['ecmascript', 'typescript']
  if (!(supportedSyntax.indexOf(syntax) > -1)) {
      throw new JsonqlError()
  }
  return fs.readFile(infile)
            .then((code: Buffer) => code.toString())
            .then(async (code: string) => {
              return swc
                .parse(code, {
                  syntax, // "ecmascript" | "typescript"
                  comments: false,
                  script: true,
                  target: "es5",
                  decorators: true,
  // Input source code are treated as module by default
  // isModule: false,
                })
            })
}
