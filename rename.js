#!/usr/bin/env node
// little helpers to rename all the old js files to ts
const args = process.argv.slice(2)
const { join, basename, dirname } = require('path')
const { exec } = require('child_process')
const fs = require('fs-extra')
const glob = require('glob')
const dir = args[0]
if (!dir) {
  console.error(`You need to tell me where!`)
  return
}
console.info(`Update all files in ${dir}`)
// start
glob(join(__dirname, 'packages', dir, '!(node_modules|dist)**','**','*.js'), (err, files) => {
  if (err) {
    console.error('oops', err)
    return
  }
  if (!files.length) {
    console.info(`Nothing to update!`)
    return
  }
  Promise.all(
    files.map(file => {
      const f = basename(file)
      const d = dirname(file)
      const ts = f.replace('.js', '.ts')
      const dest = join(d, ts)

      return fs.copy(file, dest)
               .then(() => fs.remove(file))
               .then(() => dest)
    })
  ).then(results => {
    console.log(`${results.length} files updated in packages/${dir}`)
    // console.log(results)
  })

})
