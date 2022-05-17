
import {
  // tsClassParser,
  tsFunctionParser,
} from '@jsonql/ast'
import { showDeep } from '@jsonql/utils'
import * as fs from 'fs-extra'
import { join } from 'path'
// class file

/*
tsClassParser(join(__dirname, 'class-style.ts'))
  .then(result => {
    showDeep(result)
    return fs.writeJson(join(__dirname, 'class-style.json'), result, {spaces: 2})
  })


tsFunctionParser(join(__dirname, 'function-style.ts'))
  .then(result => {
    showDeep(result)
    return fs.writeJson(join(__dirname, 'function-style.json'), result, {spaces: 2})
  })
*/

['strange-fn-def'/*, 'spread-function'*/].forEach(name => {
  console.log('extract from ', name)
  tsFunctionParser(join(__dirname, [name, 'ts'].join('.')))
    .then(result => {
      showDeep(result)
      return fs.writeJson(
        join(__dirname, [name, 'json'].join('.')),
        result,
        {spaces: 2}
      )
    })
})
