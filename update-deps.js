#!/usr/bin/env node
// whenever we succssfully publish a package
// we check the other modules in the packages/ to see if it's depends on it
// then we update the version number respectively
const args = process.argv.slice(2)
const { join } = require('path')
const fs = require('fs-extra')
const glob = require('glob')
const pkgsDir = join(__dirname, 'packages')

const pkgDir = args[0]
if (!pkgDir) {
  console.error(`pacakge directory is required!`)
  process.exit(1)
  return
}
const rootPkgJson = fs.readJsonSync(join(__dirname, 'package.json'))
let rootPkgName = '@' + rootPkgJson.name
/*
if (rootPkgName.substr(0,1) !== '@') {
  rootPkgName = '@' + rootPkgName
}
*/
// We should read the root package.json then take the name (the scope root)
// then construct the package name
const pkgName = `${rootPkgName}/${args[1] ? args[1] : pkgDir}`

console.log('Searching for ', pkgName)

glob(join(pkgsDir, '**!(node_modules)', 'package.json'), function(err, files) {
  if (err) {
    return console.error('ERROR:', err)
  }
  const targetPkg = files.filter(file => file.indexOf(`/${pkgDir}/`) > -1)[0]

  const targetPkgJson = fs.readJsonSync(targetPkg)
  const { version } = targetPkgJson

  console.log('Update to', pkgName, version)
  const updateVersion = `workspace:^${version}`

  Promise.all(
    files.filter(file => !(file.indexOf(`/${pkgDir}/`) > -1))
         .map(file => {
           let found = false
           const json = fs.readJsonSync(file)
           const { dependencies, devDependencies } = json
           if (dependencies && dependencies[pkgName]) {
             found = true
             json.dependencies[pkgName] = updateVersion
           }
           if (devDependencies && devDependencies[pkgName]) {
             found = true
             json.devDependencies[pkgName] = updateVersion
           }
           if (found) {
             return fs.writeJson(file, json, { spaces: 2 })
              .then(() => `${file} updated`)
           }
           return Promise.resolve(`NIL`)
         })
    )
    .then(console.info)
})
