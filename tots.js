#!/usr/bin/env node
// move the src files to mjs folder
// then copy over all files content and rename the extension to .ts
const args = process.argv.slice(2)
const { join } = require('path')
const { exec } = require('child_process')
const fs = require('fs-extra')
const glob = require('glob')

const rename = testStr => [testStr.substring(0, testStr.indexOf('.')), 'ts'].join('.')

console.log('in directory without the src!', args[0])

const baseDir = join(__dirname, args[0])
const srcDir = join(baseDir, 'src')
glob(join(srcDir , '**', '*.{mjs, js}'), function(err, files) {
  if (err) {
    console.error('Ooops', err)
    return
  }
  // create a new filesArray with just the files / sub directory within the src
  const filesArray = files.map(file => file.replace(srcDir + '/', ''))
  // move everything into the a tmp directory
  exec(`mv ${srcDir} ${join(baseDir, 'tmp')}`, (errors) => {
    if (errors) {
      console.error("Move folder failed!", errors)
      return
    }
    Promise.all(
      filesArray.map(filePath => (
        fs.copy(
          join(baseDir, 'tmp', filePath),
          join(srcDir, rename(filePath))
        )
      ))
    )
    .then(results => {
      console.log(`Done!`)
    })
  })

})
