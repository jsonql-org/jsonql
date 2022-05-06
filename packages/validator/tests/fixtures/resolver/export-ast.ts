// group all the exported ast here for easier to use in other test
import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'

const classAst = join(__dirname, 'class-style.json')
const funcAst = join(__dirname, 'function-style.json')
const funcA = join(__dirname, 'function-a.json')

export const context = {
  classAstInput: readJsonSync(classAst),
  funcAstInput: readJsonSync(funcAst),
  funcAInput: readJsonSync(funcA)
}
