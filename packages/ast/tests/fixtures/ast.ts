
import { initParser } from '../../src/lib/swc-parser-base'
import { join } from 'path'

const files = [
  join(__dirname, 'test-file-1.ts'),
  join(__dirname, 'test-file-2.ts')
]

initParser(files[1])
  .then(module => {

    console.dir(module.body, {depth: null})
  })
