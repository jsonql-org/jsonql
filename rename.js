#!/usr/bin/env node
// little helpers to rename all the old js files to ts
const args = process.argv.slice(2)
const { join, basename } = require('path')
const { exec } = require('child_process')
const fs = require('fs-extra')
const glob = require('glob')

const dir = args[0]

console.info(`Update all files in ${dir}`)

glob(join(__dirname, 'packages', dir, '!(node_modules|dist)**', '*.js'), (err, files) => {
  if (err) {
    console.error('oops', err)
    return
  }
  Promise.all(
    files.map(file => {
      console.log(file)
      const f = basename(file)
      const ts = f.replace('.js', '.ts')

      return Promise.resolve(ts)
    })
  ).then(results => {

    console.log(`${results.length} files updated in packages/${dir}`)
    console.log(results)

  })

})
