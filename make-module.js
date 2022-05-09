#!/usr/bin/env node
// hacky way to generate our module file (index.d.ts) onto the root
const args = process.argv.slice(2)
const { readFileSync, outputFile } = require('fs-extra')
const { join } = require('node:path')

const packages = join(__dirname, 'packages')

/**
moduleName from the package.json name
contentFilePath where the source (types.d.ts) is
dest where to output the index.d.ts file
*/
function makeIndexDTs(moduleName, contentFilePath, dest) {
  const content = readFileSync(join(packages, contentFilePath))
  // since it's the same project we could set up a bunch of defaults
  const template = `declare module "@jsonql/${moduleName}" {
    ${content}
}`
  const target = join(packages, dest, 'index.d.ts')
  return outputFile(target, template)
    .then(() => {
      console.log(`${target} created`, Date.now())
    })
}

Reflect.apply(makeIndexDTs, null, args)
